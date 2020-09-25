import { config } from '../config'

const initUserModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'User',
        {
            nickname: DataTypes.STRING,
            password: DataTypes.STRING,
            steamId: DataTypes.STRING,
            discordId: DataTypes.STRING,
            discordTag: DataTypes.STRING,
            googleId: DataTypes.STRING,

            isGuardProtected: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            avatarId: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },

            locale: {
                type: DataTypes.STRING,
                defaultValue: config.DEFAULT_LOCALE
            },

            userHash: DataTypes.STRING,

            inventorySyncTime: {
                type: DataTypes.DATE,
                defaultValue: null
            }
        },
        {}
    )
}

module.exports = { initUserModel }
