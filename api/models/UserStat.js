const initUserStatModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'UserStat',
        {
            marketSize: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            marketSizeCommon: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            marketSizeUncommon: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            marketSizeRare: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            marketSizeVeryRare: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            marketSizeWhimsical: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            wishlistSize: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            wishlistSizeCommon: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            wishlistSizeUncommon: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            wishlistSizeRare: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            wishlistSizeVeryRare: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            wishlistSizeWhimsical: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {}
    )
}

export { initUserStatModel }
