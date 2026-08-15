import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AnalysisList from '~/components/AnalysisList.vue'

const baseAnalysis = {
  id: '1',
  slug: 'bal-orqanoleptiki-ari',
  species_id: 'species-1',
  category_id: 'category-1',
  method_id: null,
  sample_type_id: 'sample-1',
  sample_amount: '250 ml',
  storage_conditions: 'Cool and dry',
  turnaround_time: '1 day',
  display_order: 1,
  price: 10,
  currency: 'AZN',
  is_active: true,
  created_at: new Date(0).toISOString(),
  updated_at: new Date(0).toISOString(),
}

const analyses: Analysis[] = [
  {
    ...baseAnalysis,
    name: 'Honey organoleptic test',
    required_material: 'Honey sample',
    notes: null,
    category: {
      id: 'category-1',
      slug: 'ari-xestelikleri',
      name: 'Bee Diseases',
      description: null,
      display_order: 1,
      is_active: true,
      created_at: new Date(0).toISOString(),
      updated_at: new Date(0).toISOString(),
    },
  },
  {
    ...baseAnalysis,
    id: '2',
    slug: 'bal-ph-ari',
    name: undefined,
    required_material: null,
    price: null,
    category: null,
  },
]

describe('AnalysisList', () => {
  it('renders a card for each analysis with its name and required material', async () => {
    const wrapper = await mountSuspended(AnalysisList, { props: { analyses } })
    expect(wrapper.text()).toContain('Honey organoleptic test')
    expect(wrapper.text()).toContain('Honey sample')
    expect(wrapper.text()).toContain('Bee Diseases')
    // falls back to slug when name is missing
    expect(wrapper.text()).toContain('bal-ph-ari')
  })

  it('links each analysis to its detail page', async () => {
    const wrapper = await mountSuspended(AnalysisList, { props: { analyses } })
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('/analyses/bal-orqanoleptiki-ari')
    expect(hrefs).toContain('/analyses/bal-ph-ari')
  })

  it('renders nothing when there are no analyses', async () => {
    const wrapper = await mountSuspended(AnalysisList, { props: { analyses: [] } })
    expect(wrapper.findAll('a').length).toBe(0)
  })
})
