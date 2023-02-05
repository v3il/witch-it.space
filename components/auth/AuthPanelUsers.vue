<template>
    <div class="wis-auth-form-users">
        <div class="mr-2 flex-shrink-0 sm:mb-2">
            <NuxtLink v-for="userData in randomUsers" :key="userData.id" v-tooltip.bottom="userData.name" :to="userData.marketUrl" class="wis-auth-form-users__link">
                <img :src="userData.avatarUrl" :alt="userData.name" class="wis-auth-form-users__img">
            </NuxtLink>
        </div>

        <span class="color-muted wit-line-height--sm">{{ usersCountText }}</span>
    </div>
</template>

<script setup>
import { useProfilesStore } from '~/store/profiles'

const { $t } = useTranslate()
const profilesStore = useProfilesStore()
const randomUsers = profilesStore.getRandomProfiles(4).map(user => ({
    id: user.id,
    avatarUrl: buildAvatarUrl(user.avatarId),
    marketUrl: buildUserMarketUrl(user.id),
    name: user.displayName
}))

const usersCountText = computed(() => {
    const usersCount = profilesStore.profilesCount

    return randomUsers.length === usersCount
        ? $t('AuthForm_UsersStat', [usersCount])
        : $t('AuthForm_UsersStat2', [usersCount - randomUsers.length])
})
</script>

<style scoped lang="scss">
.wis-auth-form-users {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.wis-auth-form-users__link {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid var(--card-bg-color);

    &:not(:first-child) {
        margin-left: -18px;
    }
}

.wis-auth-form-users__img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
}
</style>
