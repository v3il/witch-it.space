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

    createWishlistItem (rawWishlistItem) {
        rawWishlistItem.prices = rawWishlistItem.rawPrices.map(rawPrice => this.#priceService.createPrice(rawPrice))
        rawWishlistItem.item = this.#itemsService.getById(rawWishlistItem.itemId)
        return this.#wishlistItemFactory.createWishlist(rawWishlistItem)
    }

    createNewWishlistItem (item) {
        return this.#wishlistItemFactory.createWishlist({
            item,
            prices: []
        })
    }

    async saveWishlist (wishlistItems) {
        const data = wishlistItems.map(wi => ({
            id: wi.id,
            itemId: wi.item.id
        }))

        try {
            await this.#axiosInstance.post('/api/wishlist/manage', {
                wishlist: data
            })
            return {
                error: null
                // wishlist: data.wishlist
            }
        } catch (e) {
            return {
                error: e.message,
                wishlist: null
            }
        }
    }
}
