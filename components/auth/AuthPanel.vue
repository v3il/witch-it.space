<template>
    <div class="flex justify-content-center align-items-center p-6 flex-1">
        <div class="wis-auth-panel">
            <AuthPanelLeft />
            <AuthPanelRight :mode="mode" class="flex flex-column justify-content-center wis-auth-panel__right" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    mode: {
        required: true,
        type: String,
        validator: value => ['login', 'register'].includes(value)
    }
})
</script>

<style scoped lang="scss">
.wis-auth-panel {
    max-width: 66rem;
    display: flex;
    flex-wrap: wrap;
    background-color: var(--card-bg-color);
    border-radius: 16px;
    width: 100%;
    overflow: hidden;

    @media (max-width: 1250px) {
        max-width: 400px;
    }
}
</style>
