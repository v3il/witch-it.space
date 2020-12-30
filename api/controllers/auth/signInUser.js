import { extractUserPublicData, generateToken } from '../../util'
import { config, Routes, Cookies } from '../../../shared'

export const signInUser = ({ user, authType, response }) => {
    const userPublicData = {
        authType,
        ...extractUserPublicData(user)
    }

    const token = generateToken(userPublicData)

    response.cookie(Cookies.TOKEN, token, {
        maxAge: config.TOKEN_COOKIE_DURATION * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'Lax' // todo: find a solution for the 'Strict' option
    })

    response.redirect(Routes.MAIN)
}
