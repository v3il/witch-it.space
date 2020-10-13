import { verify } from 'jsonwebtoken'
import { Forbidden, Unauthorized } from '@curveball/http-errors'
import { translateText } from '../util'
import { config } from '../../shared/config'

export const authorized = async (request, response, next) => {
    // todo: check cookies
    const { token: tokenC } = request.cookies

    console.log(1111, tokenC)

    if (!tokenC) {
        throw new Forbidden(translateText('errors.actionIsForbidden', request.locale))
    }

    // const [type, token] = tokenC.split(' ')
    //
    // if (!(token && type === 'Bearer')) {
    //     throw new Forbidden(translateText('errors.wrongAuthHeader', request.locale))
    // }

    try {
        request.user = await verify(tokenC, config.JWT_SECRET)
        next()
    } catch (error) {
        const { name } = error

        // if (name === 'TokenExpiredError') {
        //     throw new Unauthorized(translateText('errors.wrongAuthToken', request.locale))
        // }
        //
        // if (name === 'JsonWebTokenError') {
        throw new Forbidden(translateText('errors.wrongAuthToken', request.locale))
        // }

        throw error
    }
}
