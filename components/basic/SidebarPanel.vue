<template>
  <div class="wis-sidebar-panel" :class="panelClasses">
    <transition name="fade150">
      <div v-if="isVisible" class="wis-sidebar-panel__overlay" @click.self="close" />
    </transition>

    <div class="wis-sidebar-panel__drawer">
      <div class="wit-flex wit-flex--align-center wit-flex--justify-between wit-background--primary wis-sidebar-panel__header">
        <h2 class="wit-flex wit-flex--align-center wis-sidebar-panel__title">
          <i class="mdi mdi-filter mdi-24px wit-offset-right--xsm" />
          {{ $t('Filter') }}
        </h2>

        <b-button type="is-ghost" class="wis-sidebar-panel__close" @click="close">
          <i class="mdi mdi-close mdi-24px" />
        </b-button>
      </div>

      <div class="wis-sidebar-panel__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'SidebarPanel',

    props: {
        isVisible: {
            required: false,
            type: Boolean
        }
    },

    setup (props, { emit }) {
        const panelClasses = computed(() => ({ open: props.isVisible }))
        const close = () => emit('close')

        return { panelClasses, close }
    }
}
</script>

<style scoped lang="scss">
.wis-sidebar-panel {
    height: 100vh;
    position: fixed;
    z-index: 22222;
    top: 0;
    bottom: 0;
}

.wis-sidebar-panel__drawer {
    z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    max-width: 400px;
    width: 100%;
    overflow-y: auto;
    overscroll-behavior: contain;
    background-color: rgba(30, 41, 59, 1);
    transform: translateX(100%);
    transition: transform var(--default-transition);
}

.wis-sidebar-panel__header {
    padding: 0 24px;
    height: 5rem;
}

.wis-sidebar-panel__title {
    font-weight: 600;
    letter-spacing: -0.025em;
    font-size: 1.25rem;
}

.wis-sidebar-panel__close {
    padding: 8px;
    color: white;
    text-decoration: none !important;

    &:hover {
        opacity: 0.8;
    }
}

.wis-sidebar-panel__overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 299;
    opacity: 1;
    background-color: #0009;
    cursor: pointer;
}

.wis-sidebar-panel.open {
    .wis-sidebar-panel__drawer {
        transform: translateX(0);
    }
}

.wis-sidebar-panel__content {
    padding: 24px;
}
</style>
