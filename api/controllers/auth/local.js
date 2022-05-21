import joi from 'joi'
import { userService } from '../../services'
import { signInUser } from './signInUser'

const login = async (request, response) => {
    const loginSchema = joi.string().min(4).required()
    const passwordSchema = joi.string().min(6).required()
    const { error: loginError } = loginSchema.validate(request.body.login)
    const { error: passwordError } = passwordSchema.validate(request.body.password)

    if (loginError || passwordError) {
        return response.emitBadRequest(request.$t('Error_NoUserWithLogin'))
    }

    const login = request.body.login.toString().trim()
    const password = request.body.password.toString().trim()
    const savedUser = await userService.getByLoginWithPassword(login)

    if (!savedUser) {
        return response.emitBadRequest(request.$t('Error_NoUserWithLogin'))
    }

    const isCorrectPassword = await userService.checkPasswords(password, savedUser.password)

    if (!isCorrectPassword) {
        return response.emitBadRequest(request.$t('Error_WrongPassword'))
    }

    signInUser({
        response,
        user: savedUser,
        isSocial: false
    })
}

const register = async (request, response) => {
    const loginSchema = joi.string().min(4).required()
    const passwordSchema = joi.string().min(6).required()
    const { error: loginError } = loginSchema.validate(request.body.login)
    const { error: passwordError } = passwordSchema.validate(request.body.password)

    if (loginError || passwordError) {
        return response.emitBadRequest()
    }

    const login = request.body.login.toString().trim()
    const password = request.body.password.toString().trim()
    const userWithSameLogin = await userService.getByLogin(login)

    if (userWithSameLogin) {
        return response.emitBadRequest(request.$t('Error_NotUniqueLogin'))
    }

    const encryptedPassword = await userService.encryptPassword(password)

    const user = await userService.createUser({
        login,
        displayName: login,
        password: encryptedPassword,
        locale: request.locale,
        theme: request.theme
    })

    signInUser({
        user,
        response,
        isSocial: false
    })
}

const localAuthController = {
    login,
    register
}

export { localAuthController }
