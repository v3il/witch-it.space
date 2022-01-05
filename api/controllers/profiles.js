import { userService } from '../services'

const getProfiles = async (request, response) => {
    const users = await userService.getPublicProfiles()

    // console.log(users)

    const profiles = users.map(user => userService.toObject(user))

    console.log(profiles)

    response.send({ profiles })
}

const profilesController = {
    getProfiles
}

export { profilesController }
