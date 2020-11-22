<template>
  <div>
    Settings

    <UserView />
  </div>
</template>

<script>
import UserView from '@/components/UserView'

export default {

    components: {
        UserView
    },
    middleware: ['fetchUser'],

    data: () => ({
        user: null
    }),

    created () {
        this.user = this.$store.state.user
        // console.log(this.$store)

        // this.$store.commit('add', 'Test')

        // console.log('Created')

        // console.log()
    },

    methods: {

    }
}
</script>
