import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SkeletonList from '~/components/SkeletonList.vue'

describe('SkeletonList', () => {
  it('renders the requested number of skeleton placeholders', async () => {
    const wrapper = await mountSuspended(SkeletonList, { props: { count: 5 } })
    expect(wrapper.findAllComponents({ name: 'USkeleton' }).length).toBe(5)
  })

  it('renders no placeholders when count is zero', async () => {
    const wrapper = await mountSuspended(SkeletonList, { props: { count: 0 } })
    expect(wrapper.findAllComponents({ name: 'USkeleton' }).length).toBe(0)
  })
})
