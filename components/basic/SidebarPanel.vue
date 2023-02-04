<template>
    <div class="wis-sidebar-panel" :class="panelClasses">
        <transition name="fade150">
            <div v-if="isVisible" class="wis-sidebar-panel__overlay" @click.self="close" />
        </transition>

        <div class="wis-sidebar-panel__drawer" @click="emit('drawer-clicked')">
            <div v-if="!hideHeader" class="wit-flex wit-flex--align-center wit-flex--justify-between wit-background--primary wis-sidebar-panel__header">
                <h2 class="wit-flex wit-flex--align-center wis-sidebar-panel__title">
                    <i class="mdi mdi-24px wit-offset-right--xsm" :class="iconClasses" />
                    {{ title }}
                </h2>

                <Button type="is-ghost" class="wis-sidebar-panel__close" @click="close">
                    <i class="mdi mdi-close mdi-24px" />
                </Button>
            </div>

            <div class="wit-flex__item--grow">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isVisible: {
        required: false,
        type: Boolean
    },

    from: {
        required: true,
        type: String,
        validator: value => ['left', 'right'].includes(value)
    },

    title: {
        required: false,
        type: String,
        default: ''
    },

    icon: {
        required: false,
        type: String,
        default: ''
    },

    hideHeader: {
        required: false,
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const panelClasses = computed(() => ({ open: props.isVisible, [props.from]: true }))
const iconClasses = computed(() => 'mdi-' + props.icon)
const close = () => emit('close')
</script>

<style scoped lang="scss">
.wis-sidebar-panel {
    height: 100vh;
    position: fixed;
    z-index: 22222;
    top: 0;
    bottom: 0;
}

.wis-sidebar-panel.left {
    --drawer-left: 0;
    --drawer-right: auto;
    --drawer-initial-transform: -100%;
}

.wis-sidebar-panel.right {
    --drawer-left: auto;
    --drawer-right: 0;
    --drawer-initial-transform: 100%;
}

.wis-sidebar-panel__drawer {
    display: flex;
    flex-direction: column;
    z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: var(--drawer-left);
    right: var(--drawer-right);
    max-width: 350px;
    width: calc(100% - 35px);
    overflow-y: auto;
    overscroll-behavior: contain;
    background-color: rgba(30, 41, 59, 1);
    transform: translateX(var(--drawer-initial-transform));
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
    padding: 8px 0 8px 8px;
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
</style>
