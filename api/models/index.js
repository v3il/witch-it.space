import sql from 'sequelize'
import { config } from '../../shared/config'
import { logger } from '../logger'
import { initUserModel } from './User'
import { initQuestModel } from './Quest'
import { initItemModel } from './Item'
import { initWishModel } from './Wish'
import { initPriceModel } from './Price'
import { initUserSettingsModel } from './UserSettings'
import { initUserStatModel } from './UserStat.js'

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

    const User = initUserModel(sequelize, DataTypes)
    const Quest = initQuestModel(sequelize, DataTypes)
    const Item = initItemModel(sequelize, DataTypes)
    const Wish = initWishModel(sequelize, DataTypes)
    const Price = initPriceModel(sequelize, DataTypes)
    const UserSettings = initUserSettingsModel(sequelize, DataTypes)
    const UserStat = initUserStatModel(sequelize, DataTypes)

    User.hasMany(Quest)
    User.hasMany(Wish)
    User.hasOne(UserSettings, { foreignKey: 'userId', as: 'settings' })
    User.hasOne(UserStat, { foreignKey: 'userId', as: 'userStat' })
    Wish.hasMany(Price, { foreignKey: 'offerId', as: 'rawPrices' })

    Quest.belongsTo(User, { foreignKey: 'userId' })
    Wish.belongsTo(User, { foreignKey: 'userId' })
    Price.belongsTo(Wish, { foreignKey: 'offerId' })
    UserSettings.belongsTo(User, { foreignKey: 'userId', as: 'settings' })
    UserStat.belongsTo(User, { foreignKey: 'userId', as: 'userStat' })

    db.sequelize = sequelize
    db.User = User
    db.Quest = Quest
    db.Item = Item
    db.Wish = Wish
    db.Price = Price
    db.UserSettings = UserSettings
    db.UserStat = UserStat

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
export const UserSettings = db.UserSettings
export const UserStat = db.UserStat
export const sequelize = db.sequelize
export const Sequelize = Seq
