param(
  [string]$SeedPath = "prisma/seed.ts",
  [string]$OutputDir = "public/images/products",
  [int]$WhiteThreshold = 238,
  [int]$MaxColorDistance = 34,
  [int]$MaxDimension = 350
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Net.Http

function Test-IsBackgroundCandidate {
  param(
    [System.Drawing.Color]$Color,
    [int]$WhiteThreshold,
    [int]$MaxColorDistance
  )

  if ($Color.A -eq 0) {
    return $true
  }

  $minChannel = [Math]::Min($Color.R, [Math]::Min($Color.G, $Color.B))
  if ($minChannel -lt $WhiteThreshold) {
    return $false
  }

  $distance = [Math]::Sqrt(
    [Math]::Pow(255 - $Color.R, 2) +
    [Math]::Pow(255 - $Color.G, 2) +
    [Math]::Pow(255 - $Color.B, 2)
  )

  return $distance -le $MaxColorDistance
}

function Remove-EdgeWhiteBackground {
  param(
    [System.Drawing.Bitmap]$Source,
    [int]$WhiteThreshold,
    [int]$MaxColorDistance
  )

  $width = $Source.Width
  $height = $Source.Height
  $result = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $visited = New-Object 'bool[,]' $width, $height
  $queue = New-Object 'System.Collections.Generic.Queue[System.Drawing.Point]'

  for ($x = 0; $x -lt $width; $x++) {
    $queue.Enqueue([System.Drawing.Point]::new($x, 0))
    $queue.Enqueue([System.Drawing.Point]::new($x, $height - 1))
  }
  for ($y = 1; $y -lt ($height - 1); $y++) {
    $queue.Enqueue([System.Drawing.Point]::new(0, $y))
    $queue.Enqueue([System.Drawing.Point]::new($width - 1, $y))
  }

  while ($queue.Count -gt 0) {
    $point = $queue.Dequeue()
    $x = $point.X
    $y = $point.Y

    if ($x -lt 0 -or $x -ge $width -or $y -lt 0 -or $y -ge $height -or $visited[$x, $y]) {
      continue
    }

    $visited[$x, $y] = $true
    $color = $Source.GetPixel($x, $y)
    if (-not (Test-IsBackgroundCandidate $color $WhiteThreshold $MaxColorDistance)) {
      continue
    }

    $queue.Enqueue([System.Drawing.Point]::new($x + 1, $y))
    $queue.Enqueue([System.Drawing.Point]::new($x - 1, $y))
    $queue.Enqueue([System.Drawing.Point]::new($x, $y + 1))
    $queue.Enqueue([System.Drawing.Point]::new($x, $y - 1))
  }

  for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
      $color = $Source.GetPixel($x, $y)
      if ($visited[$x, $y]) {
        $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $color.R, $color.G, $color.B))
      } else {
        $result.SetPixel($x, $y, $color)
      }
    }
  }

  return $result
}

function Resize-Bitmap {
  param(
    [System.Drawing.Bitmap]$Source,
    [int]$MaxDimension
  )

  $largestSide = [Math]::Max($Source.Width, $Source.Height)
  if ($largestSide -le $MaxDimension) {
    return New-Object System.Drawing.Bitmap($Source)
  }

  $scale = $MaxDimension / $largestSide
  $width = [Math]::Max(1, [int][Math]::Round($Source.Width * $scale))
  $height = [Math]::Max(1, [int][Math]::Round($Source.Height * $scale))
  $result = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($result)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.DrawImage($Source, 0, 0, $width, $height)
  $graphics.Dispose()

  return $result
}

$root = Get-Location
$seedFullPath = Join-Path $root $SeedPath
$outputFullDir = Join-Path $root $OutputDir
New-Item -ItemType Directory -Force $outputFullDir | Out-Null

$seed = Get-Content -LiteralPath $seedFullPath -Raw -Encoding UTF8
$productPattern = '(?s)\{(?=[^{}]*\bid:\s*(?<id>\d+))(?=[^{}]*\bname:\s*"(?<name>[^"]+)")(?=[^{}]*\bprice:\s*[^,}]+)(?=[^{}]*\bcategoryId:\s*\d+)(?=[^{}]*\bimageUrl:\s*"(?<url>https?://[^"]+)")[^{}]*\}'
$matches = [regex]::Matches($seed, $productPattern)

$client = [System.Net.Http.HttpClient]::new()
$updatedSeed = $seed
$processedCount = 0
$skippedCount = 0
$occurrence = 0

foreach ($match in $matches) {
  $occurrence++
  $id = $match.Groups["id"].Value
  $name = $match.Groups["name"].Value
  $url = $match.Groups["url"].Value
  $fileName = "product-seed-$occurrence-id-$id.png"
  $targetPath = Join-Path $outputFullDir $fileName
  $publicPath = "/images/products/$fileName"

  try {
    Write-Host "Processing product ${id}: $name"
    $bytes = $client.GetByteArrayAsync($url).GetAwaiter().GetResult()
    $stream = [System.IO.MemoryStream]::new($bytes)
    $bitmap = [System.Drawing.Bitmap]::new($stream)
    $resized = Resize-Bitmap $bitmap $MaxDimension
    $processed = Remove-EdgeWhiteBackground $resized $WhiteThreshold $MaxColorDistance
    $processed.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $processed.Dispose()
    $resized.Dispose()
    $bitmap.Dispose()
    $stream.Dispose()

    $updatedEntry = $match.Value.Replace($url, $publicPath)
    $updatedSeed = $updatedSeed.Replace($match.Value, $updatedEntry)
    $processedCount++
  } catch {
    Write-Warning "Skipped product $id ($name): $($_.Exception.Message)"
    $skippedCount++
  }
}

Set-Content -LiteralPath $seedFullPath -Value $updatedSeed -Encoding UTF8
Write-Host "Updated $processedCount image URLs. Skipped $skippedCount."
