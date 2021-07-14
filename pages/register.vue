<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        {{ $t('MainMenu_Register') }}
      </template>
    </TopNavBar>

    <div class="wit-flex wit-flex--center register-page">
      <div class="register-page__container">
        <div class="register-page__form wit-background--content wit-transition wit-offset-bottom--xxlg">
          <header class="register-page__form-header wit-background--primary wit-position--relative">
            <h1 class="wit-color--white wit-text--center wit-font-weight--600 wit-font-size--sm wit-line-height--sm wit-font-family--secondary wit-offset-bottom--xs">
              {{ $t('Register_FreeRegister') }}
            </h1>
            <p class="wit-text--center wit-offset-bottom--md wit-color--white-half">
              {{ $t('Register_GetFreeAccount') }}
            </p>

            <div class="register-page__image-block wit-position--absolute wit-background--content wit-transition">
              <img class="register-page__image" src="images/hey.png" alt="Hey!">
            </div>
          </header>

          <div class="register-page__form-content">
            <form @submit.prevent="onSubmit">
              <b-field :label="$t('Login_LoginInputTitle')" class="wit-offset-bottom--sm" :message="$t('Register_LoginInputHelp')">
                <b-input v-model="login" type="text" :placeholder="$t('Login_LoginInputPlaceholder')" custom-class="wit-transition" />
              </b-field>

              <b-field :label="$t('Login_PasswordInputTitle')" class="wit-offset-bottom--sm" :message="$t('Register_PasswordInputHelp')">
                <b-input v-model="password" type="password" :placeholder="$t('Login_PasswordInputPlaceholder')" custom-class="wit-transition" />
              </b-field>

              <b-field :label="$t('Register_RepeatPassword')" class="wit-offset-bottom--md">
                <b-input v-model="confirmPassword" type="password" :placeholder="$t('Login_PasswordInputPlaceholder')" custom-class="wit-transition" />
              </b-field>

              <div class="wit-flex wit-flex--center wit-flex--justify-between">
                <Socials @socialClicked="authUsingSocials" />

                <b-button type="is-primary" native-type="submit" class="wit-transition">
                  {{ $t('Register_RegisterButtonTitle') }}
                </b-button>
              </div>
            </form>
          </div>
        </div>

        <p class="wit-text--center wit-offset-bottom--sm">
          {{ $t('Register_AlreadyHaveAccount') }}
          <b-button type="is-ghost" tag="nuxt-link" to="/login" class="text-link wit-font-weight--500">
            {{ $t('Register_SignInLinkTitle') }}
          </b-button>
        </p>

        <p class="wit-text--center">
          ©{{ $options.year }}. {{ $t('CraftedBy') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Socials from '@/components/auth/Socials'
import { User } from '@/store'
import { Routes } from '@/shared'
import { validateLogin, validatePassword } from '@/shared/validators'
import TopNavBar from '@/components/TopNavBar'

export default {
    year: new Date().getFullYear(),

    components: {
        Socials,
        TopNavBar
    },

    data: () => ({
        login: '',
        password: '',
        confirmPassword: ''
    }),

    methods: {
        async onSubmit () {
            const loginError = validateLogin(this.login)

            if (loginError) {
                return this.$showError(this.$t(loginError))
            }

            const passwordError = validatePassword(this.password)

            if (passwordError) {
                return this.$showError(this.$t(passwordError))
            }

            if (this.password !== this.confirmPassword) {
                return this.$showError(this.$t('Error_PasswordsAreNotIdentical'))
            }

            try {
                await this.$store.dispatch(User.F.Actions.REGISTER, {
                    login: this.login,
                    password: this.password
                })

                await this.$router.replace(Routes.MAIN)
            } catch (error) {
                this.$showError(error.message)
            }
        },

        async authUsingSocials (socialName) {
            try {
                await this.$store.dispatch(User.F.Actions.AUTH_USING_SOCIALS, socialName)
                await this.$router.replace(Routes.MAIN)
            } catch (error) {
                if (error) {
                    this.$showError(error.message)
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.register-page {
    margin-top: calc(var(--offset-xxlg) * 2);
}

.register-page__container {
    max-width: 450px;
    width: 100%;
}

.register-page__form-header {
    padding: var(--offset-md) var(--offset-xlg);
}

.register-page__form {
    border-radius: var(--offset-xxs);
    overflow: hidden;
}

.register-page__image-block {
    border-radius: 50%;
    width: 72px;
    height: 72px;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid var(--primary);
}

.register-page__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.register-page__form-content {
    padding: calc(var(--offset-xlg) * 2) var(--offset-xlg) var(--offset-xlg);
}

@media screen and (max-width: 768px) {
    .register-page {
        margin-top: var(--offset-xxlg);
    }

    .register-page__form-header,
    .register-page__form-content {
        padding-left: var(--offset-sm);
        padding-right: var(--offset-sm);
        padding-bottom: var(--offset-md);
    }
}
</style>
