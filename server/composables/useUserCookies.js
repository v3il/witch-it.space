import { Cookies } from '~/shared/Cookies'
import { userService } from '~/server/services'
import { config } from '~/shared/config'

export const useUserCookies = () => {
    const signUser = (event, user) => {
        setCookie(event, Cookies.TOKEN, userService.generateUserToken(user), {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + config.TOKEN_COOKIE_DURATION * 1000)
        })
    }

    const getUserFromCookies = (event) => {
        const jwtToken = getCookie(event, Cookies.TOKEN)

        try {
            return userService.getUserFromCookies(jwtToken)
        } catch (error) {
            return null
        }
    }

    return { signUser, getUserFromCookies }
}
