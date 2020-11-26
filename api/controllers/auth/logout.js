import { Cookies } from '../../../shared'

const logout = (request, response) => {
    response.cookie(Cookies.TOKEN, '', { expires: new Date(0) })
    request.user = null
    response.sendStatus(200)
}

const logoutController = {
    logout
}

export { logoutController }
