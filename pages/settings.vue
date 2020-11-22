<template>
  <div>
    Settings

    <p>{{ user }}</p>

    <!--    <button @click="c">-->
    <!--      c-->
    <!--    </button>-->
  </div>
</template>

<script>
export default {
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
