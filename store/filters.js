import { clone } from 'lodash'
import { SortOrders } from '~/shared/items'
import { getObjectsDiff } from '~/utils'

function UPDATE_URL (state) {
    const route = useRoute()
    const router = useRouter()

    const changedFilters = getObjectsDiff(state.defaultFilter, state.filter)
    const changedSorts = getObjectsDiff(state.defaultSort, state.sort)

    router.replace({
        path: route.path,
        query: { ...changedSorts, ...changedFilters }
    })
}

export const useFiltersStore = defineStore('filters', {
    state: () => ({
        defaultFilter: {},
        defaultSort: {},
        filter: {},
        sort: {},
        availableSorts: []
    }),

    actions: {
        updateFilterProp (propName, value) {
            this.filter[propName] = value

            UPDATE_URL(this)
        },

        resetFilterProp (propName) {
            this.filter[propName] = this.defaultFilter[propName]
        },

        resetFilter () {
            this.filter = clone(this.defaultFilter)
        },

        resetSort () {
            this.sort = clone(this.defaultSort)
        },

        updateSortProp (propName, value) {
            this.sort[propName] = value
        },

        resetSortProp (propName) {
            this.sort[propName] = this.defaultSort[propName]
        },

        setDefaultState ({ defaultFilter, defaultSort, availableSorts }) {
            this.defaultFilter = defaultFilter
            this.defaultSort = defaultSort

            this.filter = clone(defaultFilter)
            this.sort = clone(defaultSort)

            this.availableSorts = availableSorts
        },

        updateStateFromQuery (query) {
            const router = useRouter()

            // console.log(router)

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
        }
    }
})
