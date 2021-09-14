<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    {{ article }}

    <button @click="authDiscord">
      Discord
    </button>

    <button @click="authSteam">
      Steam
    </button>

    <p>{{ $store.state.list }}</p>

    <NuxtLink to="/app">
      Home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
    data: () => ({
        article: 'article'
    }),

    async created () {
        // console.log(this.$store)

        this.$store.commit('add', 'Test')

        try {
            const { data } = await this.$axios.get('/api/')

            this.article = data
        } catch (e) {
            console.log(e)
        }
    },

    methods: {
        authDiscord () {
            window.open('/api/auth/discord' /* 'auth', 'width=600,height=600' */)

            // const { data } = await this.$axios.get('/api/')
            //
            // this.article = data

            // await this.$auth.loginWith('discord')

            // console.log(this.$auth.user)
        },

        authSteam () {
            window.open('/api/auth/steam' /* 'auth', 'width=600,height=600' */)
            // window.open('/api/auth/steam', 'auth', 'width=600,height=600')

            // const { data } = await this.$axios.get('/api/')
            //
            // this.article = data
        }
    }
}
</script>
