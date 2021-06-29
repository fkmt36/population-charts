import { mount } from '@vue/test-utils'
import BaseCheckbox from '@/components/BaseCheckbox.vue'

describe('BaseCheckbox', () => {
  let testData
  let wrapper

  beforeEach(() => {
    testData = {
      label: '北海道',
      check: jest.fn(),
    }
    wrapper = mount(BaseCheckbox, {
      propsData: { ...testData },
    })
  })

  test('labelが表示される', () => {
    expect(wrapper.html()).toContain(testData.label)
  })

  test('checkなしからcheckありの場合trueが返る', async () => {
    await wrapper.find('input').setChecked()
    expect(testData.check).toHaveBeenCalled()
    expect(testData.check.mock.calls[0][0]).toBe(true)
  })

  test('checkありからcheckなしの場合falseが返る', async () => {
    wrapper.find('input').element.checked = true
    await wrapper.find('input').setChecked(false)
    expect(testData.check).toHaveBeenCalled()
    expect(testData.check.mock.calls[0][0]).toBe(false)
  })
})
