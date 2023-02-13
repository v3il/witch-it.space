import { SortOrders } from '~/shared/items'

export class ProfilesFilterScheme {
    static Sorts = {
        MARKET: 'market',
        WISHLIST: 'wishlist',
        NAME: 'name'
    }

    static getDefaultFilter () {
        return { query: '' }
    }

    static getDefaultSort () {
        return { sortBy: this.Sorts.MARKET, order: SortOrders.DESC }
    }

    static getAvailableSorts () {
        return [this.Sorts.MARKET, this.Sorts.WISHLIST, this.Sorts.NAME]
    }
}
