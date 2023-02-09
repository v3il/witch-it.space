<template>
    <div class="flex justify-content-center align-items-center">
        <Button
            v-for="social in socials"
            :key="social.value"
            class="flex justify-content-center align-items-center social-button"
            @click="onSocialClicked(social)"
        >
            <Icon :name="'mdi:' + social.icon" size="20" />
        </Button>
    </div>
</template>

<script setup>
import { useCurrentUserStore } from '~/store/currentUser'
import { Routes } from '~/shared/Routes'
import { useNotification } from '~/composables/useNotification'

const currentUserStore = useCurrentUserStore()
const { showError } = useNotification()

const socials = [
    { value: 'steam', icon: 'steam', label: 'Steam' },
    { value: 'discord', icon: 'discord', label: 'Discord' },
    { value: 'google', icon: 'google', label: 'Google' }
]

const onSocialClicked = (social) => {
    useWindow('/api/auth/' + social.value, 'AuthWindow')
        .then(() => currentUserStore.fetchCurrentUser())
        .then(() => navigateTo(Routes.MAIN))
        .catch((error) => {
            if (error) {
                showError({
                    description: error.message
                })
            }
        })
}
</script>

<style scoped lang="scss">
.social-button {
    flex: 1;
    border: 1px solid rgb(100 116 139);
    background-color: transparent;
    height: 40px;
    border-radius: 9999px;
    cursor: pointer;
    color: var(--muted-text-color);

    &:not(:last-child) {
        margin-right: 8px;
    }

    &:hover {
        color: var(--muted-text-color);
        background-color: rgba(0, 0, 0, 0.05);
    }
}
</style>
