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
      <div class="auth__form-container">
        <header class="auth__header">
          <h1>Welcome Back!</h1>
          <h3>Sign in to continue to Veltrix</h3>
        </header>

        <div class="auth__form-container">
          <form action="" class="auth__form" @submit.prevent="">
            <Label for="">Username</Label>
            <Input type="text" />

            <Label for="">Password</Label>
            <Input type="text" />

            <Button>Log In</Button>
          </form>
        </div>
      </div>

      <p>Don't have an account? Signup now</p>
      <p>© 2020 Veltrix- Crafted with ♥ by Themesbrand.</p>
    </div>
  </div>
</template>

<script>
import Label from '@/components/base/Label'
import Input from '@/components/base/Input'
import Button from '@/components/base/Button'

export default {
    components: {
        Label,
        Input,
        Button
    }
}
</script>

<style>
.page {
    min-height: 100vh;
}

.auth {
    max-width: 450px;
}
</style>
