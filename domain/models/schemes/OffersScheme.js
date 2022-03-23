export class OffersScheme {
    static #filtersScheme = {
        query: '',
        rarities: [],
        slots: [],
        events: [],
        hideRecipes: true
    }

    static #sortsScheme = {
        sortBy: 'rarity',
        order: 'desc'
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
