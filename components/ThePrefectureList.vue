<template>
  <ul class="pref-list">
    <li v-for="(v, k) in prefectures" :key="'pref-' + k">
      <base-checkbox :label="v" :check="(c) => selectPref(k, c)" />
    </li>
    <li
      v-for="n of Object.keys(prefectures).length > 0
        ? Object.keys(prefectures).length - 1
        : 0"
      :key="'empty-' + n"
    ></li>
  </ul>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['prefectures', 'populations']),
  },

  methods: {
    ...mapMutations(['addSelectedPrefs', 'removeSelectedPrefs']),
    ...mapActions(['fetchPopulationByPrefCode']),

    // selectPref 選択した都道府県をselectedPrefに追加（削除）
    async selectPref(prefCode, checked) {
      if (checked) {
        // 人口データがなければfetchする
        if (!(prefCode in this.populations))
          await this.fetchPopulationByPrefCode(prefCode)
        this.addSelectedPrefs(prefCode)
      } else {
        this.removeSelectedPrefs(prefCode)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.pref-list {
  @include flex(center, unset);
  flex-wrap: wrap;
  li {
    width: 90px;
    margin-bottom: 6px;
    &:empty {
      margin-bottom: 0;
    }
  }
}
</style>
