npx supabase db reset

$types = npx supabase gen types --lang typescript --local
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path '../../web-app/shared/types/database.types.ts'), ($types -join [Environment]::NewLine), $utf8NoBom)