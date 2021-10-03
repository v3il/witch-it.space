<template>
  <div class="wit-flex wit-flex--center page">
    <div class="auth">
      <div class="auth__form-container wit-background--content wit-transition wit-offset-bottom--xxlg">
        <header class="auth__header wit-background--primary wit-position--relative">
          <h1 class="wit-color--white wit-text--center wit-font-weight--600 wit--font-size--sm wit-line-height--sm wit-font-family--secondary wit-offset-bottom--xs">
            {{ $t('welcome_back') }}
          </h1>
          <p class="wit-color--white wit-text--center wit-offset-bottom--md wit-color--white-half">
            {{ $t('sign_in_to_continue') }}
          </p>

          <div class="auth__header-image wit-position--absolute wit-background--content wit-transition" />
        </header>

        <div class="auth__form-container2">
          <form class="auth__form" @submit.prevent="onSubmit">
            <b-field :label="$t('login')" class="wit-offset-bottom--md wit-font-weight--500">
              <b-input v-model="login" type="text" :placeholder="$t('enter_login')" custom-class="wit-transition--border" />
            </b-field>

            <b-field :label="$t('password')" class="wit-offset-bottom--md wit-font-weight--500">
              <b-input v-model="password" type="password" :placeholder="$t('enter_password')" custom-class="wit-transition--border" password-reveal />
            </b-field>

            <div class="wit-flex wit-flex--center wit-flex--justify-between">
              <Socials />

              <b-button type="is-primary" class="wit-transition--background">
                {{ $t('login_in') }}
              </b-button>
            </div>
          </form>
        </div>
      </div>

      <p class="wit-text--center wit-offset-bottom--sm">
        {{ $t('dont_have_account') }}
        <b-button type="is-ghost" tag="nuxt-link" to="/register" class="text-link wit-font-weight--500">
          {{ $t('sign_up') }}
        </b-button>
      </p>

      <p class="wit-text--center">
        ©{{ $options.year }}. {{ $t('crafted_by') }}
      </p>
    </div>
  </div>
</template>

<script>
import Socials from '@/components/auth/Socials'

export default {
    year: new Date().getFullYear(),

    components: {
        Socials
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
.page {
    margin-top: calc(var(--offset-xxlg) * 2);

    @media screen and (max-width: 768px) {
        margin-top: var(--offset-xxlg);
    }
}

.auth {
    max-width: 450px;
    width: 100%;
}

.auth__header {
    padding: var(--offset-md) var(--offset-xlg);
    /* box-shadow: 0 0 13px rgba(236, 236, 241, 0.439216); */
    /*border-radius: var(--offset-xxs) var(--offset-xxs) 0 0;*/
}

.auth__form-container {
    border-radius: var(--offset-xxs);
    overflow: hidden;
}

.auth__header-image {
    border-radius: 50%;
    width: 72px;
    height: 72px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 2px solid var(--success);
}

.auth__form-container2 {
    padding: 64px var(--offset-xlg) var(--offset-xlg);
    /* box-shadow: 0 0 13px rgba(236, 236, 241, 0.439216); */
    /*border-radius: 0 0 var(--offset-xxs) var(--offset-xxs);*/
}
</style>
