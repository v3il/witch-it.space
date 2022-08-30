<template>
  <div class="wis-settings-tabs">
    <div class="wis-settings-tabs__title-wrapper">
      <h1 class="wis-settings-tabs__title">
        {{ $t('Settings') }}
      </h1>
    </div>

    <ul>
      <SettingsTabsItem v-for="tabData in tabsData" :key="tabData.id" :tab-data="tabData" :current-tab="currentTab" />
    </ul>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import SettingsTabsItem from '@/components/settings/tabs/SettingsTabsItem.vue'

export default {
    name: 'SettingsTabs',

    components: { SettingsTabsItem },

    setup () {
        const currentTab = ref('account')

        const tabsData = [
            { id: 'account', title: 'Settings', description: '123', icon: 'account-circle-outline' },
            { id: 'account2', title: 'Settings2', description: '123', icon: 'account-circle-outline' },
            { id: 'account3', title: 'Settings3', description: '123', icon: 'account-circle-outline' },
            { id: 'account4', title: 'Settings4', description: '123', icon: 'account-circle-outline' }
        ]

        return { tabsData, currentTab }
    }
}
</script>

<style scoped lang="scss">
$border-color: rgba(241, 245, 249, 0.12);

.wis-settings-tabs {
    width: 384px;
    border-right: solid 1px $border-color;

    @media (max-width: 1200px) {
        display: none;
    }
}

.wis-settings-tabs__title-wrapper {
    padding: 40px 24px 40px 32px;
    border-bottom: 1px solid $border-color;
}

.wis-settings-tabs__title {
    letter-spacing: -0.025em;
    line-height: 1;
    font-weight: 800;
    font-size: 2rem;
}

.wis-settings-tabs__tab {
    padding: 20px 32px;
    border-bottom: 1px solid $border-color;
}
</style>
