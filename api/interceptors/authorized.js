import { Forbidden } from '@curveball/http-errors'
import { getUserFromCookies } from '../util'
import { userService } from '../services/index.js'

export const authorized = async (request, response, next) => {
    console.time('Get user from cookies')

    const user = await getUserFromCookies(request)
    const errorText = request.$t('Error_ActionForbidden')

    console.timeEnd('Get user from cookies')

    if (!user) {
        throwError(errorText)
    }

    console.time('Fetch user')

    const userModel = await userService.getById(user.id)

    console.timeEnd('Fetch user')

    if (!userModel) {
        throwError(errorText)
    }

    request.user = userModel
    next()
}

function throwError (errorText) {
    const error = new Forbidden(errorText)
    error.logout = true
    throw error
}
