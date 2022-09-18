import { userService } from '../services'

const loadGlobalData = async (request, response) => {
    const usersCount = await userService.getUsersCount()
    const randomAvatars = await userService.getRandomUserAvatar()

    response.send({ usersCount, randomAvatars })
}

const globalController = { loadGlobalData }

export { globalController }
