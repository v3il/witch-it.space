import { itemsService } from '@/domain/index.js'

export const state = () => ({
    items: {}
})

export const getters = {
    filteredItems: (state, getters, rootState) => {
        const filters = rootState.filters.filters
        return state.items.filter(item => itemsService.checkItem(item, filters))
    },

    sortedItems: (state, getters, rootState) => {
        const sorts = rootState.filters.sorts

        return Array.from(getters.filteredItems).sort((a, b) => {
            return itemsService.compareItems(a, b, sorts)
        })
    }
}

export const actions = {
    fetchItems ({ commit }) {
        return this.$axios.$get('/api/items')
            .then(({ items }) => {
                commit('SET_ITEMS', items)
                this.$itemsService.setItems(items)
            })
            .catch(console.error)
    }
}

export const mutations = {
    SET_ITEMS (state, items) {
        state.items = items.map(item => Object.freeze(item))
    }
}
