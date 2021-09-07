import { User } from '../models'

export class UserService {
    getById (id, { withStat } = { withStat: true }) {
        const params = {
            where: { id }
        }

        return User.findOne(params)
    }
}
