import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))

describe('analyses API', async () => {
  await setup({ rootDir })

  it('returns the list of active analyses', async () => {
    const analyses = await $fetch<Array<{ slug: string }>>('/api/analyses')
    expect(Array.isArray(analyses)).toBe(true)
    expect(analyses.some(a => a.slug === 'bal-orqanoleptiki-ari')).toBe(true)
  })

  it('filters analyses by species slug', async () => {
    const analyses = await $fetch<Array<{ species?: Array<{ species: { slug: string } }> }>>('/api/analyses', {
      query: { species: 'ari' },
    })
    expect(analyses.length).toBeGreaterThan(0)
    for (const analysis of analyses) {
      expect(analysis.species?.some(s => s.species.slug === 'ari')).toBe(true)
    }
  })

  it('returns a single analysis by slug with translated fields', async () => {
    const analysis = await $fetch<{ slug: string, name?: string }>('/api/analyses/bal-orqanoleptiki-ari', {
      headers: { 'accept-language': 'en' },
    })
    expect(analysis.slug).toBe('bal-orqanoleptiki-ari')
  })

  it('returns 404 for an unknown analysis slug', async () => {
    await expect($fetch('/api/analyses/does-not-exist')).rejects.toMatchObject({
      response: { status: 404 },
    })
  })
})
