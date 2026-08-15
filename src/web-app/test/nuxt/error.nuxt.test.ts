import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NuxtError from '~/error.vue'
import type { NuxtError as NuxtErrorType } from '#app'

function makeError(overrides: Partial<NuxtErrorType>): NuxtErrorType {
  return {
    status: 500,
    statusCode: 500,
    statusMessage: '',
    message: '',
    url: '/',
    fatal: false,
    unhandled: false,
    name: 'NuxtError',
    ...overrides,
  } as NuxtErrorType
}

describe('error page', () => {
  it('renders a not found message for a 404 error', async () => {
    const wrapper = await mountSuspended(NuxtError, {
      props: { error: makeError({ status: 404, statusCode: 404, statusMessage: 'Not Found' }) },
    })
    expect(wrapper.text()).toContain('404')
    // error.vue only calls the global `$t` (not the `useI18n()` composable),
    // which reliably falls back to the raw translation key in this test
    // environment (see test/nuxt/setup/i18n.ts).
    expect(wrapper.text()).toContain('common.not_found')
  })

  it('renders a generic error message and the error text for other statuses', async () => {
    const wrapper = await mountSuspended(NuxtError, {
      props: { error: makeError({ statusMessage: 'Server Error', message: 'Something broke' }) },
    })
    expect(wrapper.text()).toContain('500')
    expect(wrapper.text()).toContain('common.error')
    expect(wrapper.text()).toContain('Something broke')
  })

  it('links back to the home page', async () => {
    const wrapper = await mountSuspended(NuxtError, {
      props: { error: makeError({ status: 404, statusCode: 404, statusMessage: 'Not Found' }) },
    })
    const homeLink = wrapper.findAll('a').find(a => a.attributes('href') === '/')
    expect(homeLink).toBeTruthy()
  })
})
