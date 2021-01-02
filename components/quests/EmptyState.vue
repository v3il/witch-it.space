<template>
  <div class="wit-color--muted wit-flex wit-flex--column wit-flex--align-center">
    <b-icon
      icon="microsoft-xbox-controller-battery-empty"
      size="is-large"
      class="wit-offset-bottom--sm"
    />
    {{ $t('Quests_NoQuests') }}
  </div>
</template>

<script>
export default {
    name: 'EmptyState'
}
</script>
