import { Wishlist } from '@/store'
import { wishlistService } from '@/domain/index.js'

export const state = () => ({
    offers: [],

    filters: {
        query: '',
        rarities: [],
        slots: [],
        events: [],
        hideRecipes: true
    },

    sorts: {
        sortBy: 'rarity',
        order: 'desc'
    }
})

export const actions = {
    async fetchWishlist ({ commit }, userId) {
        const { offers } = await this.$wishlistService.fetch(userId)
        commit('SET_OFFERS', offers)
    }
}

export const mutations = {
    SET_OFFERS (state, offers) {
        state.offers = offers
    },

    SET_FILTERS (state, filters) {
        state.filters = filters
    }
}
