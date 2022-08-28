<template>
  <div class="wis-header-panel wit-position--relative" :class="panelClasses">
    <svg
      viewBox="0 0 960 540"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      class="wis-header-panel__background"
    ><g fill="none" stroke="currentColor" stroke-width="100" class="text-gray-700 opacity-25"><circle r="234" cx="196" cy="23" /><circle r="234" cx="790" cy="491" /></g></svg>

    <div class="wis-header-panel__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'HeaderPanel',

    props: {
        compact: {
            required: false,
            default: false,
            type: Boolean
        }
    },

    setup (props) {
        const panelClasses = computed(() => ({ compact: props.compact }))

        return { panelClasses }
    }
}
</script>

<style scoped lang="scss">
.wis-header-panel {
    background-color: var(--dark-gray);
    border-bottom: 1px solid var(--border-color);
    padding: 40px 32px;
    overflow: hidden;
}

.wis-header-panel.compact {
    position: sticky;
    top: 0;
    z-index: 22;
    padding: 8px 24px;

    .wis-user-card__avatar {
        width: 48px;
        height: 48px;
    }
}

.wis-header-panel__background {
    position: absolute;
    top: -40px;
    left: 0;
    bottom: 0;
    right: 0;
    height: 360px;
}

.wis-header-panel__content {
    position: relative;
    z-index: 2;
}

@media (max-width: 769px) {
    .wis-header-panel__background {
        top: 0;
        height: 100%;
    }

    .wis-header-panel {
        padding: 24px;
    }
}
</style>
