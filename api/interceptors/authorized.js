import { verify } from 'jsonwebtoken'
import { Forbidden } from '@curveball/http-errors'
import { translateText } from '../util'
import { config } from '../../shared/config'

export const authorized = async (request, response, next) => {
    const { token } = request.cookies

    console.log(token)

    if (!token) {
        throw new Forbidden(translateText('errors.actionIsForbidden', request.locale))
    }

    try {
        request.user = await verify(token, config.JWT_SECRET)
        next()
    } catch (error) {
        throw new Forbidden(translateText('errors.wrongAuthToken', request.locale))
    }
}
