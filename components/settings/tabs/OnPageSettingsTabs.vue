<template>
  <div class="wis-settings-tabs">
    <div class="wis-settings-tabs__title-wrapper">
      <h1 class="wis-settings-tabs__title">
        {{ $t('Settings') }}
      </h1>
    </div>

    <SettingsTabs :tabs="tabs" :current-tab="currentTab" />

    <!--    <SettingsTabsItem-->
    <!--      v-for="tabData in tabs"-->
    <!--      :key="tabData.id"-->
    <!--      :tab-data="tabData"-->
    <!--      :current-tab="currentTab"-->
    <!--      @switch="onTabSwitch"-->
    <!--    />-->
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import SettingsTabsItem from '@/components/settings/tabs/SettingsTabsItem.vue'
import { SettingsTabs } from '@/components/settings/index.js'

export default {
    name: 'OnPageSettingsTabs',

    components: {
        SettingsTabsItem,
        SettingsTabs
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

        // isOpen: {
        //     required: true,
        //     type: Boolean
        // }
    },

    setup (props, { emit }) {
        const onTabSwitch = tab => emit('switch', tab)
        // const panelClasses = computed(() => ({ open: props.isOpen }))

        return { onTabSwitch }
    }
}
</script>

<style scoped lang="scss">
$border-color: rgba(241, 245, 249, 0.12);

.wis-settings-tabs {
    //width: 100%;
    //max-width: 384px;
    //border-right: solid 1px $border-color;
    //max-height: calc(100vh - var(--header-height));
    //overscroll-behavior: contain;
    //overflow-y: auto;
    //position: absolute;
    //top: 0;
    //bottom: 0;
    //z-index: 10;
    //background: #0f172a;

    //@media (max-width: 1200px) {
    //    transform: translateX(-100%);
    //    z-index: -1;
    //
    //    &.open {
    //        z-index: 10;
    //        transform: translateX(0);
    //    }
    //}
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
