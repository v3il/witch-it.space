<template>
  <div>
    <div class="wis-auth-panel__right-content">
      <h1 class="wis-auth-panel__title">
        {{ title }}
      </h1>

      <p class="wit-font-weight--500 wit-offset-bottom--lg">
        {{ descriptionText }}

        <NuxtLink :to="descriptionLink">
          {{ descriptionPrompt }}
        </NuxtLink>
      </p>

      <AuthForm :mode="mode" class="wit-offset-bottom--md" />
      <AuthPanelSeparator class="wit-offset-bottom--md" />
      <Socials />
    </div>
  </div>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import AuthForm from '@/components/auth/AuthForm.vue'
import Logo from '@/components/sidebar/components/Logo.vue'
import Socials from '@/components/auth/Socials.vue'
import { Routes } from '@/shared/index.js'
import AuthPanelSeparator from '@/components/auth/AuthPanelSeparator.vue'

export default {
    name: 'AuthPanelRight',

    components: {
        Logo,
        AuthForm,
        Socials,
        AuthPanelSeparator
    },

    props: {
        mode: {
            required: true,
            type: String,
            validator: value => ['login', 'register'].includes(value)
        }
    },

    setup (props) {
        const { $t } = useContext()

        const login = ref('')
        const password = ref('')
        const confirmPassword = ref('')

        const isLogin = computed(() => props.mode === 'login')
        const title = computed(() => isLogin.value ? $t('SignIn') : $t('SignUp'))
        const descriptionLink = computed(() => isLogin.value ? Routes.REGISTER : Routes.LOGIN)
        const descriptionPrompt = computed(() => isLogin.value ? $t('SignUp') : $t('SignIn'))
        const descriptionText = computed(() => isLogin.value ? $t('DontHaveAccount') : $t('AlreadyHaveAccount'))

        const onSubmit = () => {}

        return {
            login,
            password,
            confirmPassword,
            isLogin,
            title,
            descriptionLink,
            descriptionPrompt,
            descriptionText,
            onSubmit
        }
    }
}
</script>

<style scoped lang="scss">
.wis-auth-panel__right {
    padding: 4rem;
    flex-basis: 400px;
}

.wis-auth-panel__right-content {
    width: 20rem;
}

.wis-auth-panel__title {
    letter-spacing: -0.025em;
    line-height: 1.25;
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 8px;
}

@media (max-width: 1200px) {
    .wis-auth-panel__right {
        padding: 24px;
    }

    .wis-auth-panel__right-content {
        width: 100%;
    }
}
</style>
