<template>
  <div>
    App

    <p>{{ user }}</p>

    <button @click="c">
      c
    </button>
  </div>
</template>

<script>
export default {
    middleware: ['fetchUser'],

    data: () => ({
        user: null
    }),

    methods: {
        async c () {
            // console.log(this.$store)

            // this.$store.commit('add', 'Test')

            // console.log('Created')

            // const { data } = await this.$axios.get('/api/user')
            //
            // this.user = data
        }
    }
}
</script>
