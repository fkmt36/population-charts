<template>
  <div>
    <base-header :title="title"></base-header>
    <main><Nuxt /></main>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return document ? document.title : ''
    },
  },
}
</script>

<style scoped lang="scss">
main {
  margin: 20px 0;
  padding: 0 15px;
}
</style>
