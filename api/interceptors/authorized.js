import { Forbidden } from '@curveball/http-errors'
import { getUserFromCookies, translateText } from '../util'

export const authorized = async (request, response, next) => {
    const user = await getUserFromCookies(request)

    if (!user) {
        const error = new Forbidden(translateText('Error_ActionForbidden', request.locale))
        error.logout = true
        throw error
    }

    request.user = user
    next()
}
