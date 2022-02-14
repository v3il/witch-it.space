import { PriceType, AVAILABLE } from '../items/index'

export const validatePrice = (rawPrice) => {
    if (!rawPrice) {
        return false
    }

    const { priceType, itemId, itemCount, itemId2, itemCount2 } = rawPrice

    if ((!itemId && !itemId2) || (!itemCount && !itemCount2)) {
        return false
    }

    const isValidType = Object.values(PriceType).includes(priceType)
    const isValidItemId1 = !itemId || AVAILABLE.includes(itemId)
    const isValidItemCount1 = Number.isInteger(itemCount) && itemCount >= 1 && itemCount < 100
    const isValidItemId2 = !itemId2 || AVAILABLE.includes(itemId2)
    const isValidItemCount2 = Number.isInteger(itemCount2) && itemCount2 >= 1 && itemCount2 < 100

    return isValidType && isValidItemId1 && isValidItemCount1 && isValidItemId2 && isValidItemCount2
}
