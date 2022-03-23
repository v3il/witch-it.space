import { OffersScheme } from '@/domain/models/schemes/index.js'

export const state = () => ({
    offers: [],
    filters: OffersScheme.getDefaultFilters(),
    sorts: OffersScheme.getDefaultSorts()
})

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
    }
}
