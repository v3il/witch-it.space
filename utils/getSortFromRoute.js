const SORT_ORDERS = ['asc', 'desc']

export const getSortFromRoute = (route, defaultSort, sorts) => {
    const { query } = route
    const { sortBy, order } = query

    console.log(sorts)

    return {
        order: SORT_ORDERS.includes(order) ? order : defaultSort.order,
        sortBy: sorts.includes(sortBy) ? sortBy : defaultSort.sortBy
    }
}
