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
        console.log('Prices', rawWishlistItem.prices)

        rawWishlistItem.prices2 = (rawWishlistItem.prices || []).map((rawPrice) => {
            console.log(6666, rawPrice)
            return this.#priceService.createPrice(rawPrice)
        })

        console.log('Prices2', rawWishlistItem.prices2)

        // console.error(222222, rawWishlistItem.prices1[0].item1Id)

        rawWishlistItem.item = this.#itemsService.getById(rawWishlistItem.itemId)
        return this.#wishlistItemFactory.createWishlist(rawWishlistItem)
    }

    createNewWishlistItem (rawWishlistItem) {
        const item = this.#itemsService.getById(rawWishlistItem.itemId)

        return this.#wishlistItemFactory.createWishlist({
            item,
            prices: []
        })
    }
}
