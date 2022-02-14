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
        }
    }
}
