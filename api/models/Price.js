const initPriceModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'Price',
        {
            offerId: DataTypes.INTEGER,
            priceType: DataTypes.STRING,
            itemId: DataTypes.INTEGER,
            itemCount: DataTypes.INTEGER,
            itemId2: DataTypes.INTEGER,
            itemCount2: DataTypes.INTEGER,
            priceValue: DataTypes.INTEGER
        }
    )
}

export { initPriceModel }
