import { SortOrders } from '@/shared/items/index.js'

export class ItemsFiltersScheme {
    static #filtersScheme = {
        query: '',
        character: '',
        rarities: [],
        slots: [],
        events: [],
        hideRecipes: true
    }

    static #sortsScheme = {
        sortBy: 'rarity',
        order: SortOrders.DESC
    }

    static getDefaultFilters () {
        return this.#filtersScheme
    }

    static getDefaultSorts () {
        return this.#sortsScheme
    }

    static getAvailableSorts () {
        return ['rarity', 'name']
    }
}
