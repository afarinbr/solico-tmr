# Builds a fully offline, signed APK of the Solico TMR app: web app, product data and product images
# are bundled inside the APK, so it needs no GitHub/server. Updates only by installing a newer APK.
# Prereqs: build-apk.ps1 has succeeded once (JDK/SDK, Gradle cache, keystore, Gradle wrapper), Node.js.
$ErrorActionPreference = 'Continue'
Remove-Item Env:NoDefaultCurrentDirectoryInExePath -ErrorAction SilentlyContinue   # else cmd can't run .\gradlew.bat by bare name
$env:JAVA_TOOL_OPTIONS = "-Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=10808 -Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=10808 -Dhttp.nonProxyHosts=localhost|127.0.0.1"   # VPN proxy for Gradle/Java downloads

$AppName     = 'TMR Offline'           # launcher label (the TWA is "TMR Learning")
$VersionCode = 6                       # bump for every new APK you hand out
$VersionName = '6'
$Tools = Join-Path $PSScriptRoot 'offline-app'
$Site  = Join-Path $PSScriptRoot 'solico-tmr-flashcards'
$Twa   = 'C:\twa\solico-tmr'           # Bubblewrap project: keystore + Gradle wrapper come from here
$Proj  = 'C:\twa\solico-tmr-offline'   # no spaces in path (Gradle)
$Cache = 'C:\twa\offline-cache'        # downloaded originals, reused on later builds

function Step($m) { Write-Host "`n=== $m ===" -ForegroundColor Cyan }
function Fail($m) { Write-Host "FAILED: $m" -ForegroundColor Red; exit 1 }
function Run($exe, [string[]]$a) { & $exe @a; if ($LASTEXITCODE -ne 0) { Fail "$exe $($a[0]) exited with $LASTEXITCODE" } }

# ---------- 0. Prerequisites ----------
Step 'Checking prerequisites'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Fail 'Node.js not found.' }
$cfgPath = Join-Path $env:USERPROFILE '.bubblewrap\config.json'
if (-not (Test-Path $cfgPath)) { Fail 'JDK/SDK not set up. Run "bubblewrap doctor" once in a normal terminal.' }
foreach ($f in 'android.keystore', 'gradlew.bat', 'gradle\wrapper\gradle-wrapper.jar') { if (-not (Test-Path (Join-Path $Twa $f))) { Fail "Missing $Twa\$f - run build-apk.ps1 successfully first." } }
$pw = $env:BUBBLEWRAP_KEYSTORE_PASSWORD
if (-not $pw) { $pw = [Environment]::GetEnvironmentVariable('BUBBLEWRAP_KEYSTORE_PASSWORD', 'User') }
if (-not $pw -or $pw.Length -lt 6) { Fail 'Set the password first: setx BUBBLEWRAP_KEYSTORE_PASSWORD "your-password" (6+ chars), then restart VS Code.' }
$env:BUBBLEWRAP_KEYSTORE_PASSWORD = $pw
$env:BUBBLEWRAP_KEY_PASSWORD      = $pw
$env:OFFLINE_KEYSTORE             = Join-Path $Twa 'android.keystore'
$cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
$env:JAVA_HOME = $cfg.jdkPath
$env:ANDROID_HOME = $cfg.androidSdkPath

# ---------- 1. Build tools ----------
Step 'Installing build tools (sharp)'
Push-Location $Tools
if (-not (Test-Path 'node_modules\sharp')) { Run npm @('install', '--no-audit', '--no-fund') } else { Write-Host 'Already installed.' }
Pop-Location

# ---------- 2. Android project ----------
Step "Preparing Android project in $Proj"
New-Item -ItemType Directory -Force -Path $Proj | Out-Null
if (Test-Path "$Proj\app\src") { Remove-Item "$Proj\app\src" -Recurse -Force }
Copy-Item "$Tools\android\*" $Proj -Recurse -Force
New-Item -ItemType Directory -Force -Path "$Proj\gradle\wrapper" | Out-Null
Copy-Item "$Twa\gradlew", "$Twa\gradlew.bat" $Proj -Force
Copy-Item "$Twa\gradle\wrapper\*" "$Proj\gradle\wrapper" -Force
[IO.File]::WriteAllText("$Proj\local.properties", "sdk.dir=$($cfg.androidSdkPath.Replace('\', '\\'))`n")

# ---------- 3. Web bundle + images ----------
Step 'Bundling web app, product data and images (first run downloads ~1800 images)'
Run node @("$Tools\make-icons.mjs", (Join-Path $PSScriptRoot 'App_Logo.png'), "$Tools\icons", '--text')   # offline icon keeps the logo text
Run node @("$Tools\build-www.mjs", $Site, "$Proj\app\src\main\assets\www", "$Proj\app\src\main\res", $Cache, (Join-Path $PSScriptRoot 'encrypt-products.js'), "$Tools\icons")

# ---------- 4. Build ----------
Step 'Building signed APK'
Set-Location $Proj
Run .\gradlew.bat @('assembleRelease', "-PappName=$AppName", "-PversionCode=$VersionCode", "-PversionName=$VersionName", '--no-daemon')
$built = "$Proj\app\build\outputs\apk\release\app-release.apk"
if (-not (Test-Path $built)) { Fail 'Build finished but app-release.apk is missing.' }
$apk = "$Proj\solico-tmr-offline.apk"
Copy-Item $built $apk -Force

Step 'DONE'
Write-Host ("APK:      $apk  ({0:N1} MB)" -f ((Get-Item $apk).Length / 1MB))
Write-Host "Package:  com.solico.tmr.offline  version $VersionName ($VersionCode)"
Write-Host "Signed with: $env:OFFLINE_KEYSTORE (same key as the TWA)"
