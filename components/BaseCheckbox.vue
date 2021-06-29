<template>
  <label
    ><input type="checkbox" @change="(e) => check(e.target.checked)" />{{
      label
    }}</label
  >
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
    check: {
      type: Function,
      default: () => {},
      required: true,
    },
  },
}
</script>
