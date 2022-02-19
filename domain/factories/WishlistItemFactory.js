import { Offer } from '@/domain/models/index.js'

export class WishlistItemFactory {
    createWishlist (rawWishlistItem) {
        return Offer.create({ rawModel: rawWishlistItem })
    }
}
