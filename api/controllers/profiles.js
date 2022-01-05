import { userService } from '../services'

const getProfiles = async (request, response) => {
    const users = await userService.getPublicProfiles()
    const profiles = users.map(user => userService.toObject(user))

    response.send({ profiles })
}

const profilesController = {
    getProfiles
}

export { profilesController }
