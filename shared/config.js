const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

const isProduction = NODE_ENV === 'production'

export const Themes = { LIGHT: 'light', DARK: 'dark' }
export const Locales = { EN: 'en', RU: 'ru', UA: 'ua' }

const dbParams = {
    DB_HOST: isProduction ? process.env.DB_HOST : 'localhost',
    DB_USER: isProduction ? process.env.DB_USER : 'postgres',
    DB_PASSWORD: isProduction ? process.env.DB_PASSWORD : 'root',
    DB_NAME: isProduction ? process.env.DB_NAME : 'witch-trade'
}

export const config = {
    PORT,
    NODE_ENV,

    APP_NAME: 'Witch It.Space',

    SERVER_ORIGIN: isProduction ? 'https://witch-it.space' : `http://localhost:${PORT}`,

    ...dbParams,

    JWT_SECRET: process.env.JWT_SECRET || 'secret',

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || 'client_id',
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || 'client_secret',

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'client_id',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'client_secret',

    STEAM_CLIENT_ID: process.env.STEAM_CLIENT_ID || 'client_id',

    AVAILABLE_LOCALES: [Locales.EN, Locales.RU, Locales.UA],
    DEFAULT_LOCALE: Locales.EN,

    AVAILABLE_THEMES: [Themes.LIGHT, Themes.DARK],
    DEFAULT_THEME: Themes.DARK,

    TOKEN_COOKIE_DURATION: 60 * 60 * 24 * 30, // 30 days
    LOCALE_COOKIE_DURATION: 60 * 60 * 24 * 365, // 365 days
    QUESTS_UPDATE_TIMEOUT: 5 * 60, // 5 mins

    MAX_PRICES: 2,
    MIN_PRICE_VALUE: 1,
    MAX_PRICE_VALUE: 100
}
