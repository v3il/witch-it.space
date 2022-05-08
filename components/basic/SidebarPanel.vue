<template>
  <div class="wis-sidebar-panel" :class="panelClasses">
    <b-button v-if="isVisible" type="is-primary" class="wis-sidebar-panel__open" @click="close">
      <i class="mdi mdi-20px mdi-close" />
    </b-button>

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
            required: true,
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
    border-radius: var(--offset-xxs);
    width: 300px;
    background-color: var(--content-bg);
    //height: auto;
    padding: var(--offset-sm);
    max-height: calc(100vh - var(--navbar-height) - var(--offset-sm) * 2);
    margin-left: var(--offset-sm);
    position: sticky;
    top: var(--offset-sm);
}

.wis-sidebar-panel__open {
    background-color: var(--content-bg) !important;
    border: var(--default-border) !important;
    border-right: transparent;
    color: var(--body-color);
    padding: var(--offset-xs);
    position: absolute;
    top: 20px;
    left: -38px;
    border-radius: var(--offset-xxs) 0 0 var(--offset-xxs);
    //box-shadow: -2px 0 11px 3px rgb(0 0 0 / 40%) !important;
}

.wis-sidebar-panel__content {
    overscroll-behavior: contain;
    height: 100%;
    overflow-y: auto;
}

@media (max-width: 1100px) {
    .wis-sidebar-panel {
        top: var(--offset-sm);
        bottom: var(--offset-sm);
        right: 0;
        height: calc(100vh - var(--offset-lg));
        max-height: calc(100vh - var(--offset-lg));
        padding: var(--offset-sm) var(--offset-xs) var(--offset-sm) var(--offset-sm);
        //
        position: fixed;
        //top: 76px;
        //right: var(--offset-sm);
        z-index: calc(var(--navbar-z) + 1);
        margin: 0;
        transition: transform var(--default-transition);
        transform: translateX(calc(100% + 16px));
    }

    .wis-sidebar-panel.open {
        transform: translateX(0);
        box-shadow: -6px 0 11px 3px rgb(0 0 0 / 70%);

        //&::before {
        //    content: "";
        //    display: block;
        //    position: fixed;
        //    top: 0;
        //    bottom: 0;
        //    left: 0;
        //    right: 0;
        //    background-color: rgba(0, 0, 0, 0.5);
        //}

        .wis-sidebar-panel__open {
            background-color: var(--primary) !important;
        }
    }

    .wis-sidebar-panel__content {
        background-color: var(--content-bg);
        border-radius: var(--offset-xxs);
        height: 100%;
        padding-right: var(--offset-xs);
    }
}
</style>
