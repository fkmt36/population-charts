<template>
  <div class="error">
    <h1>{{ error.statusCode }}</h1>
    <p v-if="error.statusCode === 404">ページが見つかりません</p>
    <p v-else>エラーが発生しました</p>
    <nuxt-link to="/">トップに戻る</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
.error {
  @include flex(center, center);
  flex-direction: column;
  p {
    margin: 15px 0;
  }
}
</style>
