import { config } from '../../shared'

const initUserModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'User',
        {
            login: DataTypes.STRING,
            displayName: DataTypes.STRING,
            password: DataTypes.STRING,
            steamId: DataTypes.STRING,
            steamTradeLink: DataTypes.STRING,
            discordId: DataTypes.STRING,
            googleId: DataTypes.STRING,
            questsUpdateTimestamp: DataTypes.INTEGER,

            theme: {
                type: DataTypes.STRING,
                defaultValue: config.DEFAULT_THEME
            },

            canReplaceDailyQuests: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            canReplaceWeeklyQuests: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            isGuardProtected: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            isPublic: {
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
            },

            wishlistUpdateTime: {
                type: DataTypes.INTEGER,
                defaultValue: null
            },

            marketUpdateTime: {
                type: DataTypes.INTEGER,
                defaultValue: null
            },

            marketSize: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            wishlistSize: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            marketNote: {
                type: DataTypes.TEXT,
                defaultValue: ''
            },

            wishlistNote: {
                type: DataTypes.TEXT,
                defaultValue: ''
            },

            switchRarities: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            tradeWithGuardedOnly: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            discountAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            tradeDuplicatesOnly: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            hideRecipes: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {}
    )
}

export { initUserModel }
