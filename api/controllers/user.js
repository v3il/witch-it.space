import { BadRequest, NotFound } from '@curveball/http-errors'
import { translateText } from '../util'
import {
    config,
    Cookies,
    validateAvatarId,
    validateDisplayName,
    validatePassword,
    validateSteamTradeURL
} from '../../shared'
import { updateUserToken } from '../controllers/auth/signInUser'
import { userService } from '../services'

const getCurrentUser = (request, response) => {
    const { user } = request

    console.error(65656, user)

    const parsedUser = user ? user.getPublicData() : null

    response.send({ user: parsedUser })
}

const changeUserLocale = async (request, response) => {
    const { locale } = request.body
    const isSupportedLocale = config.AVAILABLE_LOCALES.includes(locale)

    if (!isSupportedLocale) {
        throw new BadRequest(translateText('Error_LocaleIsNotSupported', request.locale))
    }

    const { user } = request
    // const user = await userService.getById(id)

    // if (!user) {
    //     throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    // }

    await user.update({
        locale
    })

    response.sendStatus(200)
}

const changeUserTheme = async (request, response) => {
    const { theme } = request.body
    const isSupportedTheme = config.AVAILABLE_THEMES.includes(theme)

    if (!isSupportedTheme) {
        throw new BadRequest(translateText('Error_ThemeIsNotSupported', request.locale))
    }

    const { id } = request.user
    const user = await userService.getById(id)

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    await user.update({
        theme
    })

    response.sendStatus(200)
}

const disconnectSocial = async (request, response) => {
    const { social } = request.body
    const { id } = request.user
    const user = await userService.getById(id)

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    const prop = {
        steam: 'steamId',
        discord: 'discordId',
        google: 'googleId'
    }[social]

    if (!prop) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    await user.update({
        [prop]: ''
    })

    updateUserToken({ response, user })
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
        hideRecipes,
        wishlistNote,
        marketNote
    } = request.body

    const errors = []

    if (password) {
        errors.push(validatePassword(password))
    }

    errors.push(
        validateDisplayName(displayName),
        validateSteamTradeURL(steamTradeLink),
        validateAvatarId(avatarId)
    )

    const firstError = errors.find(error => error !== null)

    if (firstError) {
        throw new BadRequest(translateText(firstError, request.locale))
    }

    const { id } = request.user
    const user = await userService.getById(id, { excludeAttrs: false })

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
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
        hideRecipes: !!hideRecipes,
        wishlistNote,
        marketNote
    }

    if (password) {
        updateData.password = await userService.encryptPassword(password)
    }

    // await user.settings.update({
    //     switchRarities: !!switchRarities,
    //     tradeWithGuardedOnly: !!tradeWithGuardedOnly,
    //     discountAvailable: !!discountAvailable,
    //     tradeDuplicatesOnly: !!tradeDuplicatesOnly,
    //     hideRecipes: !!hideRecipes,
    //     wishlistNote,
    //     marketNote
    // })

    await user.update(updateData/*, {
        include: [
            UserSettings
        ]
    } */)

    updateUserToken({ response, user })
}

const toggleProfile = async (request, response) => {
    const { isPublic } = request.body
    const { id } = request.user
    const user = await userService.getById(id)

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    await user.update({
        isPublic: !!isPublic
    })

    updateUserToken({ response, user })
}

const removeProfile = async (request, response) => {
    const { id } = request.user
    const user = await userService.getById(id)

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    await user.destroy()
    response.cookie(Cookies.TOKEN, '', { expires: new Date(0) })
    request.user = null
    response.sendStatus(200)
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
    toggleProfile,
    removeProfile,
    getById
}

export { userController }
