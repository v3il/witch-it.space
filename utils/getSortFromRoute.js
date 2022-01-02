const SORT_ORDERS = ['asc', 'desc']

export const getSortFromRoute = (route, sortParams) => {
    const { query } = route
    const { sortBy, order } = query

    return {
        order: SORT_ORDERS.includes(order) ? order : SORT_ORDERS[0],
        sortBy: sortParams[sortBy] ? sortBy : Object.values(sortParams)[0]
    }
}
