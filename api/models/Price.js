const initPriceModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'Price',
        {
            offerId: DataTypes.INTEGER,
            priceType: DataTypes.INTEGER,
            itemId: DataTypes.INTEGER,
            itemCount: DataTypes.INTEGER,
            itemId2: DataTypes.INTEGER,
            itemCount2: DataTypes.INTEGER,
            itemId3: DataTypes.INTEGER,
            itemCount3: DataTypes.INTEGER
        }
    )
}

export { initPriceModel }
