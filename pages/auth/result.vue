<template>
  <div />
</template>

<script>
import { config } from '@/shared'

export default {
    name: 'Result',
    layout: 'blank',

    mounted () {
        const errorTextCode = this.$route.query.error
        this.setAuthResult(errorTextCode)
    },

    methods: {
        setAuthResult (errorTextCode) {
            const error = errorTextCode ? this.$t(errorTextCode) : null

            window.opener.postMessage({
                authResult: { error }
            }, config.SERVER_ORIGIN)
        }
    }
}
</script>
