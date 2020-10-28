export default {
    head: {
        title: 'WitchTrade',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500|Sarabun:400,600,700&display=swap' }
        ]
    },

    css: [
        './assets/styles/base/global.css'
    ],

    plugins: [
        '~/plugins/axios.js'
    ],

    components: true,

    buildModules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/eslint-module',
        '@nuxtjs/stylelint-module'
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources'
    ],

    axios: {},

    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    build: {
    },

    serverMiddleware: [
        '~/api/index.js'
    ]
}
