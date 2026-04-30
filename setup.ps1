# SarkariRojgarSetu - React to Next.js Migration Setup Script
# Run this script from the project root: e:\SarakariRojgarSetu-nextjs

Write-Host "=== SarkariRojgarSetu Next.js Migration Setup ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Copy images to public/images
Write-Host "Step 1: Copying images to public/images..." -ForegroundColor Yellow
$srcImages = "e:\SarakariRojgarSetu\src\assets\images"
$destImages = "e:\SarakariRojgarSetu-nextjs\public\images"

if (!(Test-Path $destImages)) {
    New-Item -ItemType Directory -Path $destImages -Force | Out-Null
}

$imageFiles = @(
    "Bank_Jobs.png", "Clerical_Jobs.png", "Engineering_Jobs.png", 
    "Govt-Jobs.png", "Judicial_Jobs.png", "Medical_Biotech.png",
    "Postal_Jobs.png", "Railway_Jobs.png", "Teaching_Faculty.png",
    "cropped-sabhijobs.png", "cropped-sabhijobs.webp"
)

foreach ($img in $imageFiles) {
    $src = Join-Path $srcImages $img
    $dest = Join-Path $destImages $img
    if (Test-Path $src) {
        Copy-Item $src $dest -Force
        Write-Host "  Copied: $img" -ForegroundColor Green
    } else {
        Write-Host "  Missing: $img" -ForegroundColor Red
    }
}
Write-Host ""

# Step 2: Copy job data
Write-Host "Step 2: Copying job data (govtJobsList & sarkariResults)..." -ForegroundColor Yellow
$assetsFile = "e:\SarakariRojgarSetu\src\assets\images\assets.js"
$jobsDataFile = "e:\SarakariRojgarSetu-nextjs\src\data\jobsData.js"

# Read the original assets.js
$content = Get-Content $assetsFile -Raw

# Extract govtJobsList
$govtStart = $content.IndexOf("// Govt Jobs Listing Data")
$sarkariStart = $content.IndexOf("// Sarkari Results Data")
$sidebarStart = $content.IndexOf("// Sidebar Data")

if ($govtStart -ge 0 -and $sidebarStart -ge 0) {
    $jobData = $content.Substring($govtStart, $sidebarStart - $govtStart)
    $jobsContent = $jobData.Trim()
    Set-Content -Path $jobsDataFile -Value $jobsContent -Encoding UTF8
    Write-Host "  Job data extracted and saved to src/data/jobsData.js" -ForegroundColor Green
} else {
    Write-Host "  ERROR: Could not find job data markers in assets.js" -ForegroundColor Red
    Write-Host "  You will need to manually copy govtJobsList and sarkariResults" -ForegroundColor Red
}
Write-Host ""

# Step 3: Install dependencies
Write-Host "Step 3: Installing dependencies..." -ForegroundColor Yellow
Set-Location "e:\SarakariRojgarSetu-nextjs"
npm install
Write-Host ""

Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Run: npm run dev" -ForegroundColor White
Write-Host "  2. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
