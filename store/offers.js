import { Offer } from '@/domain/models/index.js'
import { wishlistService, marketService } from '@/domain/index.js'
import { ManageWishlistTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'
import { OfferTypes } from '@/shared/index.js'

export const state = () => ({
    existingOffers: [],
    availableOffers: [],
    mode: ManageWishlistTabs.MY_WISHLIST,
    offersType: OfferTypes.WISHLIST
})

export const getters = {
    selectedExistingOffers: state => state.existingOffers.filter(offer => offer.isSelected),
    selectedAvailableOffers: state => state.availableOffers.filter(offer => offer.isSelected),
    isMyWishlistMode: state => state.mode === ManageWishlistTabs.MY_WISHLIST,
    isNonWishlistItemsMode: state => state.mode === ManageWishlistTabs.NON_WISHLIST_ITEMS,
    selectedEntities: (state, getters) => getters.isMyWishlistMode ? getters.selectedExistingOffers : getters.selectedAvailableOffers,
    hasSelectedEntities: (state, getters) => getters.selectedEntities.length > 0,
    service: state => state.offersType === OfferTypes.MARKET ? marketService : wishlistService,

    filteredOfferModels: (state, getters, rootState) => {
        const filters = rootState.filters.filters
        return state.existingOffers.filter(offer => getters.service.checkOffer(offer, filters))
    },

    sortedOfferModels: (state, getters, rootState) => {
        const sorts = rootState.filters.sorts

        return Array.from(getters.filteredOfferModels).sort((a, b) => {
            return getters.service.compareOffers(a, b, sorts)
        })
    },

    filteredNonWishlistItems: (state, getters, rootState) => {
        const filters = rootState.filters.filters
        return state.availableOffers.filter(offer => getters.service.checkOffer(offer, filters))
    },

    sortedNonWishlistItems: (state, getters, rootState) => {
        const sorts = rootState.filters.sorts

        return Array.from(getters.filteredNonWishlistItems).sort((a, b) => {
            return getters.service.compareOffers(a, b, sorts)
        })
    }
}

export const actions = {
    setOffersType ({ commit }, type) {
        commit('SET_OFFERS_TYPE', type)
    },

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

    createOffers ({ commit, getters }, { offers }) {
        return getters.service.massCreate(offers).then(({ createdOffers }) => {
            commit('ADD_OFFERS', createdOffers)
            commit('REMOVE_AVAILABLE_OFFERS', offers)
            return { createdOffersSize: createdOffers.length }
        })
    },

    setMassPrices ({ commit, state, getters }, { offers, prices }) {
        return getters.service.setMassPrice(offers, prices).then(({ updatedOffers }) => {
            commit('UPDATE_OFFERS', updatedOffers)
            return { updatedOffersSize: updatedOffers.length }
        })
    },

    removeOffers ({ commit, state, getters }, offers) {
        const offerIds = offers.map(offer => offer.id)

        return getters.service.removeOffers(offerIds)
            .then((responseData) => {
                commit('REMOVE_OFFERS', offerIds)
                commit('ADD_AVAILABLE_OFFERS', offers)
                return responseData
            })
    }
}

export const mutations = {
    SET_OFFERS_TYPE (type) {
        state.offersType = type
    },

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
