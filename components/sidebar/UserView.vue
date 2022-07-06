<template>
  <div class="wis-user-view">
    <img :src="userAvatarUrl" alt="" class="wis-user-view__avatar">

    <p class="wit-offset-bottom--xxs">
      {{ userName }}
    </p>

    <p class="wit-color--muted wis-user-view__status">
      <span>{{ isVerified ? $t('Verified') : $t('NotVerified') }}</span>,
      <span>{{ isPublic ? $t('Public') : $t('Private') }}</span>
    </p>
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { buildAvatarUrl } from '@/utils/index.js'

export default {
    name: 'UserView',

    setup () {
        const store = useStore()

        const user = computed(() => store.state.user.user)
        const userAvatarUrl = computed(() => buildAvatarUrl(user.value.avatarId))
        const userName = computed(() => user.value.displayName)
        const isVerified = computed(() => store.getters['user/isVerified'])
        const isPublic = computed(() => store.getters['user/isPublic'])

        return {
            userName,
            isVerified,
            isPublic,
            userAvatarUrl
        }
    }
}
</script>

<style scoped lang="scss">
    .wis-user-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--offset-sm);
    }

    .wis-user-view__avatar {
        width: 96px;
        border-radius: 8px;
        margin-bottom: var(--offset-md);
    }

    .wis-user-view__status {
        line-height: 1.5;
        font-weight: 500;
        font-size: 0.8125rem;
        margin-top: 0.125rem;
    }
</style>
