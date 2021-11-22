import { isEqual } from 'lodash'

export const getObjectsDiff = (original, objectToCheck) => {
    const diff = {}

    Object.entries(original).forEach(([key, value]) => {
        if (!isEqual(value, objectToCheck[key])) {
            diff[key] = objectToCheck[key]
        }
    })

    return diff
}
