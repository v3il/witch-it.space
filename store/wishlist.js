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
    },

    getFilters ({ commit }, route) {
        const filters = this.$wishlistService.getFilters(route)
        commit('SET_FILTERS', filters)
    },

    getSorts ({ commit }, route) {
        const sorts = this.$wishlistService.getSorts(route)
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
