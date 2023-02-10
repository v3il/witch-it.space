// const isProduction = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
    css: [
        '~/assets/css/common.css',
        'primevue/resources/themes/lara-dark-indigo/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        '/node_modules/primeflex/primeflex.css'
    ],

    modules: [
        'nuxt-icon',
        ['@pinia/nuxt', {
            autoImports: ['defineStore', 'acceptHMRUpdate']
        }]
    ],

    build: {
        transpile: ['primevue']
    },

    components: [
        {
            path: '~/components/',
            pathPrefix: false
        }
    ],

    app: {
        head: {
            title: 'witch-it.space',
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inter:wght@100,500,600,700,800,900|Roboto:400,500|Sarabun:400,600,700&display=swap' }
            ]
        }
    },

    runtimeConfig: {
        discordClientId: process.env.DISCORD_CLIENT_ID,
        discordClientSecret: process.env.DISCORD_CLIENT_SECRET,

        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

        steamClientSecret: process.env.STEAM_CLIENT_SECRET,

        public: {
            serverOrigin: process.env.SERVER_ORIGIN
        }
    }
})
