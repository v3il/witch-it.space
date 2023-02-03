import { getUserFromCookies } from '../util'
import { userService } from '../services/index.js'

export const fetchUser = async (request, response, next) => {
    const user = await getUserFromCookies(request)

    if (!user) {
        return next()
    }

    request.user = await userService.getById(user.id)
    next()
}
