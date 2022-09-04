<template>
  <div>
    <div class="wis-settings">
      <OnPageSettingsTabs :tabs="tabs" :current-tab="currentTab" @switch="onTabSwitch" />

      <SidebarPanel :is-visible="isTabsOpen" from="left" :title="$t('Settings')" icon="cog" @close="closeTabs">
        <SettingsTabs
          :tabs="tabs"
          :current-tab="currentTab"
          :is-open="isTabsOpen"
          class="wis-settings__tabs-container"
          @switch="onTabSwitch"
        />
      </SidebarPanel>

      <div class="wit-flex__item--grow wis-settings__content">
        <div class="wis-settings__content-wrapper">
          <NotVerifiedProfileMessage v-if="!isUserVerified" class="wit-offset-bottom--lg" />
          <component :is="componentName" @menu-opened="openTabs" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, useStore } from '@nuxtjs/composition-api'
import NotVerifiedProfileMessage from '@/components/settings/NotVerifiedProfileMessage'
import { OnPageSettingsTabs, SettingsTabs } from '@/components/settings/index.js'
import { tabs } from '@/components/settings/tabs/tabs.js'
import { SidebarPanel } from '@/components/basic/index.js'

export default {
    components: {
        NotVerifiedProfileMessage,
        SettingsTabs,
        SidebarPanel,
        OnPageSettingsTabs
    },

    middleware: ['isAuthorized'],

    setup () {
        const store = useStore()

        const isTabsOpen = ref(false)
        const currentTab = ref(tabs[0])

        const componentName = computed(() => currentTab.value.component)
        const isUserVerified = computed(() => store.getters['user/isVerified'])

        const openTabs = () => isTabsOpen.value = true
        const closeTabs = () => isTabsOpen.value = false
        const toggleTabs = () => isTabsOpen.value = !isTabsOpen.value

        const onTabSwitch = (tab) => {
            currentTab.value = tab
            closeTabs()
        }

        return {
            isUserVerified,
            isTabsOpen,
            tabs,
            currentTab,
            componentName,
            onTabSwitch,
            openTabs,
            closeTabs,
            toggleTabs
        }
    }
}
</script>

<style scoped lang="scss">
.wis-settings {
    display: flex;
    max-height: 100vh;
    position: relative;
}

.wis-settings__content {
    padding: 48px;
    height: calc(100vh - var(--header-height));
    overflow-y: auto;
}

.wis-settings__content-wrapper {
    max-width: 768px;
}

.wis-settings__tabs-container {
    background-color: var(--body-bg);
    height: 100%;
    padding: 24px 0;
}

@media (max-width: 1200px) {
    .wis-settings__content {
        margin-left: 0;
        padding: 32px 24px;
    }

    .wis-settings__content-wrapper {
        max-width: none;
    }
}
</style>

<style lang="scss">
.wis-settings__section-title {
    display: flex;
    align-items: center;
    line-height: 1;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 32px;
}

.wis-settings__section-subtitle {
    font-weight: 400;
    font-size: 1.125rem;
    margin-bottom: 32px;
}

.wis-settings__separator {
    margin: 40px 0;
}

.wis-settings__burger-button {
    --button-ghost-color: var(--muted-text-color);
    --button-ghost-hover-color: #fff;
    --button-ghost-hover-decoration: none;

    margin-right: 16px;

    @media (min-width: 1200px) {
        display: none !important;
    }
}
</style>
