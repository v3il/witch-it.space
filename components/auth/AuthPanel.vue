<template>
  <div class="wis-auth-panel">
    <div class="wis-auth-panel__left">
      <svg
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        class="wis-auth-panel__bg"
      ><g fill="none" stroke="currentColor" stroke-width="100" class="text-gray-700 opacity-25 ng-tns-c293-38"><circle r="234" cx="196" cy="23" class="ng-tns-c293-38" /><circle r="234" cx="790" cy="491" class="ng-tns-c293-38" /></g></svg>
    </div>

    <div class="wis-auth-panel__right">
      <div class="wis-auth-panel__right-content">
        <Logo class="wis-auth-panel__logo wit-offset-bottom--lg" />

        <h1 class="wis-auth-panel__title">
          Sign in
        </h1>

        <p class="wit-font-weight--500 wit-offset-bottom--lg">
          Don't have an account?
          <NuxtLink to="/register">
            Sign up
          </NuxtLink>
        </p>

        <AuthForm :mode="mode" class="wit-offset-bottom--md" />

        <div class="wit-flex wit-flex--align-center wit-block--full-width wit-offset-bottom--md">
          <hr class="wit-block--full-width">
          <div class="wit-color--muted wit-flex__item--no-shrink wit-offset-left--sm wit-offset-right--sm">
            Or continue with
          </div>
          <hr class="wit-block--full-width">
        </div>

        <Socials />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import AuthForm from '@/components/auth/AuthForm.vue'
import Logo from '@/components/sidebar/components/Logo.vue'
import Socials from '@/components/auth/Socials.vue'

export default {
    name: 'AuthPanel',

    components: {
        Logo,
        AuthForm,
        Socials
    },

    props: {
        mode: {
            required: true,
            type: String,
            validator: value => ['login', 'register'].includes(value)
        }
    },

    setup (props) {
        const login = ref('')
        const password = ref('')
        const confirmPassword = ref('')

        const isLogin = computed(() => props.mode === 'login')

        const onSubmit = () => {}

        return {
            login,
            password,
            confirmPassword,
            isLogin,
            onSubmit
        }
    }
}
</script>

<style scoped lang="scss">
.wis-auth-panel {
    max-width: 72rem;
    display: flex;
    background-color: var(--card-bg-color);
    border-radius: 16px;
    width: 100%;
    overflow: hidden;
}

.wis-auth-panel__left {
    background-color: rgb(30 41 59);
    flex: 1 1 auto;
    border-right: 1px solid rgb(241, 245, 249, 0.12);
    padding: 4rem 7rem;
    position: relative;
}

.wis-auth-panel__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.wis-auth-panel__right {
    padding: 4rem;
}

.wis-auth-panel__right-content {
    width: 20rem;
}

.wis-auth-panel__logo {
    height: 72px;
}

.wis-auth-panel__title {
    letter-spacing: -0.025em;
    line-height: 1.25;
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 8px;
}
</style>
