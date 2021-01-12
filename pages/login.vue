<template>
  <div class="wit-flex wit-flex--center login-page">
    <div class="login-page__container">
      <div class="login-page__form wit-background--content wit-transition wit-offset-bottom--xxlg">
        <header class="login-page__form-header wit-background--primary wit-position--relative">
          <h1 class="wit-color--white wit-text--center wit-font-weight--600 wit--font-size--sm wit-line-height--sm wit-font-family--secondary wit-offset-bottom--xs">
            {{ $t('Login_WelcomeBack') }}
          </h1>
          <p class="wit-text--center wit-offset-bottom--md wit-color--white-half">
            {{ $t('Login_SignInToContinue') }}
          </p>

          <div class="login-page__image-block wit-position--absolute wit-background--content wit-transition">
            <img class="login-page__image" src="images/hey.png" alt="Hey!">
          </div>
        </header>

        <div class="login-page__form-content">
          <form @submit.prevent="onSubmit">
            <b-field :label="$t('Login_LoginInputTitle')" class="wit-offset-bottom--sm">
              <b-input v-model="login" type="text" :placeholder="$t('Login_LoginInputPlaceholder')" custom-class="wit-transition" />
            </b-field>

            <b-field :label="$t('Login_PasswordInputTitle')" class="wit-offset-bottom--md">
              <b-input v-model="password" type="password" :placeholder="$t('Login_PasswordInputPlaceholder')" custom-class="wit-transition" />
            </b-field>

            <div class="wit-flex wit-flex--center wit-flex--justify-between">
              <Socials @socialClicked="authUsingSocials" />

              <b-button type="is-primary" native-type="submit" class="wit-transition">
                {{ $t('Login_LoginButtonTitle') }}
              </b-button>
            </div>
          </form>
        </div>
      </div>

      <p class="wit-text--center wit-offset-bottom--sm">
        {{ $t('Login_DontHaveAccount') }}
        <b-button type="is-ghost" tag="nuxt-link" to="/register" class="text-link wit-font-weight--500">
          {{ $t('Login_SignUpLinkTitle') }}
        </b-button>
      </p>

      <p class="wit-text--center">
        ©{{ $options.year }}. {{ $t('CraftedBy') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Socials from '@/components/auth/Socials'
import { Root, User } from '@/store'
import { Routes } from '@/shared'

export default {
    year: new Date().getFullYear(),

    components: {
        Socials
    },

    data: () => ({
        login: '',
        password: ''
    }),

    mounted () {
        // const error = this.$route.query.error
        //
        // if (error) {
        //     this.setErrors([this.$t(error)])
        // }
    },

    methods: {
        // ...mapMutations([
        //     Root.Mutations.SET_ERRORS
        // ]),

        onSubmit () {
            // if (this.login.length < 4) {
            //     return this.setErrors([this.$t('Error_LoginIsTooShort')])
            // }
            //
            // if (this.password.length < 6) {
            //     return this.setErrors([this.$t('Error_InvalidPassword')])
            // }

            this.$store.dispatch(User.F.Actions.LOGIN, {
                login: this.login,
                password: this.password
            }).then(() => this.$router.replace(Routes.MAIN))
        },

        authUsingSocials (socialName) {
            try {
                this.$store.dispatch(User.F.Actions.AUTH, socialName)
                this.$router.replace(Routes.MAIN)
            } catch (error) {
                if (error) {
                    this.$showError({ message: error.message })
                }
            }
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
    border-radius: 50%;
    width: 72px;
    height: 72px;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid var(--primary);
}

.login-page__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
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
