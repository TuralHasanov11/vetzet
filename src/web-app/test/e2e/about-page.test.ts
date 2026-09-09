import { describe, expect, test } from 'vitest'
import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))

describe('about page', async () => {
  await setup({ rootDir })

  test('renders with brand name', async () => {
    const html = await $fetch('/about')
    expect(html).toContain('Vetzet')
  })
})
