const initWishModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'Wish',
        {
            itemId: DataTypes.INTEGER,
            itemCount: DataTypes.INTEGER,
            itemRarity: DataTypes.STRING
        },
        { timestamps: true }
    )
}

export { initWishModel }
