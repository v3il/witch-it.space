import { filtersActions, filtersMutations, filtersState } from '@/shared/filters/index.js'

export { filtersState, filtersActions, filtersMutations } from '@/shared/filters'

export const state = () => ({
    ...filtersState(),
    profiles: []
})

export const getters = {
    filteredProfiles: (state, getters, rootState) => {
        return []

        // const filters = rootState.filters.filters
        // return state.items.filter(item => itemsService.checkItem(item, filters))
    },

    sortedProfiles: (state, getters, rootState) => {
        return []

        // const sorts = rootState.filters.sorts
        //
        // return Array.from(getters.filteredItems).sort((a, b) => {
        //     return itemsService.compareItems(a, b, sorts)
        // })
    }
}

export const actions = {
    ...filtersActions,

    fetchProfiles ({ commit }) {
        // return this.$axios.$get('/api/items')
        //     .then(({ items }) => {
        //         commit('SET_ITEMS', items)
        //         this.$itemsService.setItems(items)
        //     })
        //     .catch(console.error)
    }
}

export const mutations = {
    ...filtersMutations,

    SET_PROFILES (state, profiles) {
        state.profiles = profiles // .map(profile => Object.freeze(profile))
    }
}
