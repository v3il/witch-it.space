import { User } from '../models'
import { extractUserPublicData } from '../util'

const getCurrentUser = async (request, response) => {
    if (!request.user) {
        return response.send({ user: null })
    }

    const { id } = request.user
    const user = await User.findOne({ where: { id } })
    const parsedUser = user ? extractUserPublicData(user) : null

    response.send({ user: parsedUser })
}

const userController = {
    getCurrentUser
}

export { userController }
