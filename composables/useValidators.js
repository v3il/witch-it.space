import joi from 'joi'

export const useValidators = () => {
    console.error(joi)

    const validateLogin = (login) => {
        const isValidType = typeof login === 'string'
        const isValidLength = login.trim().length > 4

        return isValidType && isValidLength
    }

    const validatePassword = (password) => {
        const isValidType = typeof password === 'string'
        const isValidLength = password.trim().length > 6

        return isValidType && isValidLength
    }

    return { validateLogin, validatePassword }
}
