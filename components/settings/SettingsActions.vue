<template>
    <div class="flex justify-content-end">
        <Button class="wis-btn--rounded" @click="emit('update')">
            {{ $t('Settings_Save') }}
        </Button>
    </div>
</template>

<script setup>
const emit = defineEmits(['update'])

const { $t } = useTranslate()
</script>
