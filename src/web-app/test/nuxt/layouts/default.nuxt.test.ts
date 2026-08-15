import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import DefaultLayout from '~/layouts/default.vue'

const useI18nMock = vi.hoisted(() => () => ({
  t: (key: string) => key,
  locale: { value: 'en' },
  locales: { value: ['az', 'en', 'ru'] },
  availableLocales: ['az', 'en', 'ru'],
  setLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => useI18nMock)

describe('default layout', () => {
  it('renders the base header, footer and slot content', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: { default: () => 'Page content' },
    })
    expect(wrapper.text()).toContain('Vetzet')
    expect(wrapper.text()).toContain('Page content')
  })
})
