const initUserSettingsModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'UserSettings',
        {
            // login: DataTypes.STRING,
            // displayName: DataTypes.STRING,
            // password: DataTypes.STRING,
            // steamId: DataTypes.STRING,
            // steamTradeLink: DataTypes.STRING,
            // discordId: DataTypes.STRING,
            // googleId: DataTypes.STRING,
            // questsUpdateTimestamp: DataTypes.INTEGER,

            // marketNote: '',
            // wishlistNote: '',
            // switchRarities: false,
            // tradeWithGuardedOnly: true,
            // discountAvailable: true,
            // tradeDuplicatesOnly: true,
            // hideRecipes: false

            // userId: DataTypes.INTEGER,

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

            // locale: {
            //     type: DataTypes.STRING,
            //     defaultValue: config.DEFAULT_LOCALE
            // },
            //
            // inventorySyncTime: {
            //     type: DataTypes.DATE,
            //     defaultValue: null
            // },
            //
            // settings: {
            //     type: DataTypes.JSONB,
            //
            //     get () {
            //         return JSON.parse(this.getDataValue('settings'))
            //     },
            //
            //     set (value) {
            //         return this.setDataValue('settings', JSON.stringify(value))
            //     },
            //
            //     defaultValue: JSON.stringify({
            //         marketNote: '',
            //         wishlistNote: '',
            //         switchRarities: false,
            //         tradeWithGuardedOnly: true,
            //         discountAvailable: true,
            //         tradeDuplicatesOnly: true,
            //         hideRecipes: false
            //     })
            // },
            //
            // userStat: {
            //     type: DataTypes.JSONB,
            //
            //     get () {
            //         return JSON.parse(this.getDataValue('userStat'))
            //     },
            //
            //     set (value) {
            //         return this.setDataValue('userStat', JSON.stringify(value))
            //     },
            //
            //     defaultValue: JSON.stringify({
            //         marketSize: 0,
            //         marketSizeCommon: 0,
            //         marketSizeUncommon: 0,
            //         marketSizeRare: 0,
            //         marketSizeVeryRare: 0,
            //         marketSizeWhimsical: 0,
            //         wishlistSize: 0,
            //         wishlistSizeCommon: 0,
            //         wishlistSizeUncommon: 0,
            //         wishlistSizeRare: 0,
            //         wishlistSizeVeryRare: 0,
            //         wishlistSizeWhimsical: 0
            //     })
            // }
        },
        {}
    )
}

export { initUserSettingsModel }
