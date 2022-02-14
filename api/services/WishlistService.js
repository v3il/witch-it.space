import { Price } from '../models'

export class WishlistService {
    async manage (user, wishlist) {
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

                continue
            }
        }
    }
}
