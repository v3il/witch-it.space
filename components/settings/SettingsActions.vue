<template>
  <div class="wit-flex wit-flex--justify-end">
    <b-button type="is-primary" class="wis-btn--rounded" @click="$emit('update')">
      {{ $t('Settings_Save') }}
    </b-button>
  </div>
</template>

<script>
export default { name: 'SettingsActions' }
</script>
