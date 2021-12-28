import sql from 'sequelize'
import { config } from '../../shared/config'
import { logger } from '../logger'
import { initUserModel } from './User'
import { initQuestModel } from './Quest'
import { initItemModel } from './Item'
import { initWishModel } from './Wish'
import { initPriceModel } from './Price'

const { Sequelize: Seq, DataTypes } = sql
const db = {}

try {
    logger.info('Connecting to DB...')
    logger.info(`DB_NAME=${config.DB_NAME}`)
    logger.info(`DB_HOST=${config.DB_HOST}`)

    const sequelize = new Seq({
        host: config.DB_HOST,
        database: config.DB_NAME,
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        dialect: 'postgres',
        logging: false /* && console.log */,
        define: {
            freezeTableName: false,
            timestamps: false,
            underscored: true
        },
        dialectOptions: {
            charset: 'utf8mb4'
        }
    })

    const User = initUserModel(sequelize, DataTypes)
    const Quest = initQuestModel(sequelize, DataTypes)
    const Item = initItemModel(sequelize, DataTypes)
    const Wish = initWishModel(sequelize, DataTypes)
    const Price = initPriceModel(sequelize, DataTypes)

    User.hasMany(Quest)
    User.hasMany(Wish)
    Wish.hasMany(Price, { foreignKey: 'offerId', as: 'prices' })

    Quest.belongsTo(User, { foreignKey: 'userId' })
    Wish.belongsTo(User, { foreignKey: 'userId' })
    Price.belongsTo(Wish, { foreignKey: 'offerId' })

    db.sequelize = sequelize
    db.User = User
    db.Quest = Quest
    db.Item = Item
    db.Wish = Wish
    db.Price = Price

    sequelize.sync({ alter: true })

    logger.info('Connected to DB')
} catch (e) {
    logger.error('DB connection error')
    logger.error(e.message)
    process.exit(1)
}

export const User = db.User
export const Quest = db.Quest
export const Item = db.Item
export const Wish = db.Wish
export const Price = db.Price
export const sequelize = db.sequelize
export const Sequelize = Seq
