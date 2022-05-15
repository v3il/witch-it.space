const dbConfig = {
    client: 'postgresql',
    connection: `postgres://postgres:root@localhost:5432/witch-trade`, // todo
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
