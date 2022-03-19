import { config } from './shared/config'

require('module').Module._extensions['.js'] = function (module, filename) {
    module._compile(require('fs').readFileSync(filename, 'utf8'), filename)
}

export default {
    head: {
        title: config.APP_NAME,
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
        '@/node_modules/buefy-css-variables/dist/buefy.css',
        './assets/scss/main.scss'
    ],

    plugins: [
        '~/plugins/axios.js',
        '~/plugins/vueExtensions.js',
        '~/plugins/prototypeExtensions.js',
        '~/plugins/injectServices.js',
        '~/plugins/vueFinalModal.js'
    ],

    loading: {
        color: '#626ed4',
        height: '2px'
    },
    components: true,

    buildModules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/eslint-module',
        '@nuxtjs/stylelint-module'
    ],

    modules: [
        'nuxt-client-init-module',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources',
        'nuxt-buefy',
        'cookie-universal-nuxt'
    ],

    axios: {
        baseURL: config.SERVER_ORIGIN
    },

    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    build: {
        transpile: ['vue-final-modal']
    },

    serverMiddleware: [
        '~/api/index.js'
    ]
}
