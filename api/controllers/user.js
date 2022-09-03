import { BadRequest, NotFound } from '@curveball/http-errors'
import joi from 'joi'
import { translateText } from '../util'
import { config, Cookies } from '../../shared'
import { userService } from '../services'

const getCurrentUser = (request, response) => {
    const { user } = request
    const parsedUser = user ? user.getPublicData() : null

    response.send({ user: parsedUser })
}

const changeUserLocale = (request, response) => {
    // const { locale } = request.body
    // const isSupportedLocale = config.AVAILABLE_LOCALES.includes(locale)
    //
    // if (!isSupportedLocale) {
    //     throw new BadRequest(translateText('Error_LocaleIsNotSupported', request.locale))
    // }
    //
    // const { user } = request
    // const user = await userService.getById(id)

    // if (!user) {
    //     throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    // }

    // await user.update({
    //     locale
    // })

    response.sendStatus(200)
}

const changeUserTheme = (request, response) => {
    // const { theme } = request.body
    // const isSupportedTheme = config.AVAILABLE_THEMES.includes(theme)
    //
    // if (!isSupportedTheme) {
    //     throw new BadRequest(translateText('Error_ThemeIsNotSupported', request.locale))
    // }
    //
    // const { id } = request.user
    // const user = await userService.getById(id)
    //
    // if (!user) {
    //     throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    // }
    //
    // await user.update({
    //     theme
    // })

    response.sendStatus(200)
}

const disconnectSocial = (request, response) => {
    const { socialName } = request.body
    const schema = joi.string().required().allow('steam', 'discord', 'google')
    const { error } = schema.validate(socialName)

    if (error) {
        return response.emitBadRequest()
    }

    userService.disconnectSocial(request.user, socialName)
        .then(() => response.send({ success: true }))
        .catch(() => response.emitBadRequest())
}

const updateSettings = async (request, response) => {
    const {
        password,
        displayName,
        steamTradeLink,
        isGuardProtected,
        avatarId,
        switchRarities,
        tradeWithGuardedOnly,
        discountAvailable,
        tradeDuplicatesOnly,
        wishlistNote,
        marketNote
    } = request.body

    const passwordSchema = joi.string().min(6)
    const displayNameSchema = joi.string().required().min(2).max(15)
    const steamTradeURLSchema = joi.string().required().pattern(/^https:\/\/steamcommunity.com\/tradeoffer\/new.*$/)
    const avatarIdSchema = joi.number().integer().required().min(1).max(11)

    const errors = [
        displayNameSchema.validate(displayName),
        steamTradeURLSchema.validate(steamTradeLink),
        avatarIdSchema.validate(avatarId)
    ]

    if (password) {
        errors.push(passwordSchema.validate(password))
    }

    if (errors.some(result => !!result.error)) {
        return response.emitBadRequest()
    }

    const updateData = {
        displayName,
        steamTradeLink,
        avatarId,
        isGuardProtected: !!isGuardProtected,
        switchRarities: !!switchRarities,
        tradeWithGuardedOnly: !!tradeWithGuardedOnly,
        discountAvailable: !!discountAvailable,
        tradeDuplicatesOnly: !!tradeDuplicatesOnly,
        wishlistNote,
        marketNote
    }

    if (password) {
        updateData.password = await userService.encryptPassword(password)
    }

    userService.updateUserSettings(request.user, updateData)
        .then(() => response.send({ success: true }))
        .catch((e) => {
            console.error(e)
            response.emitBadRequest()
        })
}

const updateAccountSettings = (request, response) => {
    const { displayName, steamTradeLink, isGuardProtected, avatarId } = request.body

    const displayNameSchema = joi.string().required().min(2).max(15)
    const steamTradeURLSchema = joi.string().required().pattern(/^https:\/\/steamcommunity.com\/tradeoffer\/new.*$/)
    const avatarIdSchema = joi.number().integer().required().min(1).max(11)
    const isGuardProtectedSchema = joi.boolean().required()

    const errors = [
        displayNameSchema.validate(displayName),
        steamTradeURLSchema.validate(steamTradeLink),
        avatarIdSchema.validate(avatarId),
        isGuardProtectedSchema.validate(isGuardProtected)
    ]

    if (errors.some(result => !!result.error)) {
        return response.emitBadRequest()
    }

    const updateData = {
        displayName,
        steamTradeLink,
        avatarId,
        isGuardProtected
    }

    userService.updateUserSettings(request.user, updateData)
        .then(() => response.send({ success: true }))
        .catch(() => response.emitBadRequest())
}

const updateSecuritySettings = async (request, response) => {
    const { password } = request.body

    const passwordSchema = joi.string().min(6)

    const errors = [
        passwordSchema.validate(password)
    ]

    if (errors.some(result => !!result.error)) {
        return response.emitBadRequest()
    }

    const encryptedPassword = await userService.encryptPassword(password)

    userService.updateUserSettings(request.user, { password: encryptedPassword })
        .then(() => response.send({ success: true }))
        .catch((e) => {
            console.error(e)
            response.emitBadRequest()
        })
}

const toggleProfile = (request, response) => {
    const { isPublic } = request.body
    const schema = joi.bool().required()
    const { error } = schema.validate(isPublic)

    if (error) {
        return response.emitBadRequest()
    }

    userService.toggleProfileVisibility(request.user, isPublic)
        .then(() => response.send({ success: true }))
        .catch(() => response.emitBadRequest())
}

const removeProfile = (request, response) => {
    userService.deleteUser(request.user)
        .then(() => {
            response.cookie(Cookies.TOKEN, '', { expires: new Date(0) })
            response.send({ success: true })
        })
        .catch(() => response.emitBadRequest())
}

const getById = async (request, response) => {
    const { id } = request.params

    if (!id) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const user = await userService.getById(id)

    if (!user) {
        throw new NotFound(translateText('Error_UserNotFound', request.locale))
    }

    response.send({ profile: userService.toObject(user) })
}

const userController = {
    getCurrentUser,
    changeUserLocale,
    changeUserTheme,
    disconnectSocial,
    updateSettings,
    updateAccountSettings,
    updateSecuritySettings,
    toggleProfile,
    removeProfile,
    getById
}

export { userController }
