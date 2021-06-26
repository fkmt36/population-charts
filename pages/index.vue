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
        <highcharts :options="chartOptions"></highcharts>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      // 選択した都道府県リスト（選択した順番を保持するため配列）
      selectedPrefs: [],
      // Highchartsの設定
      chartOptions: {
        chart: {
          spacingTop: 50,
          spacingLeft: -35,
        },
        title: {
          text: '',
        },
        xAxis: {
          title: {
            text: '年度',
            align: 'high',
            x: 32,
            y: -18,
          },
        },
        yAxis: {
          title: {
            text: '人口数',
            align: 'high',
            x: 45,
            y: -25,
            rotation: 0,
          },

          labels: {
            x: -5,
            formatter() {
              return Highcharts.numberFormat(this.value, 0, '.', '')
            },
          },
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          layout: 'vertical',
        },
        series: [],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 600,
              },
              chartOptions: {
                chart: {
                  spacingLeft: -35,
                },
                xAxis: {
                  title: {
                    align: 'high',
                    x: 0,
                    y: 0,
                  },
                },
                yAxis: {
                  title: {
                    align: 'high',
                    x: 45,
                    y: -25,
                    rotation: 0,
                  },
                  labels: {
                    align: 'left',
                    x: 0,
                    y: -2,
                  },
                },
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
      },
    }
  },
  computed: {
    ...mapState(['prefectures', 'populations']),
    series() {
      // Highchartsのためにデータを整形
      return this.selectedPrefs.map((v) => {
        return {
          name: this.prefectures[v],
          data: this.populations[v].map((p) => [p.year, p.value]),
        }
      })
    },
  },
  watch: {
    series() {
      this.chartOptions.series = this.series
    },
  },
  async created() {
    await this.fetchPrefectures()
  },
  methods: {
    ...mapActions(['fetchPrefectures', 'fetchPopulationByPrefCode']),
    // 選択した都道府県をselectedPrefに追加（削除）
    async selectPref(prefCode, checked) {
      if (checked) {
        // 人口データがなければfetchする
        if (!(prefCode in this.populations))
          await this.fetchPopulationByPrefCode(prefCode)
        this.selectedPrefs.push(prefCode)
      } else {
        this.selectedPrefs = this.selectedPrefs.filter((c) => c !== prefCode)
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
