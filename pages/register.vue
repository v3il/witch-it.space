<template>
  <div class="wit-flex wit-flex--center login-page">
    <div class="login-page__container">
      <div class="login-page__form wit-background--content wit-transition wit-offset-bottom--xxlg">
        <header class="login-page__form-header wit-background--primary wit-position--relative">
          <h1 class="wit-color--white wit-text--center wit-font-weight--600 wit--font-size--sm wit-line-height--sm wit-font-family--secondary">
            {{ $t('welcome_back') }}
          </h1>
          <p class="wit-color--white wit-text--center wit-offset-bottom--md wit-color--white-half">
            {{ $t('sign_in_to_continue') }}
          </p>

          <div class="login-page__image-block wit-position--absolute wit-background--content wit-transition" />
        </header>

        <div class="login-page__form-content">
          <form class="auth__form" @submit.prevent="onSubmit">
            <Label for="login" class="wit-offset-bottom--xs">{{ $t('login') }}</Label>
            <Input id="login" v-model="login" type="text" :placeholder="$t('enter_login')" class="wit-offset-bottom--sm" />

            <Label for="password" class="wit-offset-bottom--xs">{{ $t('password') }}</Label>
            <Input id="password" v-model="password" :placeholder="$t('enter_password')" type="password" class="wit-offset-bottom--md" />

            <div class="wit-flex wit-flex--center">
              <div class="wit-flex wit-flex--center">
                <a href="/api/auth/steam" class="auth__social-link wit-offset-right--xs"><span class="mdi mdi-steam" /></a>
                <a href="/api/auth/discord" class="auth__social-link wit-offset-right--xs"><span class="mdi mdi-discord" /></a>
                <a href="/api/auth/google" class="auth__social-link wit-offset-right--xs"><span class="mdi mdi-google" /></a>
              </div>

              <Button type="submit" class="wit-offset-left--auto">
                {{ $t('login_in') }}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <p class="wit-text--center">
        {{ $t('dont_have_account') }} <Link class="wit-color--primary wit-font-weight--500" to="/login">
          {{ $t('sign_up') }} Login!
        </Link>
      </p>

      <p class="wit-text--center">
        ©{{ $options.year }}. {{ $t('crafted_by') }}
      </p>
    </div>
  </div>
</template>

<script>
import Label from '@/components/base/Label'
import Input from '@/components/base/Input'
import Button from '@/components/base/Button'
import Link from '@/components/base/Link'

export default {
    year: new Date().getFullYear(),

    components: {
        Label,
        Input,
        Button,
        Link
    },

    data: () => ({
        login: '',
        password: ''
    }),

    methods: {
        onSubmit () {

        }
    }
}
</script>

<style scoped lang="scss">
.login-page {
    margin-top: var(--offset-xxlg);

    @media screen and (max-width: 768px) {
        margin-top: var(--offset-sm);
    }
}

.login-page__container {
    max-width: 450px;
    width: 100%;
}

.login-page__form-header {
    padding: var(--offset-md) var(--offset-xlg);
    /* box-shadow: 0 0 13px rgba(236, 236, 241, 0.439216); */
    /*border-radius: var(--offset-xxs) var(--offset-xxs) 0 0;*/
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
    border-bottom: 2px solid var(--success);
}

.login-page__form-content {
    padding: 64px var(--offset-xlg) var(--offset-xlg);
    /* box-shadow: 0 0 13px rgba(236, 236, 241, 0.439216); */
    /*border-radius: 0 0 var(--offset-xxs) var(--offset-xxs);*/
}

.auth__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 39px;
    height: 39px;
    font-size: 20px;
    margin-right: 8px;
    background: #626ed4;
    color: white;
    border-radius: 4px;
}
</style>
