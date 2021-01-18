<template>
  <div />
</template>

<script>
export default {
    name: 'Result',
    layout: 'blank',

    mounted () {
        const errorTextCode = this.$route.query.error
        this.setAuthResult(errorTextCode)
    },

    methods: {
        setAuthResult (errorTextCode) {
            const isSuccess = errorTextCode === undefined
            const error = errorTextCode ? this.$t(errorTextCode) : null

            window.opener.$setAuthResult({ isSuccess, error })
        }
    }
}
</script>
