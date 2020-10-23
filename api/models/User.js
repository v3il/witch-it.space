import { config } from '../../shared/config'

const initUserModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'User',
        {
            login: DataTypes.STRING,
            displayName: DataTypes.STRING,
            password: DataTypes.STRING,
            steamId: DataTypes.STRING,
            steamProfileUrl: DataTypes.STRING,
            steamTradeLink: DataTypes.STRING,
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

            inventorySyncTime: {
                type: DataTypes.DATE,
                defaultValue: null
            }
        },
        {}
    )
}

module.exports = { initUserModel }
