export const validatePassword = (password) => {
    const trimmedPassword = password.trim()

    if (trimmedPassword.length < 6) {
        return 'Error_InvalidPassword'
    }

    return null
}
