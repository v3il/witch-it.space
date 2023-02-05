import { verify } from 'jsonwebtoken'
import { Cookies } from '~/shared/Cookies'
import { userService } from '~/server/services'
import { config } from '~/shared/config'

export const useUserCookies = () => {
    const signUser = (event, user) => {
        setCookie(event, Cookies.TOKEN, userService.generateUserToken(user), {
            maxAge: config.TOKEN_COOKIE_DURATION * 1000,
            httpOnly: true,
            secure: true
        })
    }

    const getUserFromCookies = (event) => {
        const jwtToken = getUserFromCookies(event, Cookies.TOKEN)

        if (!jwtToken) {
            return null
        }

        try {
            return verify(jwtToken, config.JWT_SECRET)
        } catch (error) {
            return null
        }
    }

    return { signUser, getUserFromCookies }
}
