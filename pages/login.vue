<template>
    <div class="flex justify-content-center align-items-center p-6 min-h-full">
        <AuthPanel mode="login" />
    </div>
</template>

<script>
// import { mapActions } from 'vuex'
// import Socials from '@/components/auth/Socials'
// import { StoreModules } from '@/store'
// import { Routes } from '@/shared'
// import { validateLogin, validatePassword } from '@/shared/validators'
// import AuthPanel from '@/components/auth/AuthPanel.vue'

export default {
    // year: new Date().getFullYear(),
    //
    // components: {
    //     Socials,
    //     AuthPanel
    // },
    //
    // middleware: ['returnToApp'],

    // data: () => ({
    //     login: '',
    //     password: ''
    // }),
    //
    // methods: {
    //     ...mapActions(StoreModules.USER, {
    //         authLocal: 'login',
    //         authUsingSocials: 'authUsingSocials'
    //     }),
    //
    //     onSubmit () {
    //         const loginError = validateLogin(this.login)
    //
    //         if (loginError) {
    //             return this.$showError(this.$t(loginError))
    //         }
    //
    //         const passwordError = validatePassword(this.password)
    //
    //         if (passwordError) {
    //             return this.$showError(this.$t(passwordError))
    //         }
    //
    //         const credentials = { login: this.login, password: this.password }
    //
    //         this.authLocal(credentials)
    //             .then((user) => {
    //                 console.error(user)
    //                 return this.$router.replace(Routes.MAIN)
    //             })
    //             .catch(error => this.$showError(error.message))
    //     },
    //
    //     onAuthUsingSocials (socialName) {
    //         this.authUsingSocials(socialName)
    //             .then(() => this.$router.replace(Routes.MAIN))
    //             .catch(error => error && this.$showError(error.message))
    //     }
    // }
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
