import knexModule from 'knex'
import knexFile from '../../knexfile.cjs'

const { knex } = knexModule
const config = knexFile[process.env.NODE_ENV || 'development']

export const knexInstance = knex(config)
