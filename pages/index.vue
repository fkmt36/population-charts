<template>
  <div class="container">
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
.pref-list {
  @include flex(center, unset);
  flex-wrap: wrap;
  max-width: w(tab);
  margin: 0 auto;
  li {
    width: 90px;
    margin-bottom: 6px;
    &:empty {
      margin-bottom: 0;
    }
  }
}
</style>
