<template>
  <div class="wis-sidebar-panel" :class="panelClasses">
    <b-button v-if="isVisible" type="is-danger" class="wis-sidebar-panel__open" @click="close">
      <i class="mdi mdi-20px mdi-close" />
    </b-button>

    <slot name="actions" />

    <div class="wis-sidebar-panel__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'SidebarPanel',

    props: {
        isVisible: {
            required: false,
            type: Boolean
        }
    },

    computed: {
        panelClasses () {
            return { open: this.isVisible }
        }
    },

    methods: {
        close () {
            this.$emit('close')
        }
    }
}
</script>

<style scoped lang="scss">
.wis-sidebar-panel {
    border-radius: var(--offset-sm);
    width: 300px;
    background-color: var(--card-bg-color);
    padding: var(--offset-md) var(--offset-xs) var(--offset-md) var(--offset-md);
    max-height: calc(100vh - var(--navbar-height) - var(--offset-sm) * 2);
    position: sticky;
    top: var(--offset-sm);
}

.wis-sidebar-panel__open {
    display: none;
}

.wis-sidebar-panel__content {
    position: relative;
    overscroll-behavior: contain;
    height: 100%;
    overflow-y: auto;
    padding-right: var(--offset-sm);
}

@media (max-width: 1200px) {
    .wis-sidebar-panel {
        //top: var(--offset-sm);
        //bottom: var(--offset-sm);
        //right: 0;
        height: calc(100vh - var(--offset-lg));
        max-height: calc(100vh - var(--offset-lg));
        padding: var(--offset-sm) var(--offset-xs) var(--offset-sm) var(--offset-sm);
        z-index: calc(var(--navbar-z) + 1);
        margin: 0;
        transition: transform var(--default-transition);
        transform: translateX(calc(100% + 16px));
        position: fixed;
        top: 0;
        bottom: 0;
        //left: 0;
        right: 0;
    }

    .wis-sidebar-panel__open {
        display: flex;
        background-color: var(--content-bg) !important;
        padding: var(--offset-xs);
        position: absolute;
        bottom: 16px;
        right: 310px;
        border-radius: 50%;
        height: 36px;
        width: 36px;
    }

    .wis-sidebar-panel.open {
        transform: translateX(0);
        background-color: rgba(0, 0, 0, 0.7);
        width: auto;
        height: 100vh;
        max-height: 100vh;
        padding: 0;
        left: 0;

        .wis-sidebar-panel__open {
            background-color: var(--danger) !important;
        }
    }

    .wis-sidebar-panel__content {
        background-color: var(--content-bg);
        width: 300px;
        padding: var(--offset-sm);
        margin-left: auto;
    }
}
</style>
