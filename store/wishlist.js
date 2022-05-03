import { isEqual } from 'lodash'
import { OffersScheme } from '@/domain/models/schemes'
import { getObjectsDiff } from '@/utils/index.js'
import { Offer } from '@/domain/models/index.js'
import { itemsService, wishlistService } from '@/domain/index.js'
import { SortOrders } from '@/shared/items/index.js'
import { WishlistTabs } from '@/domain/models/tabs/index.js'

export const state = () => ({
    offerModels: [],
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
    selectedEntities: (state, getters) => getters.isMyWishlistMode ? state.selectedOffers : state.selectedNonWishlistItems,
    hasSelectedEntities: (state, getters) => getters.selectedEntities.length > 0,

    filteredOfferModels: (state) => {
        const filters = state.filters
        return state.offerModels.filter(offerModel => wishlistService.checkItem(offerModel.item, filters))
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

    nonWishlistItems (state) {
        const tradableItems = itemsService.getTradableItems()
        const itemsInWishlistIds = state.offerModels.map(offer => offer.item.id)

        return tradableItems.filter(item => !itemsInWishlistIds.includes(item.id))
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
    storeOffers ({ commit }, offers) {
        commit('CONVERT_OFFERS', offers)
    },

    getInitialFilters ({ commit }, route) {
        const filters = this.$wishlistService.getFilters(route)
        commit('SET_FILTERS', filters)
    },

    getInitialSorts ({ commit }, route) {
        const sorts = this.$wishlistService.getSorts(route)
        commit('SET_SORTS', sorts)
    },

    updateFilters ({ commit, state }, changedFilters) {
        const newFilters = { ...state.filters, ...changedFilters }

        if (!isEqual(state.filters, newFilters)) {
            commit('SET_FILTERS', newFilters)
        }
    },

    updateSorts ({ commit }, sorts) {
        commit('SET_SORTS', sorts)
    },

    updateOrderBy ({ commit }, orderBy) {
        commit('UPDATE_ORDER_BY', orderBy)
    },

    toggleOrder ({ commit, state }) {
        commit('TOGGLE_ORDER', state.sorts.order === SortOrders.ASC ? SortOrders.DESC : SortOrders.ASC)
    },

    updateFilter ({ commit }, prop) {
        commit('UPDATE_FILTER', prop)
    },

    resetFilter ({ commit }, propName) {
        commit('RESET_FILTER', propName)
    },

    resetSorts ({ commit }) {
        commit('RESET_SORTS')
    },

    resetSortsFilters ({ commit }) {
        commit('RESET_FILTERS')
        commit('RESET_SORTS')
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
    },

    clearSelectedEntities ({ commit, getters }) {
        commit(getters.isMyWishlistMode ? 'CLEAR_SELECTED_OFFERS' : 'CLEAR_SELECTED_ITEMS')
    },

    async removeOffers ({ commit, state }, offers) {
        const offersList = Array.isArray(offers) ? offers : [offers]
        const offerIds = offersList.map(offer => offer.id)
        const { removed, error } = await wishlistService.removeOffers(offerIds)

        if (removed) {
            offersList.forEach(offer => commit('DESELECT_OFFER', offer))
            commit('REMOVE_OFFERS', offerIds)
        }

        return { removed, error }
    },

    async createOffers ({ commit }, { items, prices }) {
        const itemsList = Array.isArray(items) ? items : [items]
        const offersList = itemsList.map((item) => {
            const pricesClone = prices.map(price => price.clone())
            const offer = Offer.create({ itemId: item.id })
            offer.setPrices(pricesClone)
            return offer
        })

        const { created, error } = await wishlistService.massCreate(offersList)

        if (!error) {
            items.forEach(item => commit('DESELECT_ITEM', item))
            commit('ADD_OFFERS', created)
        }

        return { created: offersList.length, error }
    },

    async setMassPrices ({ commit, state }, { offers, prices }) {
        const offersList = Array.isArray(offers) ? offers : [offers]
        const { updated, error } = await wishlistService.setMassPrice(offersList, prices)

        if (!error) {
            console.time('Set mass2')

            commit('DESELECT_OFFERS', offers)
            commit('UPDATE_OFFERS', updated)

            console.timeEnd('Set mass2')

            // console.time('Set mass2')
            // const ids = offersList.map(offer => offer.id)
            // const off = state.offerModels.filter(offerModel => ids.includes(offerModel.id))
            // console.timeEnd('Set mass2')
            // // console.log(off)
            //
            // console.time('Set mass2')
            // commit('SET_PRICES', { offers: off, prices })
            //
            // console.timeEnd('Set mass2')
        }

        return { created: offersList.length, error }
    }
}

export const mutations = {
    CONVERT_OFFERS (state, offers) {
        state.offerModels = offers.map(offer => Offer.create(offer))
    },

    ADD_OFFERS (state, offers) {
        state.offerModels.push(...offers.map(offer => Offer.create(offer)))
    },

    SET_FILTERS (state, filters) {
        state.filters = filters
    },

    SET_SORTS (state, sorts) {
        state.sorts = sorts
    },

    UPDATE_ORDER_BY (state, orderBy) {
        state.sorts.sortBy = orderBy
    },

    TOGGLE_ORDER (state, order) {
        state.sorts.order = order
    },

    UPDATE_FILTER (state, prop) {
        state.filters = { ...state.filters, ...prop }
    },

    RESET_FILTER (state, propName) {
        state.filters[propName] = state.defaultFilters[propName]
    },

    RESET_FILTERS (state) {
        state.filters = { ...state.defaultFilters }
    },

    RESET_SORTS (state) {
        state.sorts = { ...state.defaultSorts }
    },

    SELECT_OFFER (state, offer) {
        state.selectedOffers.push(offer)
    },

    DESELECT_OFFER (state, offerToRemove) {
        state.selectedOffers = state.selectedOffers.filter(offer => offer !== offerToRemove)
    },

    DESELECT_OFFERS (state, offersToRemove) {
        state.selectedOffers = state.selectedOffers.filter(offer => !offersToRemove.includes(offer))
    },

    SELECT_ITEM (state, item) {
        state.selectedNonWishlistItems.push(item)
    },

    DESELECT_ITEM (state, itemToRemove) {
        state.selectedNonWishlistItems = state.selectedNonWishlistItems.filter(item => item !== itemToRemove)
    },

    TOGGLE_MODE (state, mode) {
        state.mode = mode
    },

    CLEAR_SELECTED_OFFERS (state) {
        state.selectedOffers = []
    },

    CLEAR_SELECTED_ITEMS (state) {
        state.selectedNonWishlistItems = []
    },

    REMOVE_OFFERS (state, offersToRemoveIds) {
        state.offerModels = state.offerModels.filter(offer => !offersToRemoveIds.includes(offer.id))
    },

    SET_PRICES (state, { offers, prices }) {
        offers.forEach((offer) => {
            console.time('Set mass22')
            const ps = prices.map(price => price.clone())
            offer.setPrices(ps)
            console.timeEnd('Set mass22')
        })
    },

    UPDATE_OFFERS (state, offers) {
        const ids = offers.map(offer => offer.id)
        const copies = offers.map(offer => Offer.create(offer))

        state.offerModels = state.offerModels.filter(offer => !ids.includes(offer.id))
        state.offerModels.push(...copies)
    }
}
