import { initUserModel } from './User'
import { initQuestModel } from './Quest'
import { initItemModel } from './Item'
const { Sequelize, DataTypes } = require('sequelize')
const { config } = require('../../shared/config')
const { logger } = require('../logger')

const db = {}

try {
    logger.info('Connecting to DB...')
    logger.info(`DB_NAME=${config.DB_NAME}`)
    logger.info(`DB_HOST=${config.DB_HOST}`)

    const sequelize = new Sequelize({
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

    db.User = initUserModel(sequelize, DataTypes)
    db.Quest = initQuestModel(sequelize, DataTypes)
    db.Item = initItemModel(sequelize, DataTypes)

    db.User.hasMany(db.Quest)
    db.Quest.belongsTo(db.User, { foreignKey: 'userId' })

    db.sequelize = sequelize
    db.Sequelize = Sequelize

    sequelize.sync({ alter: true })

    logger.info('Connected to DB')
} catch (e) {
    logger.error('DB connection error')
    logger.error(e.message)
    process.exit(1)
}

module.exports = {
    User: db.User,
    Quest: db.Quest,
    sequelize: db.sequelize,
    Sequelize: db.Sequelize
}
