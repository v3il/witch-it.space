import { isEqual } from 'lodash'
import { OffersScheme } from '@/domain/models/schemes'
import { getObjectsDiff } from '@/utils/index.js'
import { Offer } from '@/domain/models/index.js'
import { itemsService, wishlistService } from '@/domain/index.js'
import { SortOrders } from '@/shared/items/index.js'
import { WishlistTabs } from '@/domain/models/tabs/index.js'

export const state = () => ({
    existingOffers: [],
    availableOffers: [],

    defaultFilters: OffersScheme.getDefaultFilters(),
    filters: OffersScheme.getDefaultFilters(),
    defaultSorts: OffersScheme.getDefaultSorts(),
    sorts: OffersScheme.getDefaultSorts(),
    selectedOffers: [],
    selectedNonWishlistItems: [],
    mode: WishlistTabs.MY_WISHLIST
})

export const getters = {
    selectedExistingOffers: state => state.existingOffers.filter(offer => offer.isSelected),
    selectedAvailableOffers: state => state.availableOffers.filter(offer => offer.isSelected),

    changedFilters: state => getObjectsDiff(state.defaultFilters, state.filters),
    isFiltersChanged: (state, getters) => Object.keys(getters.changedFilters).length > 0,
    changedSorts: state => getObjectsDiff(state.defaultSorts, state.sorts),
    isSortsChanged: (state, getters) => Object.keys(getters.changedSorts).length > 0,
    isMyWishlistMode: state => state.mode === WishlistTabs.MY_WISHLIST,
    isNonWishlistItemsMode: state => state.mode === WishlistTabs.NON_WISHLIST_ITEMS,
    selectedEntities: (state, getters) => getters.isMyWishlistMode ? getters.selectedExistingOffers : getters.selectedAvailableOffers,
    hasSelectedEntities: (state, getters) => getters.selectedEntities.length > 0,

    filteredOfferModels: (state) => {
        const filters = state.filters
        return state.existingOffers.filter(offerModel => wishlistService.checkItem(offerModel.item, filters))
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

    filteredNonWishlistItems: (state) => {
        const filters = state.filters
        return state.availableOffers.filter(offerModel => wishlistService.checkItem(offerModel.item, filters))
    },

    sortedNonWishlistItems: (state, getters) => {
        const { order } = state.sorts
        const isAsc = order === SortOrders.ASC

        return Array.from(getters.filteredNonWishlistItems).sort((a, b) => {
            const firstItem = isAsc ? a.item : b.item
            const secondItem = isAsc ? b.item : a.item

            return wishlistService.compareItems(firstItem, secondItem, state.sorts)
        })
    }
}

export const actions = {
    storeOffers ({ commit }, { existingOffers, availableOffers }) {
        commit('STORE_OFFERS', { existingOffers, availableOffers })
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
        commit('TOGGLE_OFFER', offer)
    },

    toggleMode ({ commit }, mode) {
        commit('TOGGLE_MODE', mode)
    },

    clearSelectedEntities ({ commit, getters }) {
        const offers = getters.isMyWishlistMode ? getters.selectedExistingOffers : getters.selectedAvailableOffers
        commit('DESELECT_OFFERS', offers)
    },

    async createOffers ({ commit }, { offers }) {
        const { created, error } = await wishlistService.massCreate(offers)

        if (!error) {
            commit('ADD_OFFERS', created)
            commit('REMOVE_AVAILABLE_OFFERS', offers)
        }

        return { created: created.length, error }
    },

    async setMassPrices ({ commit, state }, { offers, prices }) {
        const { updated, error } = await wishlistService.setMassPrice(offers, prices)

        if (!error) {
            commit('UPDATE_OFFERS', updated)
        }

        return { updated: updated.length, error }
    },

    async removeOffers ({ commit, state }, offers) {
        const offerIds = offers.map(offer => offer.id)
        const { removed, error } = await wishlistService.removeOffers(offerIds)

        if (removed) {
            commit('REMOVE_OFFERS', offerIds)
            commit('ADD_AVAILABLE_OFFERS', offers)
        }

        return { removed, error }
    }
}

export const mutations = {
    STORE_OFFERS (state, { existingOffers, availableOffers }) {
        state.existingOffers = existingOffers
        state.availableOffers = availableOffers
    },

    ADD_OFFERS (state, offers) {
        state.existingOffers.push(...offers.map(offer => Offer.create(offer)))
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

    TOGGLE_MODE (state, mode) {
        state.mode = mode
    },

    REMOVE_OFFERS (state, offersToRemoveIds) {
        state.existingOffers = state.existingOffers.filter(offer => !offersToRemoveIds.includes(offer.id))
    },

    UPDATE_OFFERS (state, offers) {
        const ids = offers.map(offer => offer.id)
        const copies = offers.map(offer => Offer.create(offer))

        state.existingOffers = state.existingOffers.filter(offer => !ids.includes(offer.id))
        state.existingOffers.push(...copies)
    },

    TOGGLE_OFFER (state, offer) {
        offer.isSelected = !offer.isSelected
    },

    DESELECT_OFFERS (state, offers) {
        offers.forEach(offer => offer.isSelected = false)
    },

    ADD_AVAILABLE_OFFERS (state, offers) {
        state.availableOffers.push(...offers.map(offer => Offer.fromItem(offer.item)))
    },

    REMOVE_AVAILABLE_OFFERS (state, offers) {
        const itemIds = offers.map(offer => offer.item.id)
        state.availableOffers = state.availableOffers.filter(({ item }) => !itemIds.includes(item.id))
    }
}
