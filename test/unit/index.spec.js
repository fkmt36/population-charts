import { mount, createLocalVue } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BaseCheckbox', BaseCheckbox)

describe('index', () => {
  test('created should call fetchPrefectures', () => {
    const actions = {
      fetchPrefectures: jest.fn(),
    }
    const store = new Vuex.Store({
      state: { prefectures: {} },
      actions,
    })
    mount(Index, { store, localVue })
    expect(actions.fetchPrefectures).toHaveBeenCalled()
  })
  test('empty prefectures should show empty pref-list', () => {
    const store = new Vuex.Store({
      state: {
        prefectures: {},
      },
      actions: {
        fetchPrefectures: jest.fn(),
      },
    })
    const wrapper = mount(Index, { store, localVue })
    const prefList = '<ul class="pref-list"> </ul>'
    expect(wrapper.html()).toContain(prefList)
  })
  test('not empty prefectures should show pref-list', () => {
    const store = new Vuex.Store({
      state: {
        prefectures: {
          1: '北海道',
        },
      },
      actions: {
        fetchPrefectures: jest.fn(),
      },
    })
    const wrapper = mount(Index, { store, localVue })
    const prefList = '<input type="checkbox">北海道</label></div>'
    expect(wrapper.html()).toContain(prefList)
  })
})
