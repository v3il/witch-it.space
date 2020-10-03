import { verify } from 'jsonwebtoken'
import { Forbidden, Unauthorized } from '@curveball/http-errors'
import { translateText } from '../util'
import { config } from '../config'

export const authorized = async (request, response, next) => {
    // todo: check cookies
    const { authorization } = request.headers

    if (!authorization) {
        throw new Forbidden(translateText('errors.actionIsForbidden', request.locale))
    }

    const [type, token] = authorization.split(' ')

    if (!(token && type === 'Bearer')) {
        throw new Forbidden(translateText('errors.wrongAuthHeader', request.locale))
    }

    try {
        request.user = await verify(token, config.JWT_SECRET)
        next()
    } catch (error) {
        const { name } = error

        if (name === 'TokenExpiredError') {
            throw new Unauthorized(translateText('errors.wrongAuthToken', request.locale))
        }

        if (name === 'JsonWebTokenError') {
            throw new Forbidden(translateText('errors.wrongAuthToken', request.locale))
        }

        throw error
    }
}
