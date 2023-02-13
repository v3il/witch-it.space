<template>
    <Button class="p-button-link p-0 lg:hidden" @click="emit('click')">
        <Icon name="material-symbols:menu" size="28" />
    </Button>
</template>

<script setup>
const emit = defineEmits(['click'])
</script>
