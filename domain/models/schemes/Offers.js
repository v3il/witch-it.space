export class Offers {
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

    static getFiltersScheme () {
        return this.#filtersScheme
    }

    static getSortsScheme () {
        return this.#sortsScheme
    }

    static getAvailableSorts () {
        return ['rarity', 'name']
    }
}
