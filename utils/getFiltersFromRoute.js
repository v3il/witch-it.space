export const getFiltersFromRoute = (route, defaultFilters) => {
    const { query } = route

    return Object.entries(defaultFilters).reduce((filters, [key, value]) => {
        const valueFromUrl = query[key]

        if (valueFromUrl === undefined || valueFromUrl === null) {
            return { ...filters, [key]: value }
        }

        if (typeof value === 'boolean') {
            return { ...filters, [key]: valueFromUrl === 'true' }
        }

        if (Array.isArray(value)) {
            return { ...filters, [key]: Array.isArray(valueFromUrl) ? valueFromUrl : [valueFromUrl] }
        }

        return { ...filters, [key]: valueFromUrl }
    }, {})
}
