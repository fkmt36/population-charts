import { createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import Vuex from 'vuex'
import * as storeIndex from '~/store/index'

const localVue = createLocalVue()
localVue.use(Vuex)

// Storeに関するテスト
describe('index store', () => {
  // fetchPrefecturesを実行すると都道府県リストがprefecturesにセットされるか？
  test('fetchPrefectures should mutate prefectures', async () => {
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
})
