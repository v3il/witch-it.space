import { OffersScheme } from '@/domain/models/schemes'
import { getObjectsDiff } from '@/utils/index.js'
import { Offer } from '@/domain/models/index.js'
import { itemsService, wishlistService } from '@/domain/index.js'
import { SortOrders } from '@/shared/items/index.js'
import { WishlistTabs } from '@/domain/models/tabs/index.js'

export const state = () => ({
    offers: [],
    defaultFilters: OffersScheme.getDefaultFilters(),
    filters: OffersScheme.getDefaultFilters(),
    defaultSorts: OffersScheme.getDefaultSorts(),
    sorts: OffersScheme.getDefaultSorts(),
    selectedOffers: [],
    selectedNonWishlistItems: [],
    mode: WishlistTabs.MY_WISHLIST
})

export const getters = {
    changedFilters: state => getObjectsDiff(state.defaultFilters, state.filters),
    isFiltersChanged: (state, getters) => Object.keys(getters.changedFilters).length > 0,
    changedSorts: state => getObjectsDiff(state.defaultSorts, state.sorts),
    isSortsChanged: (state, getters) => Object.keys(getters.changedSorts).length > 0,
    isMyWishlistMode: state => state.mode === WishlistTabs.MY_WISHLIST,
    isNonWishlistItemsMode: state => state.mode === WishlistTabs.NON_WISHLIST_ITEMS,

    offerModels: (state) => {
        return state.offers.map(offer => Offer.create(offer))
    },

    filteredOfferModels: (state, getters) => {
        const filters = state.filters
        return getters.offerModels.filter(offerModel => wishlistService.checkItem(offerModel.item, filters))
    },

    sortedOfferModels: (state, getters) => {
        const { order } = state.sorts
        const isAsc = order === SortOrders.ASC

        return Array.from(getters.filteredOfferModels).sort((a, b) => {
            const firstItem = isAsc ? a.item : b.item
            const secondItem = isAsc ? b.item : a.item

            return wishlistService.compareItems(firstItem, secondItem, state.sorts)
        })
    },

    nonWishlistItems (state, getters) {
        const tradableItems = itemsService.getTradableItems()
        const itemsInWishlist = getters.offerModels.map(offer => offer.item)

        return tradableItems.filter(item => !itemsInWishlist.includes(item))
    },

    filteredNonWishlistItems: (state, getters) => {
        const filters = state.filters
        return getters.nonWishlistItems.filter(item => wishlistService.checkItem(item, filters))
    },

    sortedNonWishlistItems: (state, getters) => {
        const { order } = state.sorts
        const isAsc = order === SortOrders.ASC

        return Array.from(getters.filteredNonWishlistItems).sort((a, b) => {
            const firstItem = isAsc ? a : b
            const secondItem = isAsc ? b : a

            return wishlistService.compareItems(firstItem, secondItem, state.sorts)
        })
    }
}

export const actions = {
    async fetchWishlist ({ commit }, userId) {
        const { offers } = await this.$wishlistService.fetch(userId)
        commit('SET_OFFERS', offers)
    },

    getInitialFilters ({ commit }, route) {
        const filters = this.$wishlistService.getFilters(route)
        commit('SET_FILTERS', filters)
    },

    getInitialSorts ({ commit }, route) {
        const sorts = this.$wishlistService.getSorts(route)
        commit('SET_SORTS', sorts)
    },

    updateFilters ({ commit }, filters) {
        commit('SET_FILTERS', filters)
    },

    updateSorts ({ commit }, sorts) {
        commit('SET_SORTS', sorts)
    },

    resetFilter ({ commit }, propName) {
        commit('RESET_FILTER', propName)
    },

    resetFilters ({ commit }) {
        commit('RESET_FILTERS')
    },

    toggleOffer ({ commit, state }, offer) {
        if (state.selectedOffers.includes(offer)) {
            return commit('DESELECT_OFFER', offer)
        }

        commit('SELECT_OFFER', offer)
    },

    toggleNonWishlistItem ({ commit, state }, item) {
        if (state.selectedNonWishlistItems.includes(item)) {
            return commit('DESELECT_ITEM', item)
        }

        commit('SELECT_ITEM', item)
    },

    toggleMode ({ commit }, mode) {
        commit('TOGGLE_MODE', mode)
    }
}

export const mutations = {
    SET_OFFERS (state, offers) {
        state.offers = offers
    },

    SET_FILTERS (state, filters) {
        state.filters = filters
    },

    SET_SORTS (state, sorts) {
        state.sorts = sorts
    },

    RESET_FILTER (state, propName) {
        state.filters[propName] = state.defaultFilters[propName]
    },

    RESET_FILTERS (state) {
        state.filters = { ...state.defaultFilters }
    },

    SELECT_OFFER (state, offer) {
        state.selectedOffers.push(offer)
    },

    DESELECT_OFFER (state, offerToRemove) {
        state.selectedOffers = state.selectedOffers.filter(offer => offer !== offerToRemove)
    },

    SELECT_ITEM (state, item) {
        state.selectedNonWishlistItems.push(item)
    },

    DESELECT_ITEM (state, itemToRemove) {
        state.selectedNonWishlistItems = state.selectedNonWishlistItems.filter(item => item !== itemToRemove)
    },

    TOGGLE_MODE (state, mode) {
        state.mode = mode
    }
}
