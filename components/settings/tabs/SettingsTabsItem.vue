<template>
  <div role="button" class="wit-flex wis-settings-tab" :class="tabClasses" @click="onSwitch">
    <i class="mdi mdi-24px wit-color--muted wis-settings-tab__icon" :class="iconClass" />

    <div>
      <h2 class="wis-settings-tabs__title">
        {{ $t(tabData.title) }}
      </h2>

      <p class="wit-color--muted wis-settings-tabs__description">
        {{ $t(tabData.description) }}
      </p>
    </div>
  </div>
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
            type: Object
        }
    },

    setup (props, { emit }) {
        const iconClass = computed(() => `mdi-${props.tabData.icon}`)
        const isActive = computed(() => props.currentTab === props.tabData)
        const tabClasses = computed(() => ({ active: isActive.value, danger: props.tabData.isDanger }))
        const onSwitch = () => emit('switch', props.tabData)

        return { iconClass, tabClasses, onSwitch }
    }
}
</script>

<style scoped lang="scss">
$border-color: rgba(241, 245, 249, 0.12);

.wis-settings-tab {
    --title-color: #fff;
    --icon-color: rgb(148, 163, 184);

    height: auto;
    padding: 20px 32px;
    border-bottom: 1px solid $border-color;
    cursor: pointer;

    &:hover,
    &.active {
        background-color: rgba(255, 255, 255, 0.05);
    }

    &.active {
        --title-color: rgb(99, 102, 241);
        --icon-color: rgb(99, 102, 241);
    }

    &.danger {
        --title-color: var(--danger);
        --icon-color: var(--danger);
    }
}

.wis-settings-tabs__title {
    line-height: 1.5rem;
    font-weight: 500;
    margin-bottom: 2px;
    color: var(--title-color);
}

.wis-settings-tab__icon {
    margin-right: 12px;
    color: var(--icon-color);
}

.wis-settings-tabs__description {
    line-height: 21px;
}
</style>
