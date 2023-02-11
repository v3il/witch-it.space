import { SortOrders } from '@/shared/items'
import { BasicFilters } from '~/domain/models/filters/BasicFilters'

export class ProfilesFilters extends BasicFilters {
    constructor () {
        super({
            defaultFilter: { query: '' },
            defaultSort: { sortBy: 'marketSize', order: SortOrders.DESC },
            availableSorts: ['marketSize', 'name', 'wishlistSize']
        })
    }
}
