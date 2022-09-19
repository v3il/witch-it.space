<template>
  <div class="wis-auth-form-users">
    <div class="wit-offset-right--xsm wit-flex__item--no-shrink">
      <NuxtLink v-for="userData in randomUsers" :key="userData.id" v-tooltip="userData.name" :to="userData.marketUrl" class="wis-auth-form-users__link">
        <img :src="userData.avatarUrl" :alt="userData.name" class="wis-auth-form-users__img">
      </NuxtLink>
    </div>

    <span class="wit-color--muted wit-line-height--sm">{{ usersCountText }}</span>
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { buildAvatarUrl, buildUserMarketUrl } from '@/utils/index.js'

export default {
    name: 'AuthPanelUsers',

    setup () {
        const { $t } = useStore()
        const store = useStore()

        const usersCount = store.state.global.usersCount

        const randomUsers = store.state.global.randomUsers.map(user => ({
            id: user.id,
            avatarUrl: buildAvatarUrl(user.avatarId),
            marketUrl: buildUserMarketUrl(user.id),
            name: user.displayName
        }))

        const usersCountText = computed(() => {
            return randomUsers.length === usersCount
                ? $t('AuthForm_UsersStat', [usersCount])
                : $t('AuthForm_UsersStat2', [usersCount - randomUsers.length])
        })

        return { randomUsers, usersCountText }
    }
}
</script>

<style scoped lang="scss">
.wis-auth-form-users {
    display: flex;
    align-items: center;
    justify-content: center;
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
