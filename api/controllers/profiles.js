import { userService } from '../services'

const getProfiles = async (request, response) => {
    const users = await userService.getPublicProfiles()
    const profiles = users.map(user => user.get()).filter((user) => {
        return 1 || user.userStat.marketSize > 0 || user.userStat.wishlistSize > 0
    })

    response.send({ profiles })
}

const profilesController = {
    getProfiles
}

export { profilesController }
