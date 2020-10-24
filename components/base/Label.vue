<template>
  <label v-bind="$attrs" class="wit-block wit-font-weight--500">
    <slot />
  </label>
</template>

<script>
export default {
    name: 'Label'
}
</script>
