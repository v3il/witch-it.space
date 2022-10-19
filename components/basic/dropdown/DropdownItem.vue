<template>
  <li>
    <b-button type="is-ghost" class="wit-color--white wit-block--full-width wit-flex--justify-start wit-dropdown-item" @click="$emit('click')">
      <slot />
    </b-button>
  </li>
</template>

<script>
export default {
    name: 'DropdownItem'
}
</script>
