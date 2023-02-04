export default defineNuxtConfig({
    css: [
        '~/assets/css/common.css',
        'primevue/resources/themes/saga-blue/theme.css',
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
    ]
})
