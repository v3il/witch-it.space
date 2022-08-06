import { SortOrders } from '@/shared/items/index.js'

export class ProfilesFiltersScheme {
    static #filtersScheme = {
        query: ''
    }

    static #sortsScheme = {
        sortBy: 'marketSize',
        order: SortOrders.DESC
    }

    static getDefaultFilters () {
        return this.#filtersScheme
    }

    static getDefaultSorts () {
        return this.#sortsScheme
    }

    static getAvailableSorts () {
        return ['marketSize', 'name', 'wishlistSize']
    }
}
