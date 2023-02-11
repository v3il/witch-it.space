<template>
    <HeaderPanel>
        <div class="container-sm ml-auto mr-auto flex align-items-center flex-wrap">
            <Icon name="mdi:account-group-outline" class="color-dark-pink mr-4" size="64" />

            <div class="flex-grow-1">
                <HeaderTitle :title="$t('Profiles_HeaderTitle')" />

                <HeaderDescription>
                    <div v-html="description" />
                </HeaderDescription>
            </div>
        </div>
    </HeaderPanel>
</template>

<script setup>
import { useProfilesStore } from '~/store/profiles'

const { $t } = useTranslate()
const profilesStore = useProfilesStore()

const description = computed(() => $t('Profiles_Description', [
    profilesStore.profilesCount,
    profilesStore.verifiedProfilesCount
]))
</script>
