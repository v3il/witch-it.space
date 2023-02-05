export const useItemsStore = defineStore('items', {
    state: () => ({
        items: []
    }),

    getters: {
        itemsCount: state => state.items.length
    },

    actions: {
        async fetchItems () {
            const { data } = await useFetch('/api/items/fetch')

            this.items = data.value.items
        }
    }
})
