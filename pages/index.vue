<template>
  <div class="container">
    <div class="pref-list">
      <label v-for="(v, k) in prefectures" :key="k"
        ><input type="checkbox" />{{ v }}</label
      >
    </div>
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
