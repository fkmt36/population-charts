import { createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import Vuex from 'vuex'
import * as storeIndex from '~/store/index'

const localVue = createLocalVue()
localVue.use(Vuex)

// Storeに関するテスト
describe('index store', () => {
  test('fetchPrefecturesを実行すると都道府県リストがprefecturesにセットされる', async () => {
    const inputData = {
      message: null,
      result: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 5, prefName: '青森県' },
        { prefCode: 20, prefName: '岩手県' },
      ],
    }
    const outputData = {
      1: '北海道',
      5: '青森県',
      20: '岩手県',
    }
    const store = new Vuex.Store(cloneDeep(storeIndex))
    store.$axios = axios
    store.$axios.$get = jest.fn(() => Promise.resolve(inputData))
    await store.dispatch('fetchPrefectures')
    expect(store.state.prefectures).toEqual(outputData)
  })

  test('etchPopulationByPrefCodeを実行すると人口データがpopulationsにセットされる', async () => {
    const prefCode = 1
    const inputData = {
      message: null,
      result: {
        boundaryYear: 2015,
        data: [
          {
            label: '総人口',
            data: [
              { year: 1960, value: 5039206 },
              { year: 1965, value: 5171800 },
              { year: 1970, value: 5184287 },
            ],
          },
        ],
      },
    }
    const outputData = {
      [prefCode]: [
        { year: 1960, value: 5039206 },
        { year: 1965, value: 5171800 },
        { year: 1970, value: 5184287 },
      ],
    }
    const store = new Vuex.Store(cloneDeep(storeIndex))
    store.$axios = axios
    store.$axios.$get = jest.fn(() => Promise.resolve(inputData))
    await store.dispatch('fetchPopulationByPrefCode', prefCode)
    expect(store.state.populations).toEqual(outputData)
  })

  test('addSelectedPrefsを実行するとselectedPrefsにprefCodeが追加される', () => {
    const inputData = '1'
    const outputData = ['1']
    const store = new Vuex.Store(cloneDeep(storeIndex))
    store.commit('addSelectedPrefs', inputData)
    expect(store.state.selectedPrefs).toEqual(outputData)
  })

  test('removeSelectedPrefsを実行するとselectedPrefsからprefCodeが削除される', () => {
    const inputData = '1'
    const outputData = []
    const store = new Vuex.Store(cloneDeep(storeIndex))
    store.state.selectedPrefs = [inputData]
    store.commit('removeSelectedPrefs', inputData)
    expect(store.state.selectedPrefs).toEqual(outputData)
  })
})
