import { getFiltersFromRoute, getSortFromRoute } from '@/utils/index.js'
import { OffersScheme } from '@/domain/models/schemes'

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

    fetch (userId) {
        return this.#axiosInstance.$get(`/api/wishlist?userId=${userId}`)
            .catch(error => ({
                error: { message: error.message }
            }))
    }

    getFilters (route) {
        return getFiltersFromRoute(route, OffersScheme.getDefaultFilters())
    }

    getSorts (route) {
        return getSortFromRoute(route, OffersScheme.getDefaultSorts(), OffersScheme.getAvailableSorts())
    }

    checkItem (item, filters) {
        console.error(filters)

        const lowerCasedQuery = filters.query.toLowerCase()

        if (lowerCasedQuery && !item.name.toLowerCase().includes(lowerCasedQuery)) {
            return false
        }

        if (filters.rarities.length && !filters.rarities.includes(item.rarity)) {
            return false
        }

        if (filters.character && item.character !== filters.character) {
            return false
        }

        if (filters.events.length && !filters.events.includes(item.event)) {
            return false
        }

        if (filters.slots.length && !filters.slots.includes(item.slot)) {
            return false
        }

        return true
    }

    compareItems (firstItem, secondItem, sorts) {
        console.error(sorts)

        const { sortBy } = sorts

        switch (sortBy) {
        case 'rarity':
            if (firstItem.quality === secondItem.quality) {
                if (firstItem.isRecipe === secondItem.isRecipe) {
                    return secondItem.id - firstItem.id
                }

                return +secondItem.isRecipe - +firstItem.isRecipe
            }

            return firstItem.quality - secondItem.quality
        case 'name':
            return firstItem.name.localeCompare(secondItem.name)
        }

        return 0
    }

    removeOffers (offerIds) {
        return this.#axiosInstance.$post('/api/wishlist/remove', { offerIds })
    }

    massCreate (offers) {
        const offersData = offers.map(offer => offer.buildOutput())
        return this.#axiosInstance.$post('/api/wishlist/mass_create', { offers: offersData })
    }

    setMassPrice (offers, priceModels) {
        const offerIds = offers.map(offer => offer.id)
        const prices = priceModels.map(priceModel => priceModel.buildOutput())

        return this.#axiosInstance.$post('/api/wishlist/mass_update', { offerIds, prices })
    }
}
