<template>
  <div>
    <!-- 都道府県一覧 -->
    <section class="pref-section">
      <div class="pref-section-inner">
        <h2>都道府県</h2>
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
      </div>
    </section>
    <!-- 人口構成グラフ -->
    <section class="popu-section">
      <div class="popu-section-inner">
        <the-population-chart :series="series" />
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['prefectures', 'populations', 'selectedPrefs']),

    // series Highchartsのためにデータを整形
    series() {
      return this.selectedPrefs.map((v) => {
        return {
          name: this.prefectures[v],
          data: this.populations[v].map((p) => [p.year, p.value]),
        }
      })
    },
  },
  async created() {
    await this.fetchPrefectures()
  },
  methods: {
    ...mapMutations(['addSelectedPrefs', 'removeSelectedPrefs']),
    ...mapActions(['fetchPrefectures', 'fetchPopulationByPrefCode']),

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
.pref-section {
  .pref-section-inner {
    max-width: w(tab);
    margin: 0 auto;

    h2 {
      font-size: fs(normal);
      margin-bottom: 10px;
    }

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
  }
}
.popu-section {
  .popu-section-inner {
    max-width: w(laptop);
    margin: 0 auto;
  }
}
</style>
