<template>
    <div class="flex align-items-center w-full">
        <hr class="w-full separator-hr">

        <span class="color-muted flex-shrink-0 ml-3 mr-3">
            {{ $t('OrContinueWith') }}
        </span>

        <hr class="w-full separator-hr">
    </div>
</template>

<script setup>
const { $t } = useTranslate()
</script>

<style scoped>
.separator-hr {
    height: 1px;
    background-color: rgba(241, 245, 249, 0.12);
    border: none;
}
</style>
