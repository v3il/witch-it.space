import { AVAILABLE, PriceType } from '../../shared/items'
import { config } from '../../shared'

export class PriceService {
    normalizeRawPrices (rawPrices) {
        const normalizedPrices = []

        rawPrices.forEach((rawPrice) => {
            if (!this.#isValidPrice(rawPrice)) {
                return
            }

            const { priceType, itemId, itemCount, itemId2, itemCount2, id } = rawPrice
            const isFixedPrice = priceType === PriceType.FIXED

            const normalizedPrice = {
                priceType,
                itemId: isFixedPrice ? itemId : 0,
                itemId2: isFixedPrice ? itemId2 : 0,
                itemCount: itemId ? itemCount : 0,
                itemCount2: itemId2 ? itemCount2 : 0
            }

            if (rawPrice.id) {
                normalizedPrice.id = rawPrice.id
            }

            normalizedPrices.push(normalizedPrice)
        })

        return normalizedPrices.slice(0, config.MAX_PRICES)
    }

    #isValidPrice (rawPrice) {
        // console.error(rawPrice)

        if (!rawPrice) {
            return false
        }

        if (rawPrice.priceType === PriceType.FIXED) {
            console.log(this.#isFixedPriceValid(rawPrice))

            return this.#isFixedPriceValid(rawPrice)
        }

        return rawPrice.priceType === PriceType.ANY || rawPrice.priceType === PriceType.WISHLIST
    }

    #isFixedPriceValid (rawPrice) {
        const { itemId, itemCount, itemId2, itemCount2 } = rawPrice

        const hasValidItems = [itemId, itemId2].some(itemId => AVAILABLE.includes(itemId))

        if (!hasValidItems) {
            return false
        }

        const isValidItemId1 = AVAILABLE.includes(itemId)
        const isValidItemCount1 = Number.isInteger(itemCount) && itemCount >= config.MIN_PRICE_VALUE && itemCount < config.MAX_PRICE_VALUE

        if (isValidItemId1 && !isValidItemCount1) {
            return false
        }

        const isValidItemId2 = AVAILABLE.includes(itemId2)
        const isValidItemCount2 = Number.isInteger(itemCount2) && itemCount2 >= config.MIN_PRICE_VALUE && itemCount2 < config.MAX_PRICE_VALUE

        return !(isValidItemId2 && !isValidItemCount2)
    }
}
