import { Price } from '../models'
import { config } from '../../shared'
import { validatePrice } from '../../shared/validators'

export class WishlistService {
    #priceService

    constructor ({ priceService }) {
        this.#priceService = priceService
    }

    async manage (user, wishlist) {
        const itemsToSave = []
        const itemsToUpdate = []
        let pricesToRemoveIds = []

        const existingWishlistItems = await user.getWishes({
            include: { model: Price, as: 'rawPrices' }
        })

        for (const wishlistItem of wishlist) {
            const { id, itemId } = wishlistItem

            if (!id) {
                const existingByItemId = existingWishlistItems.find(existingItem => existingItem.itemId === itemId)

                if (existingByItemId) {
                    continue
                }

                itemsToSave.push({
                    itemId,
                    rawPrices: this.#priceService.normalizeRawPrices(wishlistItem.rawPrices)
                })

                continue
            }

            const existingModel = existingWishlistItems.find(existingItem => existingItem.id === id)

            if (!existingModel) {
                continue
            }

            const removedPrices = existingModel.rawPrices
                .filter(existingPrice => !wishlistItem.rawPrices.some(rawPrice => rawPrice.id === existingPrice.id))

            console.log(removedPrices)

            pricesToRemoveIds = pricesToRemoveIds.concat(removedPrices.map(existingPrice => existingPrice.id))

            itemsToUpdate.push({
                id,
                itemId,
                rawPrices: this.#priceService.normalizeRawPrices(wishlistItem.rawPrices)
            })
        }

        console.log(JSON.stringify(itemsToSave, null, 2))
        console.log(JSON.stringify(itemsToUpdate, null, 2))
        console.log(JSON.stringify(pricesToRemoveIds, null, 2))
    }
}
