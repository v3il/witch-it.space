const fs = require('fs')
const path = require('path')
const { Sequelize, DataTypes } = require('sequelize')
const { config } = require('./config')
const { logger } = require('./logger')
const { initModels } = require('./models')

const initSequelize = async () => {
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

    initModels(sequelize, DataTypes)

    // console.log(sequelize.models)

    // sequelize.import(User)

    // const config = require(`${__dirname}/../config/dbConfig.js`)[env]
    // const db = {}
    //
    // // let sequelize;
    // // if (config.use_env_variable) {
    // //     sequelize = new Sequelize(process.env[config.use_env_variable], config);
    // // } else {
    // //     sequelize = new Sequelize(config.database, config.username, config.password, config);
    // // }
    //
    // const basename = path.basename(__filename)
    //
    // fs.readdirSync(path.join(__dirname, './models'))
    //     .filter((file) => {
    //         return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    //     })
    //     .forEach((file) => {
    //         const model = User(sequelize, DataTypes)
    //         db[model.name] = model
    //     })
    //
    // Object.keys(db).forEach((modelName) => {
    //     if (db[modelName].associate) {
    //         db[modelName].associate(db)
    //     }
    // })

    // await db.User.create({
    //     login: 'login',
    //     password: 'password',
    //     token: 'token'
    // })
    // const r = await db.User.findAll()
    //
    // console.log(r)

    // sequelize.addModels([
    //     User,
    //     Review,
    //     Category,
    //     RestPlace,
    //     WorkingPeriod,
    //     RestPlaceCategory
    // ])

    await sequelize.sync({
        alter: true
    })

    logger.info('Connected to DB')

    return sequelize
}

module.exports = { initSequelize }
