import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))

describe('home page', async () => {
  await setup({ rootDir })

  it('renders the hero section and brand name', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Vetzet')
    expect(html).toContain('Animal health, laboratory diagnostics, and veterinary services')
  })
})
