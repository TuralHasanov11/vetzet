import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

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
registerEndpoint('/api/species', () => [])

describe('App', () => {
  it.skip('renders the home page inside the default layout', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    expect(wrapper.html()).toContain('Vetzet')
  })

  it.skip('renders the about page for a different route', async () => {
    const wrapper = await mountSuspended(App, { route: '/about' })
    // Translations aren't guaranteed to resolve for routed pages rendered
    // through `NuxtPage`, so assert on static app-config driven content.
    expect(wrapper.text()).toContain('info@vetzet.com')
  })
})
