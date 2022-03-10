<template>
  <li>
    <b-button type="is-ghost" class="wit-color--white" @click="$emit('click')">
      <slot />
    </b-button>
  </li>
</template>

<script>
export default {
    name: 'DropdownItem'
}
</script>

<style scoped>

</style>
