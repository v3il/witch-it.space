export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
        'primevue/resources/themes/saga-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    modules: [
        ['@pinia/nuxt', {
            autoImports: ['defineStore', 'acceptHMRUpdate']
        }]
    ],
    build: {
        transpile: ['primevue']
    }
})
