<template>
  <div class="wis-auth-panel__left">
    <img
      src="https://ik.imagekit.io/igo1qzk1oe2z/witch_it_space/SticerRE_jYv6JoI6p.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663526734143"
      alt="hey"
      class="wis-auth-panel__logo wit-offset-bottom--md"
    >

    <h2 class="wis-auth-panel__left-title">
      {{ $t('AuthForm_Title') }}
    </h2>

    <p class="wis-auth-panel__left-description wit-offset-bottom--md">
      {{ $t('AuthForm_Description') }}
    </p>

    <AuthPanelUsers class="wis-auth-panel__left-users" />
  </div>
</template>

<script>
import AuthPanelUsers from '@/components/auth/AuthPanelUsers.vue'

export default {
    name: 'AuthPanelLeft',

    components: {
        AuthPanelUsers
    }
}
</script>

<style scoped lang="scss">
.wis-auth-panel__left {
    flex: 1 1 auto;
    border-right: 1px solid rgb(241, 245, 249, 0.12);
    padding: 4rem;
    position: relative;
    background: url(https://ik.imagekit.io/igo1qzk1oe2z/witch_it_space/background_1__A4--Qhkjq.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1662909009855) no-repeat center;
    background-size: 100% 100%;
    flex-basis: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.wis-auth-panel__logo {
    display: block;
    width: 200px;
    border-radius: 8px;
    margin: 0 auto;
}

.wis-auth-panel__left-title {
    color: rgb(241 245 249);
    line-height: 1.15;
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 24px;
    text-align: center;
}

.wis-auth-panel__left-description {
    color: var(--muted-text-color);
    letter-spacing: -0.025em;
    line-height: 1.71;
    font-size: 1rem;
    text-align: center;
}

@media (max-width: 1250px) {
    .wis-auth-panel__left {
        padding: 24px;
        border-right: none;
    }

    .wis-auth-panel__left-title {
        font-size: 32px;
    }
}
</style>
