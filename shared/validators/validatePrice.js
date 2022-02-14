import { PriceType } from '../items/index'

// offerId: DataTypes.INTEGER,
//     priceType: DataTypes.STRING,
//     itemId: DataTypes.INTEGER,
//     itemCount: DataTypes.INTEGER,
//     itemId2: DataTypes.INTEGER,
//     itemCount2: DataTypes.INTEGER,
//     priceValue: DataTypes.INTEGER

export const validatePrice = (rawPrice) => {
    const { priceType, itemId, itemCount, itemId2, itemCount2 } = rawPrice
    const isValidType = Object.values(PriceType).includes(priceType)
}
