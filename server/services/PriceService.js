import joi from 'joi'
import { AVAILABLE, PriceType } from '../../shared/items'
import { config } from '../../shared'

export class PriceService {
    normalizeRawPrices (rawPrices) {
        const normalizedPrices = []

        // rawPrices.forEach((rawPrice) => {
        //     if (!this.#isValidPrice(rawPrice)) {
        //         return
        //     }
        //
        //     const { priceType, itemId, itemCount, itemId2, itemCount2 } = rawPrice
        //     const isFixedPrice = priceType === PriceType.FIXED
        //
        //     const normalizedPrice = {
        //         priceType,
        //         itemId: isFixedPrice ? itemId : 0,
        //         itemCount: itemId ? itemCount : 0,
        //         itemId2: isFixedPrice ? itemId2 : 0,
        //         itemCount2: itemId2 ? itemCount2 : 0
        //     }
        //
        //     if (rawPrice.id) {
        //         normalizedPrice.id = rawPrice.id
        //     }
        //
        //     normalizedPrices.push(normalizedPrice)
        // })

        return normalizedPrices.slice(0, config.MAX_PRICES)
    }

    isValidPrice (price) {
        if (!price) {
            return false
        }

        if (price.priceType === PriceType.FIXED) {
            return this.#isFixedPriceValid(price)
        }

        return price.priceType === PriceType.ANY || price.priceType === PriceType.WISHLIST
    }

    #isFixedPriceValid (rawPrice) {
        const { item1Id, item1Count, item2Id, item2Count } = rawPrice
        const hasValidItems = [item1Id, item2Id].some(itemId => AVAILABLE.includes(itemId))

        if (!hasValidItems) {
            return false
        }

        const itemCountSchema = joi.number().integer().greater(0).less(config.MAX_PRICE_VALUE)
        const count1Validation = itemCountSchema.validate(item1Count)
        const count2Validation = itemCountSchema.validate(item2Count)
        const isValidItem1 = AVAILABLE.includes(item1Id) && !count1Validation.error
        const isValidItem2 = AVAILABLE.includes(item2Id) && !count2Validation.error

        // console.log(`${itemId} * ${itemCount} + ${itemId2} * ${itemCount2} = ${isValidItem1}, ${isValidItem2}`)

        return isValidItem1 || isValidItem2
    }
}
