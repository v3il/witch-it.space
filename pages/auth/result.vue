<template>
  <div />
</template>

<script>
export default {
    name: 'Result',
    layout: 'blank',

    mounted () {
        const errorTextCode = this.$route.query.error
        const userJSON = this.$route.query.user

        this.setAuthResult(errorTextCode, userJSON)
    },

    methods: {
        setAuthResult (errorTextCode, userJSON) {
            const isSuccess = errorTextCode === undefined
            const error = errorTextCode ? this.$t(errorTextCode) : null
            const user = userJSON ? JSON.parse(userJSON) : null

            window.opener.$setAuthResult({ isSuccess, error, user })
        }
    }
}
</script>
