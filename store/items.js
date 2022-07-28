export const state = () => ({
    items: {}
})

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
