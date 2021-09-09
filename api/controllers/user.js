import { BadRequest, NotFound } from '@curveball/http-errors'
import { genSalt, hash } from 'bcrypt'
import { User } from '../models'
import { extractUserPublicData, translateText } from '../util'
import {
    config, Cookies,
    validateAvatarId,
    validateDisplayName,
    validatePassword,
    validateSteamTradeURL
} from '../../shared'
import { updateUserToken } from '../controllers/auth/signInUser'
import { userService } from '../services'

const getCurrentUser = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })
    const parsedUser = user ? extractUserPublicData(user) : null

    response.send({ user: parsedUser })
}

const changeUserLocale = async (request, response) => {
    const { locale } = request.body
    const isSupportedLocale = config.AVAILABLE_LOCALES.includes(locale)

    if (!isSupportedLocale) {
        throw new BadRequest(translateText('Error_LocaleIsNotSupported', request.locale))
    }

    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

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
    const user = await User.findOne({ where: { id } })

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
    const user = await User.findOne({ where: { id } })

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
        isStrictRarity,
        onlyGuarded,
        isBargainAvailable,
        isTradingOnlyDups,
        areRecipesHidden,
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
    const user = await userService.getById(id)

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    const updateData = {
        displayName,
        steamTradeLink,
        avatarId,
        isGuardProtected: !!isGuardProtected,
        isStrictRarity: !!isStrictRarity,
        onlyGuarded: !!onlyGuarded,
        isBargainAvailable: !!isBargainAvailable,
        isTradingOnlyDups: !!isTradingOnlyDups,
        areRecipesHidden: !!areRecipesHidden,
        wishlistNote,
        marketNote
    }

    if (password) {
        updateData.password = await userService.encryptPassword(password)
    }

    await user.update(updateData)

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

    response.send({ profile: user.get() })
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
