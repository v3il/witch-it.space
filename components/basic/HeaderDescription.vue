<template>
    <p class="wis-header__description color-muted">
        <Icon v-if="iconName" :name="iconName" class="mr-2" size="20" />
        <span class="wit-text--overflow"><slot /></span>
    </p>
</template>

<script setup>
defineProps({
    iconName: {
        required: false,
        default: null,
        type: String
    }
})
</script>

<style scoped lang="scss">
.wis-header__description {
    display: flex;
    align-items: center;
    line-height: 24px;
}
</style>
