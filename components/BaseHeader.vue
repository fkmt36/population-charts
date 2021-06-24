<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
header {
  @include flex(center, center);
  background: cl(primary);
  height: 50px;
  border-bottom: 1px solid cl(grey);
  h1 {
    font-size: fs(h3);
  }
}
</style>
