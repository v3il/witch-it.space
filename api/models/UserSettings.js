const initUserSettingsModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'UserSettings',
        {
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

export { initUserSettingsModel }
