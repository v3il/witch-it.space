import { useFiltersStore } from '~/store/filters'

export const useFilters = () => {
    const filterStore = useFiltersStore()

    const filters = computed(() => filterStore.filter)
    const sorts = computed(() => filterStore.sort)
    const isFiltersOpen = computed(() => filterStore.isFiltersOpen)

    function openFilters () {
        filterStore.openFilters()
    }

    function closeFilters () {
        filterStore.closeFilters()
    }

    function toggleFilters () {
        filterStore.toggleFilters()
    }

    function update (changedFilters) {
        filterStore.mergeFilter(changedFilters)
    }

    function reset (propName) {
        filterStore.resetFilterProp(propName)
    }

    function updateOrderBy (orderBy) {
        filterStore.updateSortProp('sortBy', orderBy)
    }

    function toggleOrder () {
        filterStore.toggleOrder()
    }

    function resetSortParams () {
        filterStore.resetSort()
    }

    function fullReset () {
        filterStore.resetFilter()
        filterStore.resetSort()
        closeFilters()
    }

    return {
        filterStore,
        filters,
        sorts,
        isFiltersOpen,
        update,
        reset,
        updateOrderBy,
        toggleOrder,
        resetSortParams,
        fullReset,
        toggleFilters,
        closeFilters,
        openFilters
    }
}
