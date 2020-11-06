const PORT = process.env.SERVER_ORIGIN || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

const isProduction = NODE_ENV === 'production'

const config = {
    PORT,
    NODE_ENV,

    SERVER_ORIGIN: isProduction ? '' : 'http://localhost:3000',

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_NAME: process.env.DB_NAME || 'witch-trade',

    JWT_SECRET: process.env.JWT_SECRET || 'secret',

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || 'client_id',
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || 'client_secret',

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'client_id',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'client_secret',

    STEAM_CLIENT_ID: process.env.STEAM_CLIENT_ID || 'client_id',

    AVAILABLE_LOCALES: ['en', 'ru'],
    DEFAULT_LOCALE: 'en',

    AVAILABLE_THEMES: ['light', 'dark'],
    DEFAULT_THEME: 'dark',

    TOKEN_COOKIE_NAME: 'wit.token',
    TOKEN_COOKIE_DURATION: 60 * 60 * 24 * 30, // 30 days
    LOCALE_COOKIE_NAME: 'wit.locale',
    LOCALE_COOKIE_DURATION: 60 * 60 * 24 * 365 // 365 days
}

module.exports = { config }
