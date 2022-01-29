import { priceService } from '@/domain/index.js'

export class WishlistService {
    #axiosInstance = null
    #itemsService = null
    #priceService = null
    #wishlistItemFactory = null

    constructor ({ itemsService, wishlistItemFactory, priceService }) {
        this.#itemsService = itemsService
        this.#wishlistItemFactory = wishlistItemFactory
        this.#priceService = priceService
    }

    setAxios (axiosInstance) {
        this.#axiosInstance = axiosInstance
    }

    async fetch (userId) {
        try {
            const { data } = await this.#axiosInstance.get(`/api/wishlist?userId=${userId}`)
            return {
                error: null,
                wishlist: data.wishlist
            }
        } catch (e) {
            return {
                error: e.message,
                wishlist: null
            }
        }
    }

    toModel (rawWishlistItem) {
        rawWishlistItem.prices = rawWishlistItem.prices.map(rawPrice => this.#priceService.createPrice(rawPrice))
        return this.#wishlistItemFactory.createWishlist(rawWishlistItem)
    }
}
