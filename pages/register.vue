<template>
  <div class="wit-flex wit-flex--center login-page" />
</template>

<script>
export default {
    year: new Date().getFullYear(),

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
