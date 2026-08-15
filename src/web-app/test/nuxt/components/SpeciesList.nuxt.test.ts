import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SpeciesList from '~/components/SpeciesList.vue'

const species: Species[] = [
  {
    id: '1',
    slug: 'it',
    name: 'Dog',
    description: 'Canine species',
    icon_url: '/images/dog.svg',
    display_order: 1,
    is_active: true,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  },
  {
    id: '2',
    slug: 'pisik',
    name: undefined,
    description: null,
    icon_url: null,
    display_order: 2,
    is_active: true,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  },
]

describe('SpeciesList', () => {
  it('renders a card for each species with its name', async () => {
    const wrapper = await mountSuspended(SpeciesList, { props: { species } })
    expect(wrapper.text()).toContain('Dog')
    // falls back to slug when translated name is missing
    expect(wrapper.text()).toContain('pisik')
  })

  it('links each species to the filtered analyses page', async () => {
    const wrapper = await mountSuspended(SpeciesList, { props: { species } })
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('/analyses?species=it')
    expect(hrefs).toContain('/analyses?species=pisik')
  })

  it('renders nothing when there are no species', async () => {
    const wrapper = await mountSuspended(SpeciesList, { props: { species: [] } })
    expect(wrapper.findAll('a').length).toBe(0)
  })
})
