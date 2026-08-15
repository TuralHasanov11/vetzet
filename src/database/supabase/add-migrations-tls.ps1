param(
	[switch]$Apply,
	[switch]$SkipTypes
)

$ErrorActionPreference = "Stop"

$projectId = "vetzet"
$shadowPort = 54320
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$schemaDir = Join-Path $scriptRoot "schemas"
$migrationsDir = Join-Path $scriptRoot "migrations"
$localTypesPath = Join-Path $scriptRoot "database.types.ts"

function Invoke-Step {
	param(
		[Parameter(Mandatory = $true)]
		[string]$Command
	)

	Invoke-Expression $Command
	if ($LASTEXITCODE -ne 0) {
		throw "Command failed with exit code ${LASTEXITCODE}: $Command"
	}
}

function Get-Sha256([string]$Text) {
	$bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
	$sha = [System.Security.Cryptography.SHA256]::Create()
	try {
		$hash = $sha.ComputeHash($bytes)
		return ([BitConverter]::ToString($hash)).Replace("-", "").ToLowerInvariant()
	}
	finally {
		$sha.Dispose()
	}
}

Write-Host "Stopping local Supabase project '$projectId' (if running)..."
Invoke-Step "npx supabase stop --project-id $projectId | Out-Null"

Write-Host "Cleaning stale shadow port containers on $shadowPort..."
$staleContainers = docker ps --filter "publish=$shadowPort" --format "{{.ID}}"
if ($staleContainers) {
	foreach ($containerId in $staleContainers) {
		if (-not [string]::IsNullOrWhiteSpace($containerId)) {
			Invoke-Step "docker rm -f $containerId | Out-Null"
		}
	}
}

if (-not (Test-Path $schemaDir)) {
	throw "Schema directory not found: $schemaDir"
}

if (-not (Test-Path $migrationsDir)) {
	New-Item -ItemType Directory -Path $migrationsDir | Out-Null
}

$schemaFiles = Get-ChildItem -Path $schemaDir -Filter "*.sql" | Sort-Object Name
if (-not $schemaFiles) {
	throw "No schema files found in $schemaDir"
}

Write-Host "Building declarative migration content from schemas..."
$chunks = @()
foreach ($file in $schemaFiles) {
	$content = (Get-Content -Raw -Path $file.FullName).TrimEnd()
	$chunks += "-- Source: schemas/$($file.Name)`n$content`n"
}

$migrationBody = $chunks -join "`n"
$contentHash = Get-Sha256 $migrationBody
$header = "-- Auto-generated from schemas`n-- Content hash: $contentHash`n-- Generated at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ssK')`n`n"
$migrationContent = $header + $migrationBody + "`n"

$latest = Get-ChildItem -Path $migrationsDir -Filter "*.sql" | Sort-Object Name | Select-Object -Last 1
$shouldWrite = $true
if ($latest) {
	$latestText = Get-Content -Raw -Path $latest.FullName
	if ($latestText -match "Content hash:\s*([0-9a-f]{64})") {
		$latestHash = $Matches[1]
		if ($latestHash -eq $contentHash) {
			Write-Host "Latest migration already matches schema content. Skipping new migration file."
			$shouldWrite = $false
		}
	}
}

if ($shouldWrite) {
	$timestamp = Get-Date -Format "yyyyMMddHHmmss"
	$migrationFile = Join-Path $migrationsDir "${timestamp}_declarative_schema_snapshot.sql"
	Set-Content -Path $migrationFile -Value $migrationContent -Encoding utf8
	Write-Host "Created migration: $migrationFile"
}

if ($Apply) {
	Write-Host "Applying migrations with db reset..."
	Invoke-Step "npx supabase db reset"
}

if (-not $SkipTypes) {
	Write-Host "Ensuring local Supabase stack is running for type generation..."
	Invoke-Step "npx supabase start"

	Write-Host "Generating local TypeScript DB types..."
	Invoke-Step "npx supabase gen types --lang typescript --local | Set-Content -Path '$localTypesPath' -Encoding utf8"
}

Write-Host "Done."