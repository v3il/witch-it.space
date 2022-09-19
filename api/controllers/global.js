import { userService } from '../services'

const loadGlobalData = async (request, response) => {
    const usersCount = await userService.getUsersCount()
    const randomUsers = await userService.getRandomUsers()

    response.send({ usersCount, randomUsers })
}

const globalController = { loadGlobalData }

export { globalController }
