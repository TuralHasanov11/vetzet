import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import AnalysisDetailPage from '~/pages/analyses/[slug].vue'

const useI18nMock = vi.hoisted(() => () => ({
  t: (key: string) => key,
  locale: { value: 'en' },
  locales: { value: ['az', 'en', 'ru'] },
  availableLocales: ['az', 'en', 'ru'],
  setLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => useI18nMock)
mockNuxtImport('useLocalePath', () => () => (path: string) => `/${useI18nMock().locale.value}${path}`)

describe('analysis detail page', () => {
  it.skip('renders analysis details when found', async () => {
    registerEndpoint('/api/analyses/bal-orqanoleptiki-ari', () => ({
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
      notes: 'Handle with care',
      category: { id: 'c1', slug: 'ari-xestelikleri', name: 'Bee Diseases' },
      species: [{ species: { id: '1', slug: 'ari', name: 'Bee' } }],
    }))

    const wrapper = await mountSuspended(AnalysisDetailPage, { route: '/analyses/bal-orqanoleptiki-ari' })
    expect(wrapper.text()).toContain('Honey organoleptic test')
    expect(wrapper.text()).toContain('Honey sample')
    expect(wrapper.text()).toContain('Handle with care')
    expect(wrapper.text()).toContain('10 AZN')
  })
})
