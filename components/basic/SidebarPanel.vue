<template>
  <div class="wis-sidebar-panel" :class="panelClasses">
    <transition name="fade150">
      <div v-if="isVisible" class="wis-sidebar-panel__overlay" @click.self="close" />
    </transition>

    <!--    <transition name="slide">-->
    <div class="aaa">
      {{ isVisible }}

      <div class="wit-flex wit-flex--align-center wit-flex--justify-between wit-background--primary">
        <h2>Filter</h2>
        <i class="mdi mdi-close mdi-24px" @clikc="close" />
      </div>

      <b-button v-if="isVisible" type="is-danger" class="wis-sidebar-panel__open" @click="close">
        <i class="mdi mdi-20px mdi-close" />
      </b-button>

      <slot name="actions" />

      <div class="wis-sidebar-panel__content">
        <slot />
        <slot />
      </div>
    </div>
    <!--    </transition>-->
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

    // mounted () {
    //     setTimeout(() => {
    //         // eslint-disable-next-line vue/no-mutating-props
    //         this.isVisible = true
    //     }, 2000)
    // },

    methods: {
        close () {
            this.$emit('close')
        }
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
    //background-color: var(--card-bg-color);
    //padding: var(--offset-md) var(--offset-xs) var(--offset-md) var(--offset-md);
    //max-height: calc(100vh - var(--navbar-height) - var(--offset-sm) * 2);
    //position: sticky;
    //top: var(--offset-sm);
}

.aaa {
    z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 400px;
    overflow-y: auto;
    overscroll-behavior: contain;
    background-color: rgba(30, 41, 59, 1);
    transform: translateX(100%);
    transition: transform var(--default-transition);
    //&::-webkit-scrollbar {
    //    width: 8px;
    //    height: 8px;
    //    background-color: #0000;
    //}
    //
    //&::-webkit-scrollbar-thumb {
    //    border: 2px solid transparent;
    //    border-radius: 20px;
    //    box-shadow: inset 0 0 0 20px #0000003d;
    //}
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
}

.wis-sidebar-panel.open {
    .aaa {
        transform: translateX(0);
    }
}

.wis-sidebar-panel__open {
    display: none;
}

.wis-sidebar-panel__content {
    position: relative;
    overscroll-behavior: contain;
    height: 100%;
    //overflow-y: auto;
    padding-right: var(--offset-sm);
}

@media (max-width: 600px) {
    .aaa {
        width: 100%;
    }
}

//@media (max-width: 1200px) {
//    .wis-sidebar-panel {
//        //top: var(--offset-sm);
//        //bottom: var(--offset-sm);
//        //right: 0;
//        height: calc(100vh - var(--offset-lg));
//        max-height: calc(100vh - var(--offset-lg));
//        padding: var(--offset-sm) var(--offset-xs) var(--offset-sm) var(--offset-sm);
//        z-index: calc(var(--navbar-z) + 1);
//        margin: 0;
//        transition: transform var(--default-transition);
//        transform: translateX(calc(100% + 16px));
//        position: fixed;
//        top: 0;
//        bottom: 0;
//        //left: 0;
//        right: 0;
//    }
//
//    .wis-sidebar-panel__open {
//        display: flex;
//        background-color: var(--content-bg) !important;
//        padding: var(--offset-xs);
//        position: absolute;
//        bottom: 16px;
//        right: 310px;
//        border-radius: 50%;
//        height: 36px;
//        width: 36px;
//    }
//
//    .wis-sidebar-panel.open {
//        transform: translateX(0);
//        background-color: rgba(0, 0, 0, 0.7);
//        width: auto;
//        height: 100vh;
//        max-height: 100vh;
//        padding: 0;
//        left: 0;
//
//        .wis-sidebar-panel__open {
//            background-color: var(--danger) !important;
//        }
//    }
//
//    .wis-sidebar-panel__content {
//        background-color: var(--content-bg);
//        width: 300px;
//        padding: var(--offset-sm);
//        margin-left: auto;
//    }
//}
</style>
