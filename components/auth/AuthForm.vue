<template>
  <form @submit.prevent="onSubmit">
    <b-field :label="$t('Login_LoginInputTitle')" class="wit-offset-bottom--sm">
      <b-input
        v-model="login"
        type="text"
        :placeholder="$t('Login_LoginInputPlaceholder')"
        custom-class="wit-transition"
        class="wis-input--lg wis-input--transparent"
      />
    </b-field>

    <b-field :label="$t('Login_PasswordInputTitle')">
      <b-input
        v-model="password"
        type="password"
        :placeholder="$t('Login_PasswordInputPlaceholder')"
        custom-class="wit-transition"
        class="wis-input--lg wis-input--transparent"
      />
    </b-field>

    <b-field v-if="!isLogin" :label="$t('Register_RepeatPassword')">
      <b-input
        v-model="confirmPassword"
        type="password"
        :placeholder="$t('Login_PasswordInputPlaceholder')"
        custom-class="wit-transition"
        class="wis-input--lg wis-input--transparent"
      />
    </b-field>

    <b-button type="is-primary" native-type="submit" class="wit-transition wis-btn--rounded wit-block--full-width wis-btn--lg wit-offset-top--md">
      {{ $t('Login_LoginButtonTitle') }}
    </b-button>
  </form>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'

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
