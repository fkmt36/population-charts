<template>
  <div>
    <!-- 都道府県一覧 -->
    <section class="pref-section">
      <div class="pref-section-inner">
        <h2>都道府県</h2>
        <the-prefecture-list />
      </div>
    </section>
    <!-- 人口構成グラフ -->
    <section class="popu-section">
      <div class="popu-section-inner">
        <the-population-chart />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('fetchPrefectures')
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
  }
}
.popu-section {
  .popu-section-inner {
    max-width: w(laptop);
    margin: 0 auto;
  }
}
</style>
