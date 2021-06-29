import { mount, createLocalVue } from '@vue/test-utils'
import ThePopulationChart from '@/components/ThePopulationChart.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ThePopulationChart', () => {
  test('都道府県が表示される', () => {
    const testData = '北海道'
    const store = new Vuex.Store({
      state: {
        prefectures: { 1: testData },
        populations: {
          1: [
            { year: 1960, value: 5039206 },
            { year: 1965, value: 5171800 },
            { year: 1970, value: 5184287 },
          ],
        },
        selectedPrefs: [1],
      },
    })
    const wrapper = mount(ThePopulationChart, {
      store,
      localVue,
    })
    expect(wrapper.html()).toContain(testData)
  })
})
