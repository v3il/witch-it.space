<template>
  <div class="wis-auth-form-users">
    <div class="wit-offset-right--sm wit-flex__item--no-shrink">
      <img v-for="(avatarUrl, index) in avatarUrls" :key="index" :src="avatarUrl" :alt="index" class="wis-auth-form-users__img">
    </div>

    <span class="wit-color--muted">More than 17k people joined us, it's your turn</span>
  </div>
</template>

<script>
import { buildAvatarUrl } from '@/utils/index.js'

export default {
    name: 'AuthPanelUsers',

    setup () {
        const genAvatarId = () => Math.floor(Math.random() * 11) + 1

        const avatarUrls = [genAvatarId(), genAvatarId(), genAvatarId(), genAvatarId()].map(id => buildAvatarUrl(id))

        return { avatarUrls }
    }
}
</script>

<style scoped lang="scss">
.wis-auth-form-users {
    display: flex;
    align-items: center;
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
