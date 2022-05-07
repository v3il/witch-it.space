import { Offer } from '@/domain/models/index.js'
import { wishlistService } from '@/domain/index.js'
import { WishlistTabs } from '@/domain/models/tabs/index.js'

export const state = () => ({
    existingOffers: [],
    availableOffers: [],
    mode: WishlistTabs.MY_WISHLIST
})

export const getters = {
    selectedExistingOffers: state => state.existingOffers.filter(offer => offer.isSelected),
    selectedAvailableOffers: state => state.availableOffers.filter(offer => offer.isSelected),
    isMyWishlistMode: state => state.mode === WishlistTabs.MY_WISHLIST,
    isNonWishlistItemsMode: state => state.mode === WishlistTabs.NON_WISHLIST_ITEMS,
    selectedEntities: (state, getters) => getters.isMyWishlistMode ? getters.selectedExistingOffers : getters.selectedAvailableOffers,
    hasSelectedEntities: (state, getters) => getters.selectedEntities.length > 0,

    filteredOfferModels: (state, getters, rootState) => {
        const filters = rootState.filters.filters
        return state.existingOffers.filter(offer => wishlistService.checkOffer(offer, filters))
    },

    sortedOfferModels: (state, getters, rootState) => {
        const sorts = rootState.filters.sorts

        return Array.from(getters.filteredOfferModels).sort((a, b) => {
            return wishlistService.compareOffers(a, b, sorts)
        })
    },

    filteredNonWishlistItems: (state, getters, rootState) => {
        const filters = rootState.filters.filters
        return state.availableOffers.filter(offer => wishlistService.checkOffer(offer, filters))
    },

    sortedNonWishlistItems: (state, getters, rootState) => {
        const sorts = rootState.filters.sorts

        return Array.from(getters.filteredNonWishlistItems).sort((a, b) => {
            return wishlistService.compareOffers(a, b, sorts)
        })
    }
}

export const actions = {
    storeOffers ({ commit }, { existingOffers, availableOffers }) {
        commit('STORE_OFFERS', { existingOffers, availableOffers })
    },

    toggleOffer ({ commit, state }, offer) {
        commit('TOGGLE_OFFER', offer)
    },

    selectOffers ({ commit, getters }, { from, to }) {
        const offers = getters.isMyWishlistMode ? getters.sortedOfferModels : getters.sortedNonWishlistItems
        commit('SELECT_OFFERS', { from, to, offers })
    },

    toggleMode ({ commit }, mode) {
        commit('TOGGLE_MODE', mode)
    },

    clearSelectedEntities ({ commit, getters }) {
        const offers = getters.isMyWishlistMode ? getters.selectedExistingOffers : getters.selectedAvailableOffers
        commit('DESELECT_OFFERS', offers)
    },

    createOffers ({ commit }, { offers }) {
        return wishlistService.massCreate(offers).then(({ createdOffers }) => {
            commit('ADD_OFFERS', createdOffers)
            commit('REMOVE_AVAILABLE_OFFERS', offers)
            return { createdOffersSize: createdOffers.length }
        })
    },

    setMassPrices ({ commit, state }, { offers, prices }) {
        return wishlistService.setMassPrice(offers, prices).then(({ updatedOffers }) => {
            commit('UPDATE_OFFERS', updatedOffers)
            return { updatedOffersSize: updatedOffers.length }
        })
    },

    removeOffers ({ commit, state }, offers) {
        const offerIds = offers.map(offer => offer.id)

        return wishlistService.removeOffers(offerIds)
            .then((responseData) => {
                commit('REMOVE_OFFERS', offerIds)
                commit('ADD_AVAILABLE_OFFERS', offers)
                return responseData
            })
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

    ADD_AVAILABLE_OFFERS (state, offers) {
        state.availableOffers.push(...offers.map(offer => Offer.fromItem(offer.item)))
    },

    REMOVE_AVAILABLE_OFFERS (state, offers) {
        const itemIds = offers.map(offer => offer.item.id)
        state.availableOffers = state.availableOffers.filter(({ item }) => !itemIds.includes(item.id))
    },

    TOGGLE_OFFER (state, offer) {
        offer.isSelected = !offer.isSelected
    },

    SELECT_OFFERS (state, { from, to, offers }) {
        for (let index = from; index <= to; index++) {
            offers[index].isSelected = true
        }
    },

    DESELECT_OFFERS (state, offers) {
        offers.forEach(offer => offer.isSelected = false)
    }
}
