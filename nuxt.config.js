export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'WitchTrade',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/eslint-module',
        '@nuxtjs/stylelint-module'
    ],

    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/auth-next'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    serverMiddleware: [
        '~/api/index.js'
    ]

    // auth: {
    //     strategies: {
    //         discord: {
    //             clientId: '886919625869250591',
    //             clientSecret: 'u9ZUnbdDB8w6ggupRMF7FEhkXAqrO0V3',
    //             scope: ['identify'],
    //             // endpoints: {
    //             //     authorization: 'https://accounts.google.com/o/oauth2/auth',
    //             //     token: undefined,
    //             //     userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
    //             //     logout: 'https://example.com/logout'
    //             // },
    //             redirectUri: 'http://localhost:3000/app',
    //             endpoints: {
    //                 login: { url: '/login', method: 'post' },
    //                 refresh: { url: '/token', method: 'post' },
    //                 logout: { url: '/logout', method: 'delete' },
    //                 user: { url: '/user', method: 'get' }
    //             }
    //         }
    //     }
    // }
}
