<template>
  <form @submit.prevent="onSubmit">
    <b-field :label="$t('Login_LoginInputTitle')" class="wit-offset-bottom--md" custom-class="wit-font-weight--500">
      <b-input
        v-model="login"
        type="text"
        :placeholder="$t('Login_LoginInputPlaceholder')"
        custom-class="wit-transition"
        class="wis-input--lg wis-input--transparent"
      />
    </b-field>

    <b-field :label="$t('Login_PasswordInputTitle')" custom-class="wit-font-weight--500" class="wit-offset-bottom--md">
      <b-input
        v-model="password"
        type="password"
        :placeholder="$t('Login_PasswordInputPlaceholder')"
        custom-class="wit-transition"
        class="wis-input--lg wis-input--transparent"
      />
    </b-field>

    <b-field v-if="!isLogin" :label="$t('Register_RepeatPassword')" custom-class="wit-font-weight--500" class="wit-offset-bottom--md">
      <b-input
        v-model="confirmPassword"
        type="password"
        :placeholder="$t('Login_PasswordInputPlaceholder')"
        custom-class="wit-transition"
        class="wis-input--lg wis-input--transparent"
      />
    </b-field>

    <b-button type="is-primary" native-type="submit" class="wit-transition wis-btn--rounded wit-block--full-width wis-btn--lg">
      {{ buttonText }}
    </b-button>
  </form>
</template>

<script>
import { computed, ref, useContext, useRouter, useStore } from '@nuxtjs/composition-api'
import { Routes, validateLogin, validatePassword } from '@/shared/index.js'

export default {
    name: 'AuthForm',

    props: {
        mode: {
            required: true,
            type: String,
            validator: value => ['login', 'register'].includes(value)
        }
    },

    setup (props) {
        const { $t, $showError } = useContext()
        const store = useStore()
        const router = useRouter()

        const login = ref('')
        const password = ref('')
        const confirmPassword = ref('')

        const isLogin = computed(() => props.mode === 'login')
        const buttonText = computed(() => isLogin.value ? $t('SignIn') : $t('CreateYourAccount'))

        const triggerLogin = () => {
            const loginError = validateLogin(login.value)

            if (loginError) {
                return $showError($t(loginError))
            }

            const passwordError = validatePassword(password.value)

            if (passwordError) {
                return $showError($t(passwordError))
            }

            store.dispatch('user/login', { login: login.value, password: password.value })
                .then(() => router.replace(Routes.MAIN))
                .catch(error => $showError(error.message))
        }

        const triggerRegister = () => {
            const loginError = validateLogin(login.value)

            if (loginError) {
                return $showError($t(loginError))
            }

            const passwordError = validatePassword(password.value)

            if (passwordError) {
                return $showError($t(passwordError))
            }

            if (password.value !== confirmPassword.value) {
                return $showError($t('Error_PasswordsAreNotIdentical'))
            }

            store.dispatch('user/register', { login: login.value, password: password.value })
                .then(() => router.replace(Routes.MAIN))
                .catch(error => $showError(error.message))
        }

        const onSubmit = () => isLogin.value ? triggerLogin() : triggerRegister()

        return {
            login,
            password,
            confirmPassword,
            isLogin,
            buttonText,
            onSubmit
        }
    }
}
</script>
