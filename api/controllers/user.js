// import qs from 'qs'
// import { BadRequest } from '@curveball/http-errors'
// import { axiosInstance } from '../../axios'
// import { config } from '../../shared/config'
// import { translateText, generateTokenData } from '../../util'
// import { User } from '../../models'

const getCurrentUser = (request, response) => {
    console.log(2222, request.user)
    response.send({ user: request.user })
}

const userController = {
    getCurrentUser
    // authUsingDiscordCallback
}

export { userController }
