export const state = () => ({
  prefectures: {},
  populations: {},
  // selectedPrefs 選択した都道府県リスト（選択した順番を保持するため配列）
  selectedPrefs: [],
})

export const mutations = {
  setPrefectures(state, prefs) {
    state.prefectures = { ...prefs }
  },
  setPopulations(state, pops) {
    state.populations = { ...pops }
  },
  addSelectedPrefs(state, prefCode) {
    state.selectedPrefs.push(prefCode)
  },
  removeSelectedPrefs(state, prefCode) {
    state.selectedPrefs = state.selectedPrefs.filter((c) => c !== prefCode)
  },
}

export const actions = {
  async fetchPrefectures({ commit }) {
    const { result } = await this.$axios.$get('/prefectures')
    commit(
      'setPrefectures',
      result.reduce((acc, cur) => {
        acc[cur.prefCode] = cur.prefName
        return acc
      }, {})
    )
  },
  async fetchPopulationByPrefCode({ state, commit }, prefCode) {
    const { result } = await this.$axios.$get(
      `/population/composition/perYear?prefCode=${prefCode}`
    )
    commit('setPopulations', {
      ...state.populations,
      [prefCode]: result.data[0].data,
    })
  },
}
