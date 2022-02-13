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
            createdDate: DataTypes.DATE,
            quality: DataTypes.INTEGER,
            rarity: DataTypes.STRING,
            character: DataTypes.STRING,
            slot: DataTypes.STRING,
            type: DataTypes.STRING,
            event: DataTypes.STRING,
            isTradable: DataTypes.BOOLEAN
        },
        {}
    )
}

export { initItemModel }
