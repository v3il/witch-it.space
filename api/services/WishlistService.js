import { Price } from '../models'
import { validatePrice } from '../../shared/validators'

export class WishlistService {
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

                const validatedPrices = (wishlistItem.rawPrices || []).filter(rawPrice => validatePrice(rawPrice))

                if (!validatedPrices.length) {
                    continue
                }

                wishlistItem.rawPrices = validatedPrices.slice(0, 2)

                continue
            }
        }
    }
}
