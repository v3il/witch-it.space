import joi from 'joi'

export const useValidators = () => {
    const validateLogin = (login) => {
        const loginSchema = joi.string().min(4).required()
        const { error } = loginSchema.validate(login)

        return !error
    }

    const validatePassword = (password) => {
        const passwordSchema = joi.string().min(6).required()
        const { error } = passwordSchema.validate(password)

        return !error
    }

    return { validateLogin, validatePassword }
}
