import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import CataloguePage from '~/pages/analysis-catalogue/index.vue'

const useI18nMock = vi.hoisted(() => () => ({
  t: (key: string) => key,
  locale: { value: 'en' },
  locales: { value: ['az', 'en', 'ru'] },
  availableLocales: ['az', 'en', 'ru'],
  setLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => useI18nMock)
mockNuxtImport('useLocalePath', () => () => (path: string) => `/${useI18nMock().locale.value}${path}`)

registerEndpoint('/api/species', () => [
  { id: '1', slug: 'it', name: 'Dog', description: null, icon_url: null, display_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', slug: 'pisik', name: 'Cat', description: null, icon_url: null, display_order: 2, is_active: true, created_at: '', updated_at: '' },
])

describe('analysis catalogue page', () => {
  it('renders the catalogue title and the species list', async () => {
    const wrapper = await mountSuspended(CataloguePage, { route: '/analysis-catalogue' })
    // The section title uses the untranslated global `$t`, which
    // deterministically falls back to the raw translation key here.
    expect(wrapper.text()).toContain('analysis_catalogue.title')
    expect(wrapper.text()).toContain('Dog')
    expect(wrapper.text()).toContain('Cat')
  })
})
