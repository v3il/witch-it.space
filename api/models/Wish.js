const initWishModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'Wish',
        {
            itemId: DataTypes.INTEGER,
            itemCount: DataTypes.INTEGER
        },
        { timestamps: true }
    )
}

export { initWishModel }
