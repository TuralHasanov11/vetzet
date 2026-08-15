import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import BaseHeader from '~/components/BaseHeader.vue'

// `useI18n()` depends on a plugin `provide()` that isn't reliably re-applied
// to the isolated app instances `mountSuspended` creates, so it must be
// mocked to avoid a "Need to install with `app.use` function" error.
const useI18nMock = vi.hoisted(() => () => ({
  t: (key: string) => key,
  locale: { value: 'en' },
  locales: { value: [
    { code: 'az', name: 'Azərbaycan' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ] },
  availableLocales: ['az', 'en', 'ru'],
  setLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => useI18nMock)
mockNuxtImport('useSwitchLocalePath', () => () => (locale: string) => `/${locale}`)
mockNuxtImport('useLocaleRoute', () => () => (location: any) => {
  if (typeof location === 'string') return location
  if (location.name) {
    const routeMap: Record<string, string> = {
      index: '/', about: '/about', contact: '/contact',
      analyses: '/analyses', 'analyses-slug': '/analyses/[slug]',
      'analysis-catalogue': '/analysis-catalogue', admin: '/admin',
    }
    let path = routeMap[location.name] || `/${location.name}`
    if (location.params) {
      for (const [key, value] of Object.entries(location.params)) {
        path = path.replace(`[${key}]`, String(value))
      }
    }
    return path
  }
  return '/'
})

describe('BaseHeader', () => {
  it('renders the app name and primary navigation links', async () => {
    const wrapper = await mountSuspended(BaseHeader)
    expect(wrapper.text()).toContain('Vetzet')

    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/analysis-catalogue')
    expect(hrefs).toContain('/analyses')
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/contact')
  })
})
