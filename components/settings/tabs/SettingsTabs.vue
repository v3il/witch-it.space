<template>
  <div>
    <SettingsTabsItem
      v-for="tabData in tabs"
      :key="tabData.id"
      :tab-data="tabData"
      :current-tab="currentTab"
      @switch="onTabSwitch"
    />
  </div>
</template>

<script>
import SettingsTabsItem from '@/components/settings/tabs/SettingsTabsItem.vue'

export default {
    name: 'SettingsTabs',

    components: {
        SettingsTabsItem
    },

    props: {
        tabs: {
            required: true,
            type: Array
        },

        currentTab: {
            required: true,
            type: Object
        }
    },

    setup (props, { emit }) {
        const onTabSwitch = tab => emit('switch', tab)

        return { onTabSwitch }
    }
}
</script>

<style scoped lang="scss">
$border-color: rgba(241, 245, 249, 0.12);

.wis-settings-tabs__tab {
    padding: 20px 32px;
    border-bottom: 1px solid $border-color;
}
</style>
