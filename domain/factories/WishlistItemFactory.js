import { WishlistItem } from '@/domain/models/index.js'

export class WishlistItemFactory {
    createWishlist (rawWishlistItem) {
        return WishlistItem.create({ rawModel: rawWishlistItem })
    }
}
