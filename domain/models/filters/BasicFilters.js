import { getObjectsDiff } from '@/utils/index.js'
import { SortOrders } from '@/shared/items/index.js'

export class BasicFilters {
    #defaultFilterParams
    #defaultSortParams
    #availableSorts

    constructor ({
        route,
        defaultFilterParams,
        defaultSortParams,
        availableSorts
    }) {
        this.#defaultFilterParams = defaultFilterParams
        this.#defaultSortParams = defaultSortParams
        this.#availableSorts = availableSorts
        this.filters = this.#getFilterParamsFromURL(route)
        this.sorts = this.#getSortParamsFromURL(route)
    }

    get changedFilters () {
        return getObjectsDiff(this.#defaultFilterParams, this.filters)
    }

    get changedSorts () {
        return getObjectsDiff(this.#defaultSortParams, this.sorts)
    }

    toggleOrder () {
        this.sorts.sortBy = this.sorts.sortBy === SortOrders.ASC ? SortOrders.DESC : SortOrders.ASC
        this.#updateURL()
    }

    updateOrderBy (orderBy) {
        this.sorts.order = orderBy
        this.#updateURL()
    }

    mergeFilters (changedFilters) {
        this.filters = { ...this.filters, ...changedFilters }
        this.#updateURL()
    }

    resetFiltersParam (propName) {
        this.filters = { ...this.filters, [propName]: this.#defaultFilterParams[propName] }
        this.#updateURL()
    }

    resetFilters () {
        this.filters = { ...this.#defaultFilterParams }
        this.#updateURL()
    }

    resetSorts () {
        this.sorts = { ...this.#defaultSortParams }
        this.#updateURL()
    }

    #updateURL () {
        const currentURL = new URL(location.href)
        const searchParams = new URLSearchParams({ ...this.changedSorts, ...this.changedFilters })
        const newURL = currentURL.pathname + (searchParams ? `?${searchParams.toString()}` : '')

        window.history.replaceState({}, '', newURL)
    }

    #getFilterParamsFromURL (route) {
        const { query } = route

        return Object.entries(this.#defaultFilterParams).reduce((filters, [key, value]) => {
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
    }

    #getSortParamsFromURL (route) {
        const { query } = route
        const { sortBy, order } = query

        return {
            order: [SortOrders.ASC, SortOrders.DESC].includes(order) ? order : this.#defaultSortParams.order,
            sortBy: this.#availableSorts.includes(sortBy) ? sortBy : this.#defaultSortParams.sortBy
        }
    }
}
