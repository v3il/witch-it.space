import { generateToken } from '../../util'
import { config, Routes, Cookies } from '../../../shared'
import { userService } from '../../services/index.js'

const getUserData = (user) => {
    // console.log(111, user.query().update)

    const userPublicData = { id: user.id, $r: Math.random(), $d: Date.now() }
    const token = generateToken(userPublicData)

    console.log(111, userPublicData)

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
    const { token } = getUserData(user)
    setCookieToken(token, response)

    response.redirect(Routes.AUTH_RESULT)
}

export const updateUserToken = ({ user, response }) => {
    const { userPublicData, token } = getUserData(user)
    setCookieToken(token, response)

    response.send({
        user: userPublicData
    })
}
