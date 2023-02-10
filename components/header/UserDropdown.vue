<template>
    <SplitButton ref="dropdown" :model="nestedItems" class="p-button-text p-button-secondary user-dropdown">
        <Button class="flex align-items-center h-full" @click="onDropdownClick">
            <img class="user-dropdown__image mr-2" :src="userAvatarUrl" alt="Avatar">
            <span>{{ currentUser.displayName }}</span>
        </Button>
    </SplitButton>
</template>

<script setup>
import { useCurrentUserStore } from '~/store/currentUser'
import { buildAvatarUrl } from '@/utils/index.js'
import { Routes } from '~/shared/Routes'
import { useNotification } from '~/composables/useNotification'

const currentUserStore = useCurrentUserStore()
const { $t } = useTranslate()
const { $authService } = useNuxtApp()
const { showError } = useNotification()

const currentUser = computed(() => currentUserStore.currentUser)
const userAvatarUrl = computed(() => buildAvatarUrl(currentUser.value.avatarId))

const dropdown = ref(null)

const onDropdownClick = () => {
    dropdown.value.onDropdownButtonClick()
}

const nestedItems = ref([
    {
        label: $t('Settings'),
        icon: 'pi pi-cog',
        command: () => {
            navigateTo(Routes.SETTINGS)
        }
    },
    {
        label: $t('Logout'),
        icon: 'pi pi-sign-out text-red-400',
        command: async () => {
            const { error } = await $authService.logout()

            if (error.value) {
                return showError({
                    description: error.value.data.message
                })
            }

            currentUserStore.clearUser()
            navigateTo(Routes.LOGIN)
        }
    }
])
</script>

<style scoped lang="scss">
.user-dropdown {
    :deep(.p-splitbutton-menubutton) {
        display: none !important;
    }
}

.user-dropdown__image {
    height: var(--offset-lg);
    width: var(--offset-lg);
    max-height: none;
    border-radius: var(--offset-xxs);
}
</style>
