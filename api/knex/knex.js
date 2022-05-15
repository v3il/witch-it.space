import { knex } from 'knex'

const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile.cjs')[environment]

export const knexInstance = knex(config)
