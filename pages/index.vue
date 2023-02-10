<template>
    <div class="p-2">
        {{ currentProfile }}
    </div>
</template>

<script setup>
import { useCurrentUserStore } from '~/store/currentUser'

const currentUserStore = useCurrentUserStore()
const currentProfile = computed(() => currentUserStore.currentUser)
</script>
