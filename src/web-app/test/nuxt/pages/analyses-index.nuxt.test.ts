import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import AnalysesIndexPage from '~/pages/analyses/index.vue'

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
registerEndpoint('/api/analysis-categories', () => [
  { id: '1', slug: 'ari-xestelikleri', name: 'Bee Diseases', description: null, display_order: 1, is_active: true, created_at: '', updated_at: '' },
])
registerEndpoint('/api/analyses', () => [
  {
    id: '1',
    slug: 'bal-orqanoleptiki-ari',
    name: 'Honey organoleptic test',
    species_id: 's1',
    category_id: 'c1',
    method_id: null,
    sample_type_id: 'st1',
    sample_amount: '250 ml',
    storage_conditions: 'Cool and dry',
    turnaround_time: '1 day',
    display_order: 1,
    price: 10,
    currency: 'AZN',
    is_active: true,
    created_at: '',
    updated_at: '',
    required_material: 'Honey sample',
    notes: null,
    category: { id: 'c1', slug: 'ari-xestelikleri', name: 'Bee Diseases' },
    species: [{ species: { id: '1', slug: 'ari' } }],
  },
])

describe('analyses index page', () => {
  it.skip('renders the list of analyses returned from the API', async () => {
    const wrapper = await mountSuspended(AnalysesIndexPage, { route: '/analyses' })
    expect(wrapper.text()).toContain('Honey organoleptic test')
  })

  it.skip('shows a no-results message when the search does not match anything', async () => {
    const wrapper = await mountSuspended(AnalysesIndexPage, { route: '/analyses' })
    await wrapper.find('input').setValue('this analysis does not exist')
    await wrapper.vm.$nextTick()
    // The no-results alert title uses the untranslated global `$t`, which
    // deterministically falls back to the raw translation key here.
    expect(wrapper.text()).toContain('analyses.no_results')
  })
})
