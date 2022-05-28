<template>
  <div class="wit-color--muted wit-flex wit-flex--column wit-flex--align-center">
    <b-icon icon="loading" size="is-large" class="wit-animation--spin wit-offset-bottom--sm" custom-class="fa-spin" />
    {{ $t('Quests_Loading') }}
  </div>
</template>

<script>
export default {
    name: 'Loader'
}
</script>
