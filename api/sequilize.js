const { Sequelize, DataTypes } = require('sequelize')
const { config } = require('./config')
const { logger } = require('./logger')
const { initModels } = require('./models')

let sequelize

try {
    logger.info('Connecting to DB...')
    logger.info(`DB_NAME=${config.DB_NAME}`)
    logger.info(`DB_HOST=${config.DB_HOST}`)

    sequelize = new Sequelize({
        host: config.DB_HOST,
        database: config.DB_NAME,
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        dialect: 'postgres',
        logging: false,
        define: {
            freezeTableName: false,
            timestamps: false,
            underscored: true
        },
        dialectOptions: {
            charset: 'utf8mb4'
        }
    })

    initModels(sequelize, DataTypes)

    sequelize.sync({
        alter: true
    })

    logger.info('Connected to DB')

    return sequelize
} catch (e) {
    logger.error('DB connection error')
    logger.error(e.message)
}

module.exports = { sequelize }
