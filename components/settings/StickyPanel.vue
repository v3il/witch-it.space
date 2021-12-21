<template>
  <div class="wit-flex wit-flex--justify-end wit-settings__sticky-panel">
    <b-field>
      <b-button type="is-primary" class="wit-offset-left--auto wit-block" @click="$emit('update')">
        {{ $t('Settings_Save') }}
      </b-button>
    </b-field>
  </div>
</template>

<script>
export default {
    name: 'StickyPanel'
}
</script>

<style scoped>
.wit-settings__sticky-panel {
    position: sticky;
    top: calc(var(--header-height) - 1px);
    z-index: 2;
    background: var(--body-bg);
    padding: var(--offset-sm) 0;
}
</style>
