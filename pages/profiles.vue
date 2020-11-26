<template>
  <div>
    Profiles

    {{ users }}
  </div>
</template>

<script>
export default {
    middleware: ['fetchUser'],

    data: () => ({
        users: []
    }),

    async created () {
        this.users = (await this.$axios.get('/api/profiles')).data

        // console.log(this.$store)

        // this.$store.commit('add', 'Test')

        // console.log('Created')

        // console.log()
    },

    methods: {

    }
}
</script>
