<template>
    <HeaderPanel>
        <div class="container-sm ml-auto mr-auto flex align-items-center flex-wrap pl-4 pr-4">
            <Icon name="mdi:account-group-outline" class="color-dark-pink mr-4" size="64" />

            <div class="flex-grow-1">
                <HeaderTitle :title="$t('Profiles_HeaderTitle')" />

                <HeaderDescription>
                    <span class="color-white">{{ profilesCount }}</span>
                    {{ $t('Profiles_Description', [profilesCount]) }}
                </HeaderDescription>
            </div>
        </div>
    </HeaderPanel>
</template>

<script setup>
import { useProfilesStore } from '~/store/profiles'

const { $t } = useTranslate()

const profilesStore = useProfilesStore()
const profilesCount = computed(() => profilesStore.profilesCount)
</script>
