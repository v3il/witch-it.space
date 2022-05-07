import { BasicFilters } from './BasicFilters.js'
import { SortOrders } from '@/shared/items/index.js'

export class ItemsFilters extends BasicFilters {
    static create (route) {
        return new ItemsFilters(route)
    }

    constructor (route) {
        const defaultFilterParams = {
            query: '',
            character: '',
            rarities: [],
            slots: [],
            events: [],
            hideRecipes: true
        }

        const defaultSortParams = {
            sortBy: 'rarity',
            order: SortOrders.DESC
        }

        const availableSorts = ['rarity', 'name']

        super({ route, defaultFilterParams, defaultSortParams, availableSorts })
    }
}
