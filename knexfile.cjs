const dbConfig = {
    client: 'postgresql',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 5432,
    },
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
