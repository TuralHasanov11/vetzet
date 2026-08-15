import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))

describe('analysis catalogue page', async () => {
  await setup({ rootDir })

  it('renders the catalogue with species cards', async () => {
    const html = await $fetch('/analysis-catalogue')
    expect(html).toContain('Service Catalogue')
  })
})
