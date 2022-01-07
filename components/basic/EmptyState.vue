<template>
  <div class="wit-color--muted wit-flex wit-flex--column wit-flex--align-center">
    <b-icon
      :icon="icon"
      size="is-large"
      class="wit-offset-bottom--xs"
    />
    {{ text }}
    <slot />
  </div>
</template>

<script>
export default {
    name: 'EmptyState',

    props: {
        text: {
            required: true,
            type: String
        },

        icon: {
            required: true,
            type: String
        }
    }
}
</script>
