# PowerShell script to extract all filter values from filterConfig.js

$content = Get-Content "C:\Users\binyamin\Desktop\AllSherut\src\components\config\filterConfig.js" -Raw

# Find all service sections (excluding common)
$servicePattern = '^\s*([a-z_]+):\s*\{'
$lines = $content -split "`n"

$services = @{}
$currentService = $null
$depth = 0

foreach ($line in $lines) {
    # Detect service start
    if ($line -match '^\s*([a-z_]+):\s*\{') {
        $serviceName = $matches[1]
        if ($serviceName -ne 'common') {
            $currentService = $serviceName
            $services[$serviceName] = @()
            $depth = 1
        }
    }
    
    # Extract filter values (match lines with { value: '...' })
    if ($currentService -and $line -match "{\s*value:\s*'([^']*)'") {
        $filterValue = $matches[1]
        if ($filterValue -and $filterValue -notmatch '^\s*$') {
            $services[$currentService] += $filterValue
        }
    }
    
    # Track closing braces to find end of service
    if ($line -match '^\s*\}') {
        $depth--
        if ($depth -eq 0 -and $currentService) {
            $currentService = $null
        }
    }
}

# Output results
foreach ($service in $services.Keys | Sort-Object) {
    Write-Host "=== $service ==="
    $services[$service] | Sort-Object -Unique | ForEach-Object {
        Write-Host "  $_"
    }
    Write-Host ""
}
