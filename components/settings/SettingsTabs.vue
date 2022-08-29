<template>
  <div class="wis-settings-tabs">
    Settings
  </div>
</template>

<script>
export default {
    name: 'SettingsTabs'
}
</script>

<style scoped lang="scss">
.wis-settings-tabs {
    width: 384px;
    border-right: solid 1px rgba(241, 245, 249, 0.12);

    @media (max-width: 1200px) {
        display: none;
    }
}
</style>
