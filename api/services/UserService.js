import { genSalt, hash } from 'bcrypt'
import { User } from '../models'

const EXCLUDED_ATTRIBUTES = ['password', 'googleId']

export class UserService {
    getById (id) {
        const params = {
            where: { id },
            attributes: {
                exclude: EXCLUDED_ATTRIBUTES
            }
        }

        return User.findOne(params)
    }

    async encryptPassword (password) {
        const salt = await genSalt(3)
        return hash(password, salt)
    }
}
