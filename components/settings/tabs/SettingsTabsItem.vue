<template>
  <li>
    <div role="button" class="wit-flex wis-settings-tab" :class="tabClasses">
      <i class="mdi mdi-24px wit-color--muted wis-settings-tab__icon" :class="iconClass" />

      <div>
        <h2 class="wis-settings-tabs__title">
          Account
        </h2>

        <p class="wit-color--muted wis-settings-tabs__description">
          Manage your public profile and private information
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'SettingsTabsItem',

    props: {
        tabData: {
            required: true,
            type: Object
        },

        currentTab: {
            required: true,
            type: String
        }
    },

    setup (props) {
        const iconClass = computed(() => `mdi-${props.tabData.icon}`)
        const isActive = computed(() => props.currentTab === props.tabData.id)
        const tabClasses = computed(() => ({ active: isActive.value }))

        return { iconClass, tabClasses }
    }
}
</script>

<style scoped lang="scss">
$border-color: rgba(241, 245, 249, 0.12);

.wis-settings-tab {
    height: auto;
    padding: 20px 32px;
    border-bottom: 1px solid $border-color;
    cursor: pointer;

    &:hover,
    &.active {
        background-color: rgba(255, 255, 255, 0.05);
    }
}

.wis-settings-tabs__title {
    line-height: 1.5rem;
    font-weight: 500;
    margin-bottom: 2px;
}

.wis-settings-tab__icon {
    margin-right: 12px;
}

.wis-settings-tabs__description {
    line-height: 21px;
}
</style>
