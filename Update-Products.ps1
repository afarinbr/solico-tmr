$ErrorActionPreference = "Stop"
$csvPath  = Join-Path $PSScriptRoot "assets\products.csv"
$jsonPath = Join-Path $PSScriptRoot "data\products.json"

if (-not (Test-Path $csvPath)) {
    Write-Host "[ERROR] CSV not found at: $csvPath" -ForegroundColor Red
    exit 1
}

Write-Host "Reading CSV from $csvPath..." -ForegroundColor Cyan
$products = Import-Csv -Path $csvPath -Encoding UTF8
Write-Host "Found $($products.Count) products. Converting to JSON..." -ForegroundColor Cyan

$jsonContent = $products | ConvertTo-Json -Depth 10

# THE FIX: Create a UTF-8 encoder that does NOT use a BOM ($False)
$utf8NoBom = New-Object System.Text.UTF8Encoding($False)
[System.IO.File]::WriteAllText($jsonPath, $jsonContent, $utf8NoBom)

Write-Host "[SUCCESS] Generated: $jsonPath ($($products.Count) items)" -ForegroundColor Green

# Auto-encrypt products.json -> products.enc
$encryptScript = Join-Path $PSScriptRoot "encrypt-products.js"
if (Test-Path $encryptScript) {
    Write-Host "Encrypting products to products.enc..." -ForegroundColor Cyan
    node $encryptScript
}