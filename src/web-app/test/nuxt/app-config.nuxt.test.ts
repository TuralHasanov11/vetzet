import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useAppConfig } from '#imports'

describe('nuxt runtime', () => {
  it('exposes app config in Nuxt environment', async () => {
    const TestComponent = defineComponent({
      setup() {
        const appConfig = useAppConfig()
        return () => h('div', appConfig.appName)
      },
    })

    const wrapper = await mountSuspended(TestComponent)
    expect(wrapper.text()).toContain('Heyvan Sağlamlığı Diaqnostik Mərkəzi')
  })
})
