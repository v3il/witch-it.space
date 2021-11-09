import { User } from '../models'
import { extractOtherUsersPublicData } from '../util'

const getProfiles = async (request, response) => {
    // todo: sorting by orders count
    const users = await User.findAll({
        where: {
            isPublic: true
        }
    })

    const profiles = users.map(extractOtherUsersPublicData)
    response.send({ profiles })
}

const profilesController = {
    getProfiles
}

export { profilesController }
