<template>
  <div class="wit-flex wit-flex--center">
    <AuthPanel mode="login" />

    <!--    <div class="wit-flex wit-flex&#45;&#45;center login-page">-->
    <!--      <div class="login-page__container">-->
    <!--        <div class="login-page__form wit-background&#45;&#45;content wit-transition wit-offset-bottom&#45;&#45;xxlg">-->
    <!--          <header class="login-page__form-header wit-background&#45;&#45;primary wit-position&#45;&#45;relative">-->
    <!--            <h1 class="wit-color&#45;&#45;white wit-text&#45;&#45;center wit-font-weight&#45;&#45;600 wit-font-size&#45;&#45;sm wit-line-height&#45;&#45;sm wit-font-family&#45;&#45;secondary wit-offset-bottom&#45;&#45;xs">-->
    <!--              {{ $t('Login_WelcomeBack') }}-->
    <!--            </h1>-->
    <!--            <p class="wit-text&#45;&#45;center wit-offset-bottom&#45;&#45;md wit-color&#45;&#45;white-half">-->
    <!--              {{ $t('Login_SignInToContinue') }}-->
    <!--            </p>-->

    <!--            <div class="login-page__image-block wit-position&#45;&#45;absolute wit-background&#45;&#45;content wit-transition">-->
    <!--              <img class="login-page__image" src="images/hey.webp" alt="Hey!">-->
    <!--            </div>-->
    <!--          </header>-->

    <!--          <div class="login-page__form-content">-->
    <!--            <form @submit.prevent="onSubmit">-->
    <!--              <b-field :label="$t('Login_LoginInputTitle')" class="wit-offset-bottom&#45;&#45;sm">-->
    <!--                <b-input v-model="login" type="text" :placeholder="$t('Login_LoginInputPlaceholder')" custom-class="wit-transition" />-->
    <!--              </b-field>-->

    <!--              <b-field :label="$t('Login_PasswordInputTitle')" class="wit-offset-bottom&#45;&#45;md">-->
    <!--                <b-input v-model="password" type="password" :placeholder="$t('Login_PasswordInputPlaceholder')" custom-class="wit-transition" />-->
    <!--              </b-field>-->

    <!--              <div class="wit-flex wit-flex&#45;&#45;center wit-flex&#45;&#45;justify-between">-->
    <!--                <Socials @socialClicked="onAuthUsingSocials" />-->

    <!--                <b-button type="is-primary" native-type="submit" class="wit-transition">-->
    <!--                  {{ $t('Login_LoginButtonTitle') }}-->
    <!--                </b-button>-->
    <!--              </div>-->
    <!--            </form>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <p class="wit-text&#45;&#45;center wit-offset-bottom&#45;&#45;sm">-->
    <!--          {{ $t('Login_DontHaveAccount') }}-->
    <!--          <b-button type="is-ghost" tag="nuxt-link" to="/register" class="text-link wit-font-weight&#45;&#45;500">-->
    <!--            {{ $t('Login_SignUpLinkTitle') }}-->
    <!--          </b-button>-->
    <!--        </p>-->

    <!--        <p class="wit-text&#45;&#45;center">-->
    <!--          ©{{ $options.year }}. {{ $t('CraftedBy') }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Socials from '@/components/auth/Socials'
import { StoreModules } from '@/store'
import { Routes } from '@/shared'
import { validateLogin, validatePassword } from '@/shared/validators'
import AuthPanel from '@/components/auth/AuthPanel.vue'

export default {
    year: new Date().getFullYear(),

    components: {
        Socials,
        AuthPanel
    },

    middleware: ['returnToApp'],

    data: () => ({
        login: '',
        password: ''
    }),

    methods: {
        ...mapActions(StoreModules.USER, {
            authLocal: 'login',
            authUsingSocials: 'authUsingSocials'
        }),

        onSubmit () {
            const loginError = validateLogin(this.login)

            if (loginError) {
                return this.$showError(this.$t(loginError))
            }

            const passwordError = validatePassword(this.password)

            if (passwordError) {
                return this.$showError(this.$t(passwordError))
            }

            const credentials = { login: this.login, password: this.password }

            this.authLocal(credentials)
                .then((user) => {
                    console.error(user)
                    return this.$router.replace(Routes.MAIN)
                })
                .catch(error => this.$showError(error.message))
        },

        onAuthUsingSocials (socialName) {
            this.authUsingSocials(socialName)
                .then(() => this.$router.replace(Routes.MAIN))
                .catch(error => error && this.$showError(error.message))
        }
    }
}
</script>

<style scoped lang="scss">
.login-page {
    margin-top: calc(var(--offset-xxlg) * 2);
}

.login-page__container {
    max-width: 450px;
    width: 100%;
}

.login-page__form-header {
    padding: var(--offset-md) var(--offset-xlg);
}

.login-page__form {
    border-radius: var(--offset-xxs);
    overflow: hidden;
}

.login-page__image-block {
    border-radius: var(--offset-xs);
    width: 72px;
    height: 72px;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid var(--primary);
    top: 82px;
}

.login-page__image {
    width: 100%;
    height: 100%;
    border-radius: inherit;
}

.login-page__form-content {
    padding: calc(var(--offset-xlg) * 2) var(--offset-xlg) var(--offset-xlg);
}

@media screen and (max-width: 768px) {
    .login-page {
        margin-top: var(--offset-xxlg);
    }

    .login-page__form-header,
    .login-page__form-content {
        padding-left: var(--offset-sm);
        padding-right: var(--offset-sm);
        padding-bottom: var(--offset-md);
    }
}
</style>
