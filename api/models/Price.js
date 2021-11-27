const initPriceModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'Price',
        {
            offerId: DataTypes.INTEGER,
            priceType: DataTypes.STRING,
            itemId1: DataTypes.INTEGER,
            itemCount1: DataTypes.INTEGER,
            itemId2: DataTypes.INTEGER,
            itemCount2: DataTypes.INTEGER,
            itemId3: DataTypes.INTEGER,
            itemCount3: DataTypes.INTEGER
        }
    )
}

export { initPriceModel }
