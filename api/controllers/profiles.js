import { User } from '../models'
import { extractUserPublicData } from '../util'

const getProfiles = async (request, response) => {
    const users = await User.findAll()
    const mappedUsers = users.map(extractUserPublicData)

    console.log(mappedUsers)

    response.send({ users: mappedUsers })
}

const profilesController = {
    getProfiles
}

export { profilesController }
