<template>
    <div class="wis-header-panel" :class="panelClasses">
        <div class="wis-header-panel__content">
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    compact: {
        required: false,
        default: false,
        type: Boolean
    }
})

const panelClasses = computed(() => ({ compact: props.compact }))
</script>

<style scoped lang="scss">
.wis-header-panel {
    border-bottom: 1px solid var(--border-color);
    padding: 40px 32px;
    background: var(--dark-gray) url(https://ik.imagekit.io/igo1qzk1oe2z/witch_it_space/background_1__A4--Qhkjq.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1662909009855) no-repeat 50%;
    background-size: 100% 620px;
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

.wis-header-panel__content {
    position: relative;
    z-index: 2;
}

@media (max-width: 769px) {
    .wis-header-panel {
        padding: 24px;
    }
}
</style>
