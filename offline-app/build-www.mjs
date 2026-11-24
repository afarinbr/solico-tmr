// Builds the offline web bundle for the Android app:
//  - copies the PWA, minus service worker and unused fonts
//  - downloads every product image once, shrinks it to WebP and bundles it
//  - decrypts the product data and ships it as plain JSON (no lock screen in the APK)
//  - generates the Android launcher icons
// Usage: node build-www.mjs <siteDir> <outWww> <resDir> <cacheDir> <encryptScript> [iconsDir]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import sharp from 'sharp';

const [siteDir, outWww, resDir, cacheDir, encryptScript,
  iconsDir = path.join(siteDir, 'assets', 'icons')] = process.argv.slice(2);
if (!encryptScript) fail('usage: node build-www.mjs <siteDir> <outWww> <resDir> <cacheDir> <encryptScript>');

const IMG_MAX = 420;          // px, longest side (cards show images at <=180 CSS px)
const IMG_QUALITY = 70;       // WebP quality
const CONCURRENCY = 8;
const SALT_LEN = 16, IV_LEN = 12, TAG_LEN = 16, ITER = 100000;

function fail(msg) { console.error(`FAILED: ${msg}`); process.exit(1); }
const sha = (data, n = 24) => crypto.createHash('sha256').update(data).digest('hex').slice(0, n);
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;

// ---------- passcode: same source as encrypt-products.js, never printed ----------
function getPasscode() {
  if (process.env.SOLICO_PASSCODE) return process.env.SOLICO_PASSCODE;
  const m = fs.readFileSync(encryptScript, 'utf8').match(/SOLICO_PASSCODE \|\| '([^']+)'/);
  if (!m) fail('No passcode: set SOLICO_PASSCODE to the app passcode.');
  return m[1];
}

function decrypt(buf, pass) {
  const key = crypto.pbkdf2Sync(pass, buf.subarray(0, SALT_LEN), ITER, 32, 'sha256');
  const d = crypto.createDecipheriv('aes-256-gcm', key, buf.subarray(SALT_LEN, SALT_LEN + IV_LEN));
  d.setAuthTag(buf.subarray(buf.length - TAG_LEN));
  return Buffer.concat([d.update(buf.subarray(SALT_LEN + IV_LEN, buf.length - TAG_LEN)), d.final()]);
}

// ---------- 1. copy site ----------
const fontsUsed = new Set([...fs.readFileSync(path.join(siteDir, 'css', 'app.css'), 'utf8')
  .matchAll(/fonts\/([\w.-]+\.(?:ttf|woff2?|otf))/g)].map((m) => m[1]));
const skip = (rel) => {
  const p = rel.split(path.sep).join('/');
  return p.startsWith('.git') || p === 'service-worker.js' || p === 'data/products.enc' ||
    (p.startsWith('css/fonts/') && !fontsUsed.has(path.basename(p)));
};
fs.rmSync(outWww, { recursive: true, force: true });
fs.cpSync(siteDir, outWww, { recursive: true, filter: (src) => !skip(path.relative(siteDir, src)) });

function patch(file, from, to) {
  const f = path.join(outWww, file);
  const s = fs.readFileSync(f, 'utf8');
  if (!s.includes(from)) fail(`patch anchor not found in ${file}: ${from.slice(0, 60)}`);
  fs.writeFileSync(f, s.replace(from, to));
}
patch('index.html', "if ('serviceWorker' in navigator) {", 'if (false) { // offline APK: no service worker');
// Offline APK has no lock screen: data ships as plain gzip JSON and loads at startup
patch('index.html', '<section class="view-section active" id="viewLock">', '<section class="view-section" id="viewLock">');
patch('js/app.js', `    const encryptedBuffer = await fetchEncryptedProducts();
    const rawProducts = await decryptProductsPayload(encryptedBuffer, passcode);`,
`    // Offline APK: bundled data is plain JSON (the APK zip compresses it), no passcode
    const response = await fetch('./data/products.json');
    if (!response.ok) throw new Error('امکان بارگذاری داده‌ها وجود ندارد.');
    const rawProducts = await response.json();`);
patch('js/app.js', "    const savedPass = sessionStorage.getItem('solico_auth_pass');",
  "    const savedPass = 'offline'; // offline APK: always unlocked");
patch('js/app.js', `        } catch (e) {
            sessionStorage.removeItem('solico_auth_pass');
        }`,
`        } catch (e) {
            // Offline APK: never fall back to the lock screen; show the error instead
            document.body.innerHTML = '<p dir="rtl" style="padding:24px;font-family:sans-serif">خطا در بارگذاری داده‌ها: ' + e.message + '</p>';
            return;
        }`);
fs.appendFileSync(path.join(outWww, 'js', 'app.js'), `

// Offline APK: Android back button; returns true when handled inside the app
window.__offlineBack = function () {
    const active = document.querySelector('.view-section.active');
    const id = active ? active.id : '';
    if (id === 'viewFlashcards' || id === 'viewEmpty') { backFromCards(); return true; }
    if (id === 'viewCategories') { openHome(); return true; }
    return false;
};
`);

// ---------- 2. product data ----------
const pass = getPasscode();
let products;
try {
  products = JSON.parse(decrypt(fs.readFileSync(path.join(siteDir, 'data', 'products.enc')), pass).toString('utf8'));
} catch {
  fail('Could not decrypt data/products.enc - set SOLICO_PASSCODE to the passcode the app uses.');
}
console.log(`Products: ${products.length}`);

// ---------- 3. images ----------
const rawDir = path.join(cacheDir, 'raw');
const imgDir = path.join(outWww, 'img');
fs.mkdirSync(rawDir, { recursive: true });
fs.mkdirSync(imgDir, { recursive: true });

const firstImage = (p) => (p.image || (p.image_urls ? p.image_urls.split('|')[0].trim() : '')).trim();
const urls = [...new Set(products.map(firstImage).filter((u) => /^https?:\/\//i.test(u)))];
console.log(`Unique images: ${urls.length}`);

async function download(url) {
  const file = path.join(rawDir, sha(url));
  if (fs.existsSync(file)) return fs.readFileSync(file);
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (!buf.length) throw new Error('empty body');
      fs.writeFileSync(file + '.tmp', buf);
      fs.renameSync(file + '.tmp', file);
      return buf;
    } catch (e) {
      lastErr = e;
      if (String(e.message).startsWith('HTTP 4')) break;
      await new Promise((res) => setTimeout(res, 1000 * attempt));
    }
  }
  throw lastErr;
}

const localFor = new Map();   // url -> bundled file name
const failed = [];
let rawBytes = 0, outBytes = 0, done = 0;
const queue = [...urls];
async function worker() {
  for (let url; (url = queue.shift()); ) {
    try {
      const raw = await download(url);
      rawBytes += raw.length;
      const out = await sharp(raw, { failOn: 'none' }).rotate()
        .resize({ width: IMG_MAX, height: IMG_MAX, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: IMG_QUALITY, alphaQuality: 80, effort: 6 }).toBuffer();
      const name = `${sha(out, 16)}.webp`;   // content-named: identical images stored once
      const target = path.join(imgDir, name);
      if (!fs.existsSync(target)) { fs.writeFileSync(target, out); outBytes += out.length; }
      localFor.set(url, name);
    } catch (e) {
      failed.push(`${url}  (${e.cause?.code || e.message})`);
    }
    if (++done % 200 === 0) console.log(`  images ${done}/${urls.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

for (const p of products) {
  const name = localFor.get(firstImage(p));
  if (name) p.image = `./img/${name}`;
}
console.log(`Images bundled: ${localFor.size}/${urls.length}, ${mb(rawBytes)} downloaded -> ${mb(outBytes)} bundled`);
if (failed.length) {
  console.log(`WARNING: ${failed.length} image(s) could not be bundled; they load from the web when online:`);
  failed.slice(0, 15).forEach((f) => console.log(`  ${f}`));
}

// ---------- 4. product data: plain JSON (no passcode in the offline app) ----------
// Not .gz: the Android build silently unpacks .gz assets and drops the extension.
const json = Buffer.from(JSON.stringify(products), 'utf8');
fs.writeFileSync(path.join(outWww, 'data', 'products.json'), json);
console.log(`Product data: ${kb(json.length)} (plain JSON, ~${kb(zlib.gzipSync(json).length)} compressed in the APK)`);

// ---------- 5. launcher icons ----------
const legacy = path.join(iconsDir, 'icon-512.png');
const maskable = path.join(iconsDir, 'icon-maskable-512.png');
const corner = await sharp(maskable).ensureAlpha().extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer();
const bg = corner[3] < 128 ? { r: 255, g: 255, b: 255 } : { r: corner[0], g: corner[1], b: corner[2] };
const hex = '#' + [bg.r, bg.g, bg.b].map((v) => v.toString(16).padStart(2, '0')).join('');
for (const [dir, scale] of [['mdpi', 1], ['hdpi', 1.5], ['xhdpi', 2], ['xxhdpi', 3], ['xxxhdpi', 4]]) {
  const d = path.join(resDir, `mipmap-${dir}`);
  fs.mkdirSync(d, { recursive: true });
  await sharp(legacy).resize(Math.round(48 * scale)).png().toFile(path.join(d, 'ic_launcher.png'));
  // Adaptive foreground: maskable icon at 91dp of 108dp, same proportion as the Bubblewrap TWA
  const full = Math.round(108 * scale), inner = Math.round(91 * scale);
  const pad = Math.floor((full - inner) / 2);
  await sharp(maskable).resize(inner).extend({ top: pad, left: pad, bottom: full - inner - pad, right: full - inner - pad, background: bg })
    .png().toFile(path.join(d, 'ic_launcher_foreground.png'));
}
fs.mkdirSync(path.join(resDir, 'values'), { recursive: true });
fs.writeFileSync(path.join(resDir, 'values', 'ic_launcher_background.xml'),
  `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${hex}</color>\n</resources>\n`);
console.log('Launcher icons generated.');
