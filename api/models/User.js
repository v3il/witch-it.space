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

            marketNote: {
                type: DataTypes.TEXT,
                defaultValue: ''
            },

            wishlistNote: {
                type: DataTypes.TEXT,
                defaultValue: ''
            },

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

            isStrictRarity: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            onlyGuarded: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            isBargainAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            isTradingOnlyDups: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            areRecipesHidden: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
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
            }
        },
        {}
    )
}

export { initUserModel }
