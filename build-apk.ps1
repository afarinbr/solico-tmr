# Builds a signed TWA APK for the Solico TMR PWA with Bubblewrap, fully non-interactive.
# Prereqs (one time, in your own terminal):  npm i -g @bubblewrap/cli ; bubblewrap doctor  (answer Y, Y, y)
#                                            setx BUBBLEWRAP_KEYSTORE_PASSWORD "your-password"  (6+ chars, then restart VS Code)
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Remove-Item Env:NoDefaultCurrentDirectoryInExePath -ErrorAction SilentlyContinue   # else cmd can't run .\gradlew.bat by bare name
$env:JAVA_TOOL_OPTIONS = "-Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=10808 -Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=10808 -Dhttp.nonProxyHosts=localhost|127.0.0.1"   # VPN proxy for Gradle/Java downloads

$PackageId = 'com.solico.tmr'            # permanent once installed/published
$Repo      = Join-Path $PSScriptRoot 'solico-tmr-flashcards'
$Proj      = 'C:\twa\solico-tmr'         # no spaces in path (Gradle)
$Host_     = 'coesolicotrademarketing.github.io'
$Base      = "https://$Host_/solico-tmr"
$Utf8      = New-Object System.Text.UTF8Encoding $false

function Step($m) { Write-Host "`n=== $m ===" -ForegroundColor Cyan }
function Fail($m) { Write-Host "FAILED: $m" -ForegroundColor Red; exit 1 }
function Run($exe, [string[]]$a) { & $exe @a; if ($LASTEXITCODE -ne 0) { Fail "$exe $($a[0]) exited with $LASTEXITCODE" } }

# ---------- 0. Prerequisites ----------
Step 'Checking prerequisites'
if (-not (Get-Command bubblewrap -ErrorAction SilentlyContinue)) { Fail 'bubblewrap not found. Run: npm i -g @bubblewrap/cli' }
$cfgPath = Join-Path $env:USERPROFILE '.bubblewrap\config.json'
if (-not (Test-Path $cfgPath)) { Fail 'JDK/SDK not set up. Run "bubblewrap doctor" once in a normal terminal and answer Y, Y, y.' }
$pw = $env:BUBBLEWRAP_KEYSTORE_PASSWORD
if (-not $pw) { $pw = [Environment]::GetEnvironmentVariable('BUBBLEWRAP_KEYSTORE_PASSWORD', 'User') }
if (-not $pw -or $pw.Length -lt 6) { Fail 'Set the password first: setx BUBBLEWRAP_KEYSTORE_PASSWORD "your-password" (6+ chars), then restart VS Code.' }
$env:BUBBLEWRAP_KEYSTORE_PASSWORD = $pw
$env:BUBBLEWRAP_KEY_PASSWORD      = $pw   # PKCS12 keystores use one password for store and key
$cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
$keytool = Join-Path $cfg.jdkPath 'bin\keytool.exe'
if (-not (Test-Path $keytool)) { $kt = Get-Command keytool -ErrorAction SilentlyContinue; if ($kt) { $keytool = $kt.Source } else { Fail "keytool not found under $($cfg.jdkPath)" } }

# ---------- 1. PNG icons in the live manifest ----------
Step 'Updating manifest icons and pushing to GitHub Pages'
foreach ($f in 'icon-192.png','icon-512.png','icon-maskable-512.png') { if (-not (Test-Path (Join-Path $Repo "assets\icons\$f"))) { Fail "Missing $Repo\assets\icons\$f" } }
$manifest = @'
{
  "name": "Solico TMR Product Learning",
  "short_name": "TMR Learning",
  "description": "Interactive product learning application for Solico and Kalle TMR teams.",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#003B8A",
  "lang": "en",
  "dir": "ltr",
  "icons": [
    { "src": "./assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "./assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "./assets/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" },
    { "src": "./assets/icons/icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any" }
  ]
}
'@
[IO.File]::WriteAllText((Join-Path $Repo 'manifest.json'), $manifest.Replace("`r`n", "`n") + "`n", $Utf8)
Push-Location $Repo
Run git @('add', 'manifest.json', 'service-worker.js', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png', 'assets/icons/icon-maskable-512.png', 'assets/icons/icon.svg')
& git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  Run git @('commit', '-m', 'Update app icons for Android TWA')
  Run git @('push', 'company', 'main')
} else { Write-Host 'Nothing new to commit.' }
Pop-Location

Step 'Waiting for icons to go live (up to 10 min)'
# Live files must match the local ones byte-for-byte, so Bubblewrap never fetches old icons
$live = $false
$tmpIcon = Join-Path $env:TEMP 'twa-live-icon.png'
foreach ($i in 1..40) {
  $ok = $true
  foreach ($f in 'icon-512.png', 'icon-maskable-512.png') {
    try {
      Invoke-WebRequest "$Base/assets/icons/$f" -UseBasicParsing -OutFile $tmpIcon -TimeoutSec 20
      if ((Get-FileHash $tmpIcon).Hash -ne (Get-FileHash (Join-Path $Repo "assets\icons\$f")).Hash) { $ok = $false }
    } catch { $ok = $false }
  }
  if ($ok) { $live = $true; break }
  Start-Sleep -Seconds 15
}
if (-not $live) { Fail "Icons not reachable at $Base/assets/icons/ - check the GitHub Pages deploy." }

# ---------- 2. Bubblewrap project (no interactive init) ----------
Step "Writing twa-manifest.json in $Proj"
New-Item -ItemType Directory -Force -Path $Proj | Out-Null
Set-Location $Proj
$twa = @"
{
  "packageId": "$PackageId",
  "host": "$Host_",
  "name": "Solico TMR Product Learning",
  "launcherName": "TMR Learning",
  "display": "standalone",
  "orientation": "portrait",
  "themeColor": "#003B8A",
  "themeColorDark": "#003B8A",
  "navigationColor": "#000000",
  "navigationColorDark": "#000000",
  "navigationDividerColor": "#000000",
  "navigationDividerColorDark": "#000000",
  "backgroundColor": "#FFFFFF",
  "enableNotifications": false,
  "startUrl": "/solico-tmr/",
  "iconUrl": "$Base/assets/icons/icon-512.png",
  "maskableIconUrl": "$Base/assets/icons/icon-maskable-512.png",
  "splashScreenFadeOutDuration": 300,
  "signingKey": { "path": "./android.keystore", "alias": "android" },
  "appVersionName": "3",
  "appVersionCode": 3,
  "shortcuts": [],
  "generatorApp": "bubblewrap-cli",
  "webManifestUrl": "$Base/manifest.json",
  "fallbackType": "customtabs",
  "features": {},
  "alphaDependencies": { "enabled": false },
  "enableSiteSettingsShortcut": true,
  "isChromeOSOnly": false,
  "isMetaQuest": false,
  "fullScopeUrl": "$Base/",
  "minSdkVersion": 24,
  "fingerprints": [],
  "additionalTrustedOrigins": [],
  "retainedBundles": []
}
"@
[IO.File]::WriteAllText((Join-Path $Proj 'twa-manifest.json'), $twa, $Utf8)

# ---------- 3. Signing key ----------
Step 'Signing key'
if (-not (Test-Path 'android.keystore')) {
  Run $keytool @('-genkeypair', '-keystore', 'android.keystore', '-alias', 'android', '-keyalg', 'RSA', '-keysize', '2048',
                 '-validity', '10000', '-storepass', $pw, '-keypass', $pw, '-dname', 'CN=Solico TMR, OU=Trade Marketing, O=Solico, C=IR')
} else { Write-Host 'Reusing existing android.keystore' }

# ---------- 4. Generate + build ----------
Step 'Generating Android project'
Run bubblewrap @('update', '--skipVersionUpgrade')
Step 'Building signed APK (first run downloads Gradle - can take 10+ min)'
Run bubblewrap @('build', '--skipPwaValidation')
if (-not (Test-Path 'app-release-signed.apk')) { Fail 'Build finished but app-release-signed.apk is missing.' }

# ---------- 5. Digital Asset Links ----------
Step 'Writing assetlinks.json'
$list = (& $keytool -list -v -keystore android.keystore -alias android -storepass $pw) | Out-String
if ($list -notmatch 'SHA256:\s*([0-9A-F:]{95})') { Fail 'Could not read SHA-256 fingerprint from keystore.' }
$sha = $Matches[1]
$links = "[{`"relation`":[`"delegate_permission/common.handle_all_urls`"],`"target`":{`"namespace`":`"android_app`",`"package_name`":`"$PackageId`",`"sha256_cert_fingerprints`":[`"$sha`"]}}]"
[IO.File]::WriteAllText((Join-Path $Proj 'assetlinks.json'), $links, $Utf8)

Step 'DONE'
Write-Host "APK:         $Proj\app-release-signed.apk"
Write-Host "AAB:         $Proj\app-release-bundle.aab"
Write-Host "SHA-256:     $sha"
Write-Host "assetlinks:  $Proj\assetlinks.json  -> publish at https://$Host_/.well-known/assetlinks.json"
Write-Host "BACK UP:     $Proj\android.keystore and its password (needed for every future update)"
