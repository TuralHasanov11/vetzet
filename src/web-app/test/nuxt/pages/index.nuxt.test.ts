import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

const useI18nMock = vi.hoisted(() => () => ({
  t: (key: string) => key,
  locale: { value: 'en' },
  locales: { value: ['az', 'en', 'ru'] },
  availableLocales: ['az', 'en', 'ru'],
  setLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => useI18nMock)

registerEndpoint('/api/species', () => [
  { id: '1', slug: 'it', name: 'Dog', description: null, icon_url: null, display_order: 1, is_active: true, created_at: '', updated_at: '' },
])

describe('home page', () => {
  it.skip('renders featured species', async () => {
    const wrapper = await mountSuspended(IndexPage, { route: '/' })
    // The species list is fetched with `lazy: true`, so wait for it to resolve.
    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Dog')
  })

  it.skip('renders the ELISA information accordion', async () => {
    const wrapper = await mountSuspended(IndexPage, { route: '/' })
    // The accordion items are built via the mocked `useI18n()` composable,
    // which deterministically returns the raw translation key.
    expect(wrapper.text()).toContain('home.elisa.points.early_diagnosis.label')
  })
})
