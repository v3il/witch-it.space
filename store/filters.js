import { clone } from 'lodash'
import { SortOrders } from '~/shared/items'
import { getObjectsDiff } from '~/utils'

export const useFiltersStore = defineStore('filters', {
    state: () => ({
        defaultFilter: {},
        defaultSort: {},
        filter: {},
        sort: {},
        availableSorts: [],
        isFiltersOpen: false
    }),

    actions: {
        updateFilterProp (propName, value) {
            this.filter[propName] = value
            this.updateUrl()
        },

        resetFilterProp (propName) {
            this.filter[propName] = this.defaultFilter[propName]
            this.updateUrl()
        },

        resetFilter () {
            this.filter = clone(this.defaultFilter)
            this.updateUrl()
        },

        resetSort () {
            this.sort = clone(this.defaultSort)
            this.updateUrl()
        },

        updateSortProp (propName, value) {
            this.sort[propName] = value
            this.updateUrl()
        },

        resetSortProp (propName) {
            this.sort[propName] = this.defaultSort[propName]
            this.updateUrl()
        },

        toggleOrder () {
            this.sort.order = this.sort.order === SortOrders.ASC ? SortOrders.DESC : SortOrders.ASC
            this.updateUrl()
        },

        mergeFilter (changedFilter) {
            this.filter = Object.assign(this.filter, changedFilter)
            this.updateUrl()
        },

        setDefaultState ({ defaultFilter, defaultSort, availableSorts }) {
            this.defaultFilter = defaultFilter
            this.defaultSort = defaultSort

            this.filter = clone(defaultFilter)
            this.sort = clone(defaultSort)

            this.availableSorts = availableSorts
        },

        updateStateFromRoute () {
            const route = useRoute()
            const query = route.query

            this.filter = Object.entries(this.defaultFilter).reduce((filters, [key, value]) => {
                const valueFromUrl = query[key]

                if (valueFromUrl === undefined || valueFromUrl === null) {
                    return { ...filters, [key]: value }
                }

                if (typeof value === 'boolean') {
                    return { ...filters, [key]: valueFromUrl === 'true' }
                }

                if (Array.isArray(value)) {
                    return { ...filters, [key]: valueFromUrl.split(',') }
                }

                return { ...filters, [key]: valueFromUrl }
            }, {})

            const { sortBy, order } = query

            this.sort = {
                order: SortOrders.isValid(order) ? order : this.defaultSort.order,
                sortBy: this.availableSorts.includes(sortBy) ? sortBy : this.defaultSort.sortBy
            }
        },

        updateUrl () {
            const route = useRoute()
            const router = useRouter()

            const changedFilters = getObjectsDiff(this.defaultFilter, this.filter)
            const changedSorts = getObjectsDiff(this.defaultSort, this.sort)

            router.replace({
                path: route.path,
                query: { ...changedSorts, ...changedFilters }
            })
        },

        openFilters () {
            this.isFiltersOpen = true
        },

        closeFilters () {
            this.isFiltersOpen = false
        },

        toggleFilters () {
            this.isFiltersOpen = !this.isFiltersOpen
        }
    }
})
