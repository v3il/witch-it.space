export const validateDisplayName = (displayName) => {
    const trimmedDisplayName = displayName.trim()

    if (trimmedDisplayName.length < 2 || trimmedDisplayName.length > 20) {
        return 'Error_WrongDisplayName'
    }

    return null
}
