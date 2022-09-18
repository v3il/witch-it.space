<template>
  <div class="wis-auth-form-users">
    <div class="wit-offset-right--xsm wit-flex__item--no-shrink">
      <img v-for="(avatarUrl, index) in avatarUrls" :key="index" :src="avatarUrl" :alt="index" class="wis-auth-form-users__img">
    </div>

    <span class="wit-color--muted wit-line-height--sm">{{ $t('AuthForm_UsersStat', [usersCount]) }}</span>
  </div>
</template>

<script>
import { useStore } from '@nuxtjs/composition-api'
import { buildAvatarUrl } from '@/utils/index.js'

export default {
    name: 'AuthPanelUsers',

    setup () {
        const store = useStore()

        const usersCount = store.state.global.usersCount
        const avatarUrls = store.state.global.randomAvatars.map(id => buildAvatarUrl(id))

        return { usersCount, avatarUrls }
    }
}
</script>

<style scoped lang="scss">
.wis-auth-form-users {
    display: flex;
    align-items: center;
    justify-content: center;
}

.wis-auth-form-users__img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid var(--card-bg-color);

    &:not(:first-child) {
        margin-left: -18px;
    }
}
</style>
