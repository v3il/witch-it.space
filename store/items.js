export const useItemsStore = defineStore('items', {
    state: () => ({
        items: []
    }),

    getters: {
        itemsCount: state => state.items.length
    },

    actions: {
        async fetchItems () {
            const { data } = await useFetch('/api/items/fetch', {
                headers: useRequestHeaders(['cookie'])
            })

            this.items = data.value.items
        }
    }
})
