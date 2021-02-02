import { extractUserPublicData, generateToken } from '../../util'
import { config, Routes, Cookies } from '../../../shared'

const getUserData = (user) => {
    const userPublicData = extractUserPublicData(user)
    const token = generateToken(userPublicData)

    return { userPublicData, token }
}

const setCookieToken = (token, response) => {
    response.cookie(Cookies.TOKEN, token, {
        maxAge: config.TOKEN_COOKIE_DURATION * 1000,
        httpOnly: true,
        secure: true
        // sameSite: true
    })
}

export const signInUser = ({ user, response }) => {
    const { userPublicData, token } = getUserData(user)
    setCookieToken(token, response)

    const userJSON = JSON.stringify(userPublicData)
    response.redirect(`${Routes.AUTH_RESULT}?user=${encodeURIComponent(userJSON)}`)
}

export const updateUserToken = ({ user, response }) => {
    const { userPublicData, token } = getUserData(user)
    setCookieToken(token, response)

    response.send({
        user: userPublicData
    })
}
