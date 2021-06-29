import { mount, createLocalVue } from '@vue/test-utils'
import ThePrefectureList from '@/components/ThePrefectureList.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BaseCheckbox', BaseCheckbox)

describe('ThePrefectureList', () => {
  test('チェックなしからチェックあり&&データがない場合、データをfetchしてselectedPrefにprefCodeを追加する', async () => {
    const addSelectedPrefs = jest.fn()
    const fetchPopulationByPrefCode = jest.fn()
    const prefCode = '1'
    const store = new Vuex.Store({
      state: {
        prefectures: {
          [prefCode]: '北海道',
        },
        populations: {},
        selectedPrefs: [],
      },
      mutations: {
        addSelectedPrefs,
      },
      actions: {
        fetchPopulationByPrefCode,
      },
    })
    const wrapper = mount(ThePrefectureList, {
      store,
      localVue,
    })
    await wrapper.findAll('input').at(0).setChecked(true)
    expect(fetchPopulationByPrefCode).toHaveBeenCalled()
    expect(addSelectedPrefs).toHaveBeenCalled()
    expect(addSelectedPrefs.mock.calls[0][1]).toBe(prefCode)
  })

  test('チェックなしからチェックあり&&データがある場合、selectedPrefにprefCodeを追加する', async () => {
    const addSelectedPrefs = jest.fn()
    const fetchPopulationByPrefCode = jest.fn()
    const prefCode = '1'
    const store = new Vuex.Store({
      state: {
        prefectures: {
          [prefCode]: '北海道',
        },
        populations: {
          [prefCode]: {},
        },
        selectedPrefs: [],
      },
      mutations: {
        addSelectedPrefs,
      },
      actions: {
        fetchPopulationByPrefCode,
      },
    })
    const wrapper = mount(ThePrefectureList, {
      store,
      localVue,
    })
    await wrapper.findAll('input').at(0).setChecked(true)
    expect(addSelectedPrefs).toHaveBeenCalled()
    expect(addSelectedPrefs.mock.calls[0][1]).toBe(prefCode)
  })

  test('チェックありからチェックなしの場合、selectedPrefからprefCodeを削除する', async () => {
    const removeSelectedPrefs = jest.fn()
    const prefCode = '1'
    const store = new Vuex.Store({
      state: {
        prefectures: {
          [prefCode]: '北海道',
        },
        populations: {
          [prefCode]: {},
        },
        selectedPrefs: [],
      },
      mutations: {
        removeSelectedPrefs,
      },
      actions: {},
    })
    const wrapper = mount(ThePrefectureList, {
      store,
      localVue,
    })
    wrapper.findAll('input').at(0).element.checked = true
    await wrapper.findAll('input').at(0).setChecked(false)
    expect(removeSelectedPrefs).toHaveBeenCalled()
    expect(removeSelectedPrefs.mock.calls[0][1]).toBe(prefCode)
  })
})
