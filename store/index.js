export const state = () => ({
  prefectures: {},
  populations: {},
})

export const mutations = {
  setPrefectures(state, prefs) {
    state.prefectures = { ...prefs }
  },
  setPopulations(state, pops) {
    state.populations = { ...pops }
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
