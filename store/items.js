import { itemsService } from '@/domain/index.js'
import { filtersActions, filtersMutations, filtersState } from '@/shared/filters'

export const state = () => ({
    ...filtersState(),
    items: {}
})

export const getters = {
    filteredItems: (state) => {
        return state.items.filter(item => itemsService.checkItem(item, state.filters))
    },

    sortedItems: (state, getters) => {
        return Array.from(getters.filteredItems).sort((a, b) => {
            return itemsService.compareItems(a, b, state.sorts)
        })
    }
}

export const actions = {
    ...filtersActions,

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
    ...filtersMutations,

    SET_ITEMS (state, items) {
        state.items = items.map(item => Object.freeze(item))
    }
}
