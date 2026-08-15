import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import AboutPage from '~/pages/about/index.vue'

const useI18nMock = vi.hoisted(() => () => ({
  t: (key: string) => key,
  locale: { value: 'en' },
  locales: { value: ['az', 'en', 'ru'] },
  availableLocales: ['az', 'en', 'ru'],
  setLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => useI18nMock)

describe('about page', () => {
  it.skip('renders the about content and contact details from app config', async () => {
    const wrapper = await mountSuspended(AboutPage, { route: '/about' })
    // Translated text deterministically falls back to the raw i18n key in
    // this test environment; the contact details come from static app config.
    expect(wrapper.text()).toContain('about.portal_intro')
    expect(wrapper.text()).toContain('about.location')
    expect(wrapper.text()).toContain('info@vetzet.com')
    expect(wrapper.text()).toContain('+994 012 000 00 00')
  })
})
