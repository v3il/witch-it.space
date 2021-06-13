<template>
  <div>
    {{ $store.state.items.items }}
  </div>
</template>

<script>

export default {
    components: {
    },

    middleware: ['fetchUser', 'fetchItems'],

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
