export const validateDisplayName = (displayName) => {
    if (!displayName) {
        return 'Error_WrongDisplayName'
    }

    const trimmedDisplayName = String(displayName).trim()

    if (trimmedDisplayName.length < 2 || trimmedDisplayName.length > 20) {
        return 'Error_WrongDisplayName'
    }

    return null
}
