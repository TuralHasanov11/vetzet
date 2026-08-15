import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))

describe('analysis categories API', async () => {
  await setup({ rootDir })

  it('returns the list of active analysis categories', async () => {
    const categories = await $fetch<Array<{ slug: string }>>('/api/analysis-categories')
    expect(Array.isArray(categories)).toBe(true)
    expect(categories.some(c => c.slug === 'ari-xestelikleri')).toBe(true)
  })

  it('returns translated names for the requested locale', async () => {
    const categories = await $fetch<Array<{ slug: string, name?: string }>>('/api/analysis-categories', {
      headers: { 'accept-language': 'en' },
    })
    const beeDiseases = categories.find(c => c.slug === 'ari-xestelikleri')
    expect(beeDiseases?.name).toBe('Bee Diseases')
  })
})
