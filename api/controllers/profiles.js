import { User } from '../../models'

const getProfiles = (request, response) => {
    const users = User.find()

    response.send({ users })
}

const profilesController = {
    getProfiles
}

export { profilesController }
