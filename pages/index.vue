<template>
  <div>
    <section class="pref-section">
      <div class="pref-section-inner">
        <h2>都道府県</h2>
        <ul class="pref-list">
          <li v-for="(v, k) in prefectures" :key="'pref-' + k">
            <base-checkbox :label="v" :check="(c) => {}" />
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
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['prefectures']),
  },
  async created() {
    await this.fetchPrefectures()
  },
  methods: {
    ...mapActions(['fetchPrefectures']),
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
</style>
