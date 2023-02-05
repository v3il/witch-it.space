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
            meta: [
                // <meta name="description" content="My amazing site">
                { name: 'description', content: 'My amazing site.' }
            ],
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inter:wght@100,500,600,700,800,900|Roboto:400,500|Sarabun:400,600,700&display=swap' }
            ]
        }
    }
})
