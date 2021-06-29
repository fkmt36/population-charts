import { mount } from '@vue/test-utils'
import BaseHeader from '@/components/BaseHeader.vue'

describe('BaseHeader', () => {
  let testData
  let wrapper

  beforeEach(() => {
    testData = {
      title: 'タイトル',
    }
    wrapper = mount(BaseHeader, {
      propsData: { ...testData },
    })
  })

  test('titleが表示される', () => {
    expect(wrapper.html()).toContain(testData.title)
  })
})
