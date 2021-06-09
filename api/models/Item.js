const initItemModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'Item',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },

            name: DataTypes.STRING,
            description: DataTypes.STRING,
            createdTimestamp: DataTypes.INTEGER,
            previewUrl: DataTypes.STRING,
            quality: DataTypes.INTEGER,
            rarity: DataTypes.STRING,
            character: DataTypes.STRING,
            slot: DataTypes.STRING,
            type: DataTypes.STRING,
            event: DataTypes.STRING,
            isTradeable: DataTypes.BOOLEAN
        },
        {}
    )
}

export { initItemModel }
