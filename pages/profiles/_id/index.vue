<template>
  <div />
</template>

<script>
export default {
    name: 'Market',

    created () {
        const path = this.$route.fullPath
        this.$router.replace(path + (path.endsWith('/') ? 'market' : '/market'))

        // console.log(this.$route.fullPath + '/market')
        // this.$router.replace(this.$route.fullPath.endsWith('/') + '/market')
    }
}
</script>

<style scoped>

</style>
