import { userService } from '../services'

const getProfiles = async (request, response) => {
    const users = await userService.getPublicProfiles()
    const profiles = users.map(user => user.get())

    response.send({ profiles })
}

const profilesController = {
    getProfiles
}

export { profilesController }
