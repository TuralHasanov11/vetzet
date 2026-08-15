import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))

describe('species API', async () => {
  await setup({ rootDir })

  it('returns the list of active species', async () => {
    const species = await $fetch<Array<{ slug: string }>>('/api/species')
    expect(Array.isArray(species)).toBe(true)
    expect(species.some(s => s.slug === 'it')).toBe(true)
  })

  it('returns translated names for the requested locale', async () => {
    const species = await $fetch<Array<{ slug: string, name?: string }>>('/api/species', {
      headers: { 'accept-language': 'en' },
    })
    const dog = species.find(s => s.slug === 'it')
    expect(dog?.name).toBe('Dog')
  })
})
