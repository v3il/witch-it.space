<template>
  <div class="wit-color--muted wit-flex wit-flex--column wit-flex--align-center wit-offset-bottom--xs">
    <b-icon
      icon="microsoft-xbox-controller-battery-empty"
      size="is-large"
      class="wit-offset-bottom--sm"
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
        }
    }
}
</script>
