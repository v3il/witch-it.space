import { extractUserPublicData, generateToken } from '../../util'
import { config, Routes } from '../../../shared'

export const signInUser = ({ user, authType, response }) => {
    const userPublicData = {
        authType,
        ...extractUserPublicData(user)
    }

    const token = generateToken(userPublicData)

    response.cookie(config.TOKEN_COOKIE_NAME, token, {
        maxAge: config.TOKEN_COOKIE_DURATION * 1000,
        httpOnly: true,
        secure: true
    })

    response.cookie(config.LOCALE_COOKIE_NAME, userPublicData.locale, {
        maxAge: config.LOCALE_COOKIE_DURATION * 1000,
        httpOnly: true,
        secure: true
    })

    response.redirect(Routes.MAIN)
}
