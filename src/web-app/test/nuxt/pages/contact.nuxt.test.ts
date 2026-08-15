import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import ContactPage from '~/pages/contact/index.vue'

const useI18nMock = vi.hoisted(() => () => ({
  t: (key: string) => key,
  locale: { value: 'en' },
  locales: { value: ['az', 'en', 'ru'] },
  availableLocales: ['az', 'en', 'ru'],
  setLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => useI18nMock)

describe('contact page', () => {
  it('submits the form and shows a success message', async () => {
    registerEndpoint('/api/contact', {
      method: 'POST',
      handler: () => ({ success: true }),
    })

    const wrapper = await mountSuspended(ContactPage, { route: '/contact' })

    const inputs = wrapper.findAll('input')
    await inputs[0]!.setValue('Jane Doe')
    await inputs[1]!.setValue('jane@example.com')
    await wrapper.find('textarea').setValue('Hello, I have a question about your services.')

    await wrapper.find('form').trigger('submit')
    await new Promise(resolve => setTimeout(resolve, 0))

    // The success/error alerts use the untranslated global `$t`, which
    // deterministically falls back to the raw translation key here.
    expect(wrapper.text()).toContain('contact.success')
  })

  it('shows an error message when the submission fails', async () => {
    registerEndpoint('/api/contact', {
      method: 'POST',
      handler: () => {
        throw new Error('failed')
      },
    })

    const wrapper = await mountSuspended(ContactPage, { route: '/contact' })

    const inputs = wrapper.findAll('input')
    await inputs[0]!.setValue('Jane Doe')
    await inputs[1]!.setValue('jane@example.com')
    await wrapper.find('textarea').setValue('Hello, I have a question about your services.')

    await wrapper.find('form').trigger('submit')
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(wrapper.text()).toContain('contact.error')
  })
})
