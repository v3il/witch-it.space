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

    <a href="/api/auth/discord">Discord</a>

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

    // async created () {
    //     // console.log(this.$store)
    //
    //     this.$store.commit('add', 'Test')
    //
    //     try {
    //         const { data } = await this.$axios.get('/api/')
    //
    //         this.article = data
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },

    methods: {
        authDiscord () {
            // console.log(this.$nuxt.context.redirect('/api/auth/discord'))

            // this.$router.replace('/api/auth/discord')

            // this.$axios.get('/api/auth/discord')

            // this.location = '/api/auth/discord'

            window.open('/api/auth/discord' /* 'auth', 'width=600,height=600' */)

            window.test = () => {
                // console.error('Test')
            }

            // console.log(wnd)
            //
            // wnd.onbeforeunload = () => {
            //     console.log('Unload')
            // }

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
