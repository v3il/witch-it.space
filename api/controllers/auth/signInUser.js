import { extractUserPublicData, generateToken } from '../../util'
import { config, Routes, Cookies } from '../../../shared'

export const signInUser = ({ user, response }) => {
    const userPublicData = extractUserPublicData(user)
    const token = generateToken(userPublicData)

    response.cookie(Cookies.TOKEN, token, {
        maxAge: config.TOKEN_COOKIE_DURATION * 1000,
        httpOnly: true,
        secure: true
        // sameSite: true
    })

    const userJSON = JSON.stringify(userPublicData)

    response.redirect(`${Routes.AUTH_RESULT}?user=${encodeURIComponent(userJSON)}`)
}

export const updateUserToken = ({ user, response }) => {
    const userPublicData = extractUserPublicData(user)
    const token = generateToken(userPublicData)

    response.cookie(Cookies.TOKEN, token, {
        maxAge: config.TOKEN_COOKIE_DURATION * 1000,
        httpOnly: true,
        secure: true
        // sameSite: true
    })

    response.send({
        user: userPublicData
    })
}
