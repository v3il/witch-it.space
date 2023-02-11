<template>
    <img :src="userAvatarUrl">
</template>

<script setup>
const props = defineProps({
    user: {
        required: true,
        type: Object
    }
})

const userAvatarUrl = computed(() => buildAvatarUrl(props.user.avatarId))
</script>
