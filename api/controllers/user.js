import { BadRequest } from '@curveball/http-errors'
import { genSalt, hash } from 'bcrypt'
import { User } from '../models'
import { extractUserPublicData, translateText } from '../util'
import {
    config, Cookies,
    validateAvatarId,
    validateDiscordTag,
    validateDisplayName,
    validatePassword,
    validateSteamAccountURL,
    validateSteamTradeURL
} from '../../shared'
import { updateUserToken } from '../controllers/auth/signInUser'

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
        discordTag,
        displayName,
        steamProfileUrl,
        steamTradeLink,
        isGuardProtected,
        avatarId
    } = request.body

    const errors = []

    if (password) {
        errors.push(validatePassword(password))
    }

    errors.push(
        validateDiscordTag(discordTag),
        validateDisplayName(displayName),
        validateSteamAccountURL(steamProfileUrl),
        validateSteamTradeURL(steamTradeLink),
        validateAvatarId(avatarId)
    )

    const firstError = errors.find(error => error !== null)

    if (firstError) {
        throw new BadRequest(translateText(firstError, request.locale))
    }

    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    const updateData = {
        discordTag,
        displayName,
        steamProfileUrl,
        steamTradeLink,
        avatarId,
        isGuardProtected: !!isGuardProtected
    }

    if (password) {
        const salt = await genSalt(3)
        updateData.password = await hash(password, salt)
    }

    await user.update(updateData)

    updateUserToken({ response, user })
}

const toggleProfile = async (request, response) => {
    const { isPublic } = request.body
    const { id } = request.user
    const user = await User.findOne({ where: { id } })

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
    const user = await User.findOne({ where: { id } })

    if (!user) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    await user.destroy()
    response.cookie(Cookies.TOKEN, '', { expires: new Date(0) })
    request.user = null
    response.sendStatus(200)
}

const userController = {
    getCurrentUser,
    changeUserLocale,
    changeUserTheme,
    disconnectSocial,
    updateSettings,
    toggleProfile,
    removeProfile
}

export { userController }
