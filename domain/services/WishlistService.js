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

    createWishlistItem ({ wishlistItem }) {
        wishlistItem.prices = wishlistItem.rawPrices.map(rawPrice => this.#priceService.createPrice(rawPrice))
        wishlistItem.item = this.#itemsService.getById(wishlistItem.itemId)
        return this.#wishlistItemFactory.createWishlist(wishlistItem)
    }

    createNewWishlistItem (item) {
        return this.#wishlistItemFactory.createWishlist({
            item,
            prices: [this.#priceService.createDefaultPrice()]
        })
    }

    async saveWishlist (wishlistItems) {
        const data = wishlistItems.map(wi => ({
            id: wi.id,
            itemId: wi.item.id,
            rawPrices: wi.prices.map(p => ({
                id: p.id,
                priceType: p.priceType,
                itemId: p.item1Id,
                itemCount: p.item1Count,
                itemId2: p.item2Id,
                itemCount2: p.item2Count
            }))
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

    async removeFromWishlist (ids) {
        // const data = wishlistItems.map(wi => ({
        //     id: wi.id,
        //     itemId: wi.item.id,
        //     rawPrices: wi.prices.map(p => ({
        //         id: p.id,
        //         priceType: p.priceType,
        //         itemId: p.item1Id,
        //         itemCount: p.item1Count,
        //         itemId2: p.item2Id,
        //         itemCount2: p.item2Count
        //     }))
        // }))

        console.error('Delete', ids, ids.length)

        try {
            await this.#axiosInstance.post('/api/wishlist/remove', {
                ids
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
