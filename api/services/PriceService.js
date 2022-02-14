import { AVAILABLE, PriceType } from '../../shared/items'
import { config } from '../../shared'

export class PriceService {
    isValidRawPrice (rawPrice) {
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

    normalizeRawPrices (rawPrices) {
        const normalizedPrices = []

        rawPrices.forEach((rawPrice) => {
            if (!this.#isValidPrice(rawPrice)) {
                return
            }

            const { priceType, itemId, itemCount, itemId2, itemCount2, id } = rawPrice

            normalizedPrices.push({
                id,
                priceType,
                itemId,
                itemId2,
                itemCount: itemId ? itemCount : 0,
                itemCount2: itemId2 ? itemCount2 : 0
            })
        })

        return normalizedPrices.slice(0, config.MAX_PRICES)
    }

    #isValidPrice (rawPrice) {
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
}
