import { config, ru, ua, en, Cookies } from './shared'

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
        './assets/styles/base/global.css',
        '@/assets/scss/main.scss'
    ],

    plugins: [
        '~/plugins/axios.js',
        '~/plugins/i18n.js'
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
        '@nuxtjs/style-resources',
        'nuxt-buefy',
        'cookie-universal-nuxt'
    ],

    axios: {},

    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    build: {
        vendor: ['keen-ui']
    },

    serverMiddleware: [
        '~/api/index.js'
    ]

    // i18n: {
    //     locales: config.AVAILABLE_LOCALES,
    //     defaultLocale: config.DEFAULT_LOCALE,
    //     strategy: 'no_prefix',
    //     vueI18n: {
    //         strategy: 'no_prefix',
    //         fallbackLocale: 'en',
    //         messages: {
    //             en,
    //             ua,
    //             ru
    //         }
    //     },
    //     detectBrowserLanguage: {
    //         useCookie: true,
    //         cookieKey: Cookies.LOCALE,
    //         redirectOn: 'root',
    //         alwaysRedirect: true
    //     }
    // }
}
