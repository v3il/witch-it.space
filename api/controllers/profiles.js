import { User } from '../models'
import { extractOtherUsersPublicData } from '../util'

const getProfiles = async (request, response) => {
    const users = await User.findAll({
        where: {
            isPublic: true
        }
    })
    const mappedUsers = users.map(extractOtherUsersPublicData)

    response.send({ users: mappedUsers })
}

const profilesController = {
    getProfiles
}

export { profilesController }
