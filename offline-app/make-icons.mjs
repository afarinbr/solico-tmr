// Generates the app icons from the logo artwork: finds the topmost blue mark (the "S",
// above the wordmark), and places it on a white square. With --text, the wordmark
// ("Solico TMR / Learning Hub") is kept under the mark.
// Usage: node make-icons.mjs <logo.png> <iconsDir> [--text]
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const withText = args.includes('--text');
const [logo, outDir] = args.filter((a) => a !== '--text');
if (!outDir) { console.error('usage: node make-icons.mjs <logo.png> <iconsDir> [--text]'); process.exit(1); }
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

// Bounding box of the first block of "blue ink" rows (the mark; the wordmark comes after a gap)
const { data, info } = await sharp(logo).removeAlpha().raw().toBuffer({ resolveWithObject: true });
let box = null;
for (let y = 0; y < info.height; y++) {
  let n = 0, x0 = Infinity, x1 = -1;
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 3, r = data[i], g = data[i + 1], b = data[i + 2];
    if (b > r + 60 && r + g + b < 400) { n++; x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
  }
  if (n > 3) box = box ? { ...box, y1: y, x0: Math.min(box.x0, x0), x1: Math.max(box.x1, x1) } : { y0: y, y1: y, x0, x1 };
  else if (box && !withText) break;
}
if (!box) { console.error('No blue mark found in the logo.'); process.exit(1); }
const pad = 3;
const crop = await sharp(logo).removeAlpha().extract({
  left: Math.max(0, box.x0 - pad), top: Math.max(0, box.y0 - pad),
  width: Math.min(info.width, box.x1 + pad + 1) - Math.max(0, box.x0 - pad),
  height: Math.min(info.height, box.y1 + pad + 1) - Math.max(0, box.y0 - pad),
}).raw().toBuffer({ resolveWithObject: true });
// Artwork background is off-white/light grey; make it pure white so no box shows around the
// content (blue ink and its anti-aliased edges are saturated, so they are left alone)
for (let i = 0; i < crop.data.length; i += 3) {
  const lo = Math.min(crop.data[i], crop.data[i + 1], crop.data[i + 2]);
  const hi = Math.max(crop.data[i], crop.data[i + 1], crop.data[i + 2]);
  if (lo >= 225 && hi - lo <= 14) crop.data.fill(255, i, i + 3);
}
const mark = await sharp(crop.data, { raw: crop.info }).png().toBuffer();

// Mark fitted into a box of `inner` px, centred on a white square of `size` px
async function icon(size, inner) {
  const m = await sharp(mark).resize(inner, inner, { fit: 'contain', background: WHITE }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: m, gravity: 'center' }]).flatten({ background: WHITE }).png({ compressionLevel: 9 }).toBuffer();
}

// With text the content is wide, so size it by its diagonal: in the APK the maskable icon is drawn
// at 91dp of 108dp, and Android's round mask keeps only a 66dp circle -> diagonal <= ~360 px of 512
const w = box.x1 - box.x0 + 1, h = box.y1 - box.y0 + 1;
const anyInner = withText ? 480 : 360;                // share of the 512 square
const maskInner = withText ? Math.floor(360 * Math.max(w, h) / Math.hypot(w, h)) : 264;

fs.mkdirSync(outDir, { recursive: true });
const any512 = await icon(512, anyInner);
fs.writeFileSync(path.join(outDir, 'icon-512.png'), any512);
fs.writeFileSync(path.join(outDir, 'icon-192.png'), await sharp(any512).resize(192).png({ compressionLevel: 9 }).toBuffer());
// Maskable: the whole content must stay inside the central safe circle
fs.writeFileSync(path.join(outDir, 'icon-maskable-512.png'), await icon(512, maskInner));
const svgPng = (await sharp(any512).resize(256).png({ compressionLevel: 9 }).toBuffer()).toString('base64');
fs.writeFileSync(path.join(outDir, 'icon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><image width="512" height="512" xlink:href="data:image/png;base64,${svgPng}"/></svg>\n`);
console.log(`${withText ? 'Logo with text' : 'Mark'} ${w}x${h} px -> icons written to ${outDir}`);
