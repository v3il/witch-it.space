import { userService } from '../services'

const loadGlobalData = async (request, response) => {
    const usersCount = await userService.getUsersCount()

    response.send({ usersCount })
}

const globalController = { loadGlobalData }

export { globalController }
