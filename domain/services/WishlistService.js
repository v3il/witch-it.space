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

    updateWishlistItem (offerModel, updatedData) {
        updatedData.prices = updatedData.rawPrices.map(rawPrice => this.#priceService.createPrice(rawPrice))
        offerModel.update(updatedData)
    }

    createNewWishlistItem (item) {
        return this.#wishlistItemFactory.createWishlist({
            item,
            prices: [this.#priceService.createDefaultPrice()]
        })
    }

    async saveWishlist (wishlistItems) {
        const changedOffersData = []

        wishlistItems.forEach((offerModel) => {
            if (offerModel.isNew || offerModel.hasChanges) {
                changedOffersData.push(offerModel.getData())
            }
        })

        if (!wishlistItems.length) {
            return { created: [], updated: [] }
        }

        try {
            const { created, updated } = await this.#axiosInstance.$post('/api/wishlist/manage', {
                wishlist: changedOffersData
            })

            console.error(created, updated)

            return { error: null, created, updated }
        } catch (e) {
            return { error: e.message }
        }
    }

    async removeFromWishlist (wishlistItems) {
        const entityIds = wishlistItems.reduce((ids, wishlistItem) => {
            if (wishlistItem.id) {
                ids.push(wishlistItem.id)
            }

            return ids
        }, [])

        try {
            const { removed } = await this.#axiosInstance.$post('/api/wishlist/remove', { entityIds })
            return { removed, entityIds, error: null }
        } catch (e) {
            return { error: e.message }
        }
    }
}
