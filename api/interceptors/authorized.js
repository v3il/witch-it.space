import { Forbidden } from '@curveball/http-errors'
import { getUserFromCookies, translateText } from '../util'

export const authorized = async (request, response, next) => {
    const user = await getUserFromCookies(request)

    if (!user) {
        throw new Forbidden(translateText('Error_ActionForbidden', request.locale))
    }

    request.user = user
    next()
}
