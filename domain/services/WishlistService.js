import { Offer } from '@/domain/models/index.js'
import { getFiltersFromRoute, getObjectsDiff, getSortFromRoute } from '@/utils/index.js'
import { OffersScheme } from '@/domain/models/schemes/index.js'

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
            const { wishlist } = await this.#axiosInstance.$get(`/api/wishlist?userId=${userId}`)
            const offers = wishlist.map(offer => Offer.create(offer))
            return { error: null, offers }
        } catch (e) {
            return { error: e.message, offers: [] }
        }
    }

    getFilters (route) {
        return getFiltersFromRoute(route, OffersScheme.getDefaultFilters())
    }

    getChangedFilters (filters) {
        return getObjectsDiff(OffersScheme.getDefaultFilters(), filters)
    }

    getSorts (route) {
        return getSortFromRoute(route, OffersScheme.getDefaultSorts(), OffersScheme.getAvailableSorts())
    }

    getChangedSorts (sorts) {
        return getObjectsDiff(OffersScheme.getDefaultSorts(), sorts)
    }

    // ====================================

    createWishlistItem ({ wishlistItem }) {
        console.log(111, wishlistItem.rawModel)

        return Offer.create(wishlistItem.rawModel)

        // wishlistItem.prices = wishlistItem.rawPrices.map(rawPrice => this.#priceService.createPrice(rawPrice))
        // wishlistItem.item = this.#itemsService.getById(wishlistItem.itemId)
        // return this.#wishlistItemFactory.createWishlist(wishlistItem)
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
            console.log(offerModel.isNew, offerModel.hasChanges)

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

    async setMassPrice (offers, priceModels) {
        const offerIds = offers.map(offer => offer.id)
        const prices = priceModels.map(priceModel => priceModel.getData())

        try {
            const { updated } = await this.#axiosInstance.$post('/api/wishlist/set_mass_price', {
                offerIds,
                prices
            })

            // console.error(created, updated)

            return { error: null, updated }
        } catch (e) {
            return { error: e.message }
        }
    }

    async massCreate (offers2) {
        const off = offers2.map(o => o.getData())

        try {
            const { offers } = await this.#axiosInstance.$post('/api/wishlist/mass_create', {
                offers: off
            })

            // console.error(created, updated)

            return { error: null, offers }
        } catch (e) {
            return { error: e.message }
        }
    }

    async removeFromWishlist (wishlistItems) {
        const offerIds = wishlistItems.reduce((ids, wishlistItem) => {
            if (wishlistItem.id) {
                ids.push(wishlistItem.id)
            }

            return ids
        }, [])

        try {
            const { removed } = await this.#axiosInstance.$post('/api/wishlist/remove', { offerIds })
            return { removed, offerIds, error: null }
        } catch (e) {
            return { error: e.message }
        }
    }

    getOffersList (tradableItems, wishlistOffers = []) {
        const existingItemIds = wishlistOffers.map(offer => offer.itemId)
        const nonWishlistItems = tradableItems.filter(item => !existingItemIds.includes(item.id))

        const newOffers = nonWishlistItems.map(item => Offer.create({ item }))
        const existingOffers = wishlistOffers.map(offer => Offer.create(offer))

        return { newOffers, existingOffers }
    }
}
