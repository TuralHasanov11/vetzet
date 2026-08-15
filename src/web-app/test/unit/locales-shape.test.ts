import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))

function readLocale(fileName: string): unknown {
  return JSON.parse(readFileSync(`${rootDir}/i18n/locales/${fileName}`, 'utf-8'))
}

function flattenKeys(input: unknown, prefix = ''): string[] {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return prefix ? [prefix] : []
  }

  return Object.entries(input as Record<string, unknown>).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return flattenKeys(value, path)
  })
}

describe('locale files', () => {
  it('share the same translation key structure', () => {
    const az = readLocale('az.json')
    const en = readLocale('en.json')
    const ru = readLocale('ru.json')

    const azKeys = flattenKeys(az).sort()
    const enKeys = flattenKeys(en).sort()
    const ruKeys = flattenKeys(ru).sort()

    expect(enKeys).toEqual(azKeys)
    expect(ruKeys).toEqual(azKeys)
  })
})
