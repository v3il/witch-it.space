export const validatePassword = (password) => {
    if (!password) {
        return 'Error_InvalidPassword'
    }

    const trimmedPassword = String(password).trim()

    if (trimmedPassword.length < 6) {
        return 'Error_InvalidPassword'
    }

    return null
}
