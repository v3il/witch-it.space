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
      {{ descriptionText }}
    </b-button>
  </form>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'

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
        const { $t } = useContext()

        const login = ref('')
        const password = ref('')
        const confirmPassword = ref('')

        const isLogin = computed(() => props.mode === 'login')
        const descriptionText = computed(() => isLogin.value ? $t('SignIn') : $t('CreateYourAccount'))

        const onSubmit = () => {}

        return {
            login,
            password,
            confirmPassword,
            isLogin,
            descriptionText,
            onSubmit
        }
    }
}
</script>
