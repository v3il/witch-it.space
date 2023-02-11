export const SortOrders = Object.freeze({
    ASC: 'asc',
    DESC: 'desc',

    isValid (order) {
        return order === this.ASC || order === this.DESC
    }
})
