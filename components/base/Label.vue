<template>
  <label v-bind="$attrs" class="wit-label wit-block wit-font-weight--500">
    <slot />
  </label>
</template>

<script>
export default {
    name: 'Label'
}
</script>

<style scoped>
.wit-label {
    font-family: Roboto, sans-serif;
}
</style>
