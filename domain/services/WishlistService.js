import { SortOrders } from '@/shared/items/index.js'

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

    checkOffer (offer, filters) {
        const { item } = offer
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

    compareOffers (a, b, sorts) {
        const { sortBy, order } = sorts
        const isAsc = order === SortOrders.ASC
        const firstItem = isAsc ? a.item : b.item
        const secondItem = isAsc ? b.item : a.item

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
