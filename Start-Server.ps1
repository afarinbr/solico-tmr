$ErrorActionPreference = "Stop"

# --- 1. Sync CSV -> JSON ---
$updateScript = Join-Path $PSScriptRoot "Update-Products.ps1"
if (Test-Path $updateScript) {
    Write-Host "Running Update-Products.ps1..." -ForegroundColor DarkYellow
    & $updateScript
} else {
    Write-Host "[WARNING] Update-Products.ps1 not found." -ForegroundColor Yellow
}

# --- 2. Initialize Listener with Port Fallback ---
$ports = @(8080, 8085, 3000, 5000, 9090)
$listener = $null
$boundPort = $null

foreach ($p in $ports) {
    try {
        $tempListener = New-Object System.Net.HttpListener
        # Binding only to localhost avoids Windows ACL permission blocks
        $tempListener.Prefixes.Add("http://localhost:$p/")
        $tempListener.Start()
        $listener = $tempListener
        $boundPort = $p
        break
    } catch {
        if ($tempListener) { $tempListener.Close() }
    }
}

if (-not $listener -or -not $listener.IsListening) {
    Write-Host "[ERROR] Could not bind HTTP listener to any available port ($($ports -join ', '))." -ForegroundColor Red
    Write-Host "Try running PowerShell as Administrator once to register the URL prefix." -ForegroundColor Yellow
    Pause
    exit 1
}

$url = "http://localhost:$boundPort/"
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " TMR Static Server is Running on port $boundPort" -ForegroundColor Green
Write-Host " Local URL: $url" -ForegroundColor Yellow
Write-Host " Press Ctrl+C in this window to stop server" -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Cyan

Start-Process $url

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".ttf"  = "font/ttf"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".csv"  = "text/csv; charset=utf-8"
    ".enc"  = "application/octet-stream"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $reqPath = $context.Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($reqPath)) { $reqPath = "index.html" }
        $filePath = Join-Path $PSScriptRoot $reqPath
        if (Test-Path $filePath -PathType Container) {
            $filePath = Join-Path $filePath "index.html"
        }

        # Disable cache for development/JSON updates
        if ($filePath.EndsWith(".json") -or $filePath.EndsWith(".js") -or $filePath.EndsWith(".html") -or $filePath.EndsWith(".enc")) {
            $context.Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            $context.Response.Headers.Add("Pragma", "no-cache")
            $context.Response.Headers.Add("Expires", "0")
        }

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $context.Response.ContentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $context.Response.StatusCode = 200
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $context.Response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $context.Response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $context.Response.OutputStream.Close()
    } catch {
        # Loop continuation
    }
}
