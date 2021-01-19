import { BadRequest } from '@curveball/http-errors'
// eslint-disable-next-line import/named
import { User } from '../models'
import { extractUserPublicData, translateText } from '../util'
import { config } from '../../shared'

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

const userController = {
    getCurrentUser,
    changeUserLocale,
    changeUserTheme
}

export { userController }
