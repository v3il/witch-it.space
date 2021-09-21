import { verify } from 'jsonwebtoken'
import { config } from '../../shared'

export const getUserFromCookies = (request) => {
    const { [config.TOKEN_COOKIE_NAME]: token } = request.cookies

    if (!token) {
        return null
    }

    try {
        return verify(token, config.JWT_SECRET)
    } catch (error) {
        return null
    }
}
