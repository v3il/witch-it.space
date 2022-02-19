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
        console.error(rawPrice)

        if (!rawPrice) {
            return false
        }

        const { priceType, itemId, itemCount, itemId2, itemCount2 } = rawPrice

        if (priceType === PriceType.FIXED && ((!itemId && !itemId2) || (!itemCount && !itemCount2))) {
            return false
        }

        const isValidType = Object.values(PriceType).includes(priceType)
        const isValidItemId1 = !itemId || AVAILABLE.includes(itemId)
        const isValidItemCount1 = Number.isInteger(itemCount) && itemCount >= 0 && itemCount < 100
        const isValidItemId2 = !itemId2 || AVAILABLE.includes(itemId2)
        const isValidItemCount2 = Number.isInteger(itemCount2) && itemCount2 >= 0 && itemCount2 < 100

        console.error(isValidType && isValidItemId1 && isValidItemCount1 && isValidItemId2 && isValidItemCount2)

        return isValidType && isValidItemId1 && isValidItemCount1 && isValidItemId2 && isValidItemCount2
    }
}
