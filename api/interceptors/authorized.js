import { Forbidden } from '@curveball/http-errors'
import { getUserFromCookies } from '../util'
import { User } from '../models/index.js'

export const authorized = async (request, response, next) => {
    console.time('Fetch user')

    const user = await getUserFromCookies(request)
    const errorText = request.$t('Error_ActionForbidden')

    if (!user) {
        throwError(errorText)
    }

    const userModel = await User.query().findById(user.id)

    if (!userModel) {
        throwError(errorText)
    }

    console.timeEnd('Fetch user')

    request.user = userModel
    next()
}

function throwError (errorText) {
    const error = new Forbidden(errorText)
    error.logout = true
    throw error
}
