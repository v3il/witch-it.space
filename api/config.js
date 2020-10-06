const PORT = process.env.SERVER_PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
    PORT,
    NODE_ENV,

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_NAME: process.env.DB_NAME || 'witch-trade',

    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    PASSWORD_HASH_SECRET: process.env.PASSWORD_HASH_SECRET || 'secret',

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || 'client_id',
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || 'client_secret',

    AVAILABLE_LOCALES: ['en', 'ru'],
    DEFAULT_LOCALE: 'en'
}

module.exports = { config }
