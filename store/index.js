export const state = () => ({
  prefectures: {},
})

export const mutations = {
  setPrefectures(state, prefs) {
    state.prefectures = { ...prefs }
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
}
