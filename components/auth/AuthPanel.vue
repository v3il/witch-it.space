<template>
  <div class="wis-auth-panel">
    <div class="wis-auth-panel__left">
      Left
    </div>

    <div class="wis-auth-panel__right">
      <div class="wis-auth-panel__right-content">
        <Logo class="wis-auth-panel__logo" />

        <h1>Sign in</h1>
        <p>
          Don't have an account?
          <NuxtLink to="/register">
            Sign up
          </NuxtLink>
        </p>

        <AuthForm :mode="mode" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import AuthForm from '@/components/auth/AuthForm.vue'
import Logo from '@/components/sidebar/components/Logo.vue'

export default {
    name: 'AuthPanel',

    components: {
        Logo,
        AuthForm
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
}

.wis-auth-panel__left {
    background-color: rgb(30 41 59);
    flex: 1 1 auto;
    border-right: 1px solid rgb(241, 245, 249, 0.12);
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
</style>
