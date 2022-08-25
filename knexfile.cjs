const NODE_ENV = process.env.NODE_ENV || 'development'
const isProduction = NODE_ENV === 'production'

const connection = {
    host: isProduction ? process.env.DB_HOST : 'localhost',
    database: isProduction ? process.env.DB_NAME : 'witch-trade',
    user: isProduction ? process.env.DB_USER : 'postgres',
    password: isProduction ? process.env.DB_PASSWORD : 'root',
    port: 5432,
}

const dbConfig = {
    client: 'postgresql',
    connection,
    migrations: {
        directory: './api/knex/migrations'
    },
    seeds: {
        directory: './api/knex/seeds'
    }
}

module.exports = {
    development: dbConfig,
    production: dbConfig
}
