export const useFiltersStore = defineStore({
    id: 'filter-store',
    state: () => {
        return {
            filtersList: ['youtube', 'twitch']
        }
    },
    actions: {
        update2 () {
            this.filtersList.push('1111')
        }
    },
    getters: {
        filtersList1: state => state.filtersList
    }
})
