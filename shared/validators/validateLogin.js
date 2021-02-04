export const validateLogin = (login) => {
    const trimmedLogin = login.trim()

    if (trimmedLogin.length < 4) {
        return 'Error_LoginIsTooShort'
    }

    return null
}
