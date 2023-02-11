import { clone } from 'lodash'
import { SortOrders } from '~/shared/items'

export class BasicFilters {
    _defaultFilter
    _defaultSort

    _filter
    _sort

    _availableSorts

    constructor ({ defaultFilter, defaultSort, availableSorts }) {
        console.error(defaultFilter, defaultSort, availableSorts)

        this._defaultFilter = defaultFilter
        this._defaultSort = defaultSort

        this._filter = clone(defaultFilter)
        this._sort = clone(defaultSort)

        this._availableSorts = availableSorts
    }

    updateFilterProp (propName, value) {
        this._filter[propName] = value
    }

    resetFilterProp (propName) {
        this._filter[propName] = this._defaultFilter[propName]
    }

    resetFilter () {
        this._filter = clone(this._defaultFilter)
    }

    resetSort () {
        this._sort = clone(this._defaultSort)
    }

    updateSortProp (propName, value) {
        this._sort[propName] = value
    }

    resetSortProp (propName) {
        this._sort[propName] = this._defaultSort[propName]
    }

    updateState (query) {
        this._filter = this._getFilterFromQuery(query)
        this._sort = this._getSortFromQuery(query)
    }

    _getFilterFromQuery (query) {
        return Object.entries(this._defaultFilter).reduce((filters, [key, value]) => {
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

    _getSortFromQuery (query) {
        const { sortBy, order } = query

        return {
            order: SortOrders.isValid(order) ? order : this._defaultSort.order,
            sortBy: this._availableSorts.includes(sortBy) ? sortBy : this._defaultSort.sortBy
        }
    }

    toJSON () {
        return { ...this }
    }
}
