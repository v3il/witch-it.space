<template>
  <div class="wit-flex wit-flex--center page">
    <!--    Auth-->
    <!--    <a href="/api/auth/discord">Discord</a> |-->
    <!--    <a href="/api/auth/google">Google</a> |-->
    <!--    <a href="/api/auth/steam">Steam</a> |-->

    <!--    <div class="wit-flex">-->
    <!--      <p>1</p>-->
    <!--      <p>2</p>-->
    <!--    </div>-->

    <div class="auth">
      <div class="auth__form-container wit-background--white wit-offset-bottom--xxlg">
        <header class="auth__header wit-background--primary wit-position--relative">
          <h1 class="wit-color--white wit-text--center wit-font-weight--600 wit--font-size--sm wit-line-height--sm wit-font-family--sarabun">
            Welcome Back!
          </h1>
          <p class="wit-color--white wit-text--center wit-offset-bottom--md wit-color--white-half">
            Sign in to continue to Veltrix
          </p>

          <div class="auth__header-image wit-position--absolute wit-background--white" />
        </header>

        <div class="auth__form-container2">
          <form class="auth__form" @submit.prevent="onSubmit">
            <Label for="login" class="wit-offset-bottom--xs">Username</Label>
            <Input id="login" v-model="login" type="text" placeholder="Enter Username" class="wit-offset-bottom--sm" />

            <Label for="password" class="wit-offset-bottom--xs">Password</Label>
            <Input id="password" v-model="password" placeholder="Enter Password" type="password" class="wit-offset-bottom--sm" />

            <div class="wit-flex wit-flex--center">
              <div>
                <a href="/api/auth/steam"><span class="mdi mdi-steam wit-color--danger" /></a>
                <a href="/api/auth/discord"><span class="mdi mdi-discord wit-color--danger" /></a>
                <a href="/api/auth/google"><span class="mdi mdi-google wit-color--danger" /></a>
              </div>

              <Button type="submit" class="wit-offset-left--auto">
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>

      <p class="wit-text--center">
        Don't have an account? <Link class="wit-color--primary wit-font-weight--500" to="/">
          Signup Now
        </Link>
      </p>

      <p class="wit-text--center">
        ©{{ $options.year }}. Crafted with <span class="mdi mdi-heart wit-color--danger" /> by !D.
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

<style>
.page {
    min-height: 100vh;
}

.auth {
    max-width: 450px;
    width: 100%;
}

.auth__header {
    padding: var(--offset-md) var(--offset-xlg);
    box-shadow: 0 0 13px rgba(236, 236, 241, 0.439216);
    border-radius: var(--offset-xxs) var(--offset-xxs) 0 0;
}

.auth__header-image {
    border-radius: 50%;
    width: 72px;
    height: 72px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 2px solid var(--bs-success);
}

.auth__form-container2 {
    padding: 64px var(--offset-xlg) var(--offset-xlg);
    box-shadow: 0 0 13px rgba(236, 236, 241, 0.439216);
    border-radius: 0 0 var(--offset-xxs) var(--offset-xxs);
}
</style>
