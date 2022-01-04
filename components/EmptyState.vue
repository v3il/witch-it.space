<template>
  <div class="wit-color--muted wit-flex wit-flex--column wit-flex--align-center wit-offset-bottom--xs">
    <b-icon
      :icon="icon"
      size="is-large"
      class="wit-offset-bottom--xs"
    />
    {{ text }}
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
