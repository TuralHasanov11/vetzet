import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BaseFooter from '~/components/BaseFooter.vue'

describe('BaseFooter', () => {
  it('renders the app name from app config and the current year', async () => {
    const wrapper = await mountSuspended(BaseFooter)
    expect(wrapper.text()).toContain('Heyvan Sağlamlığı Diaqnostik Mərkəzi')
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
  })

  it('links to the about and contact pages', async () => {
    const wrapper = await mountSuspended(BaseFooter)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/contact')
  })
})
