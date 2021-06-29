import { createLocalVue, shallowMount } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import ThePrefectureList from '@/components/ThePrefectureList.vue'
import ThePopulationChart from '@/components/ThePopulationChart.vue'
import Vuex from 'vuex'
import { test } from '@jest/globals'
import { cloneDeep } from 'lodash'
import * as storeIndex from '~/store/index'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ThePrefectureList', ThePrefectureList)
localVue.component('ThePopulationChart', ThePopulationChart)

describe('index', () => {
  test('アクセスするとfetchPrefecturesが実行される', () => {
    storeIndex.actions.fetchPrefectures = jest.fn()
    const store = new Vuex.Store(cloneDeep(storeIndex))
    shallowMount(Index, {
      store,
      localVue,
    })
    expect(storeIndex.actions.fetchPrefectures).toHaveBeenCalled()
  })
})
