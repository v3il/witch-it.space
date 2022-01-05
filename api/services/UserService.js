import { genSalt, hash } from 'bcrypt'
import { User, UserSettings, UserStat } from '../models'

const EXCLUDED_ATTRIBUTES = ['password']
const USER_SETTINGS_EXCLUDED_ATTRIBUTES = ['id', 'userId']
const USER_STAT_EXCLUDED_ATTRIBUTES = ['id', 'userId']

export class UserService {
    getById (id) {
        const params = {
            where: { id },
            attributes: {
                exclude: EXCLUDED_ATTRIBUTES
            },
            include: [
                {
                    model: UserSettings,
                    as: 'settings',
                    attributes: {
                        exclude: USER_SETTINGS_EXCLUDED_ATTRIBUTES
                    }
                },
                {
                    model: UserStat,
                    as: 'userStat',
                    attributes: {
                        exclude: USER_STAT_EXCLUDED_ATTRIBUTES
                    }
                }
            ]
        }

        return User.findOne(params)
    }

    getPublicProfiles () {
        const params = {
            where: { isPublic: true },
            attributes: {
                exclude: EXCLUDED_ATTRIBUTES
            },
            include: [
                {
                    model: UserSettings,
                    as: 'settings',
                    attributes: {
                        exclude: USER_SETTINGS_EXCLUDED_ATTRIBUTES
                    }
                },
                {
                    model: UserStat,
                    as: 'userStat',
                    attributes: {
                        exclude: USER_STAT_EXCLUDED_ATTRIBUTES
                    }
                }
            ]
        }

        return User.findAll(params)
    }

    async encryptPassword (password) {
        const salt = await genSalt(3)
        return hash(password, salt)
    }

    async createUser (userData) {
        return await User.create({
            ...userData,
            settings: {},
            userStat: {}
        }, {
            include: [
                {
                    model: UserSettings,
                    as: 'settings',
                    attributes: {
                        exclude: USER_SETTINGS_EXCLUDED_ATTRIBUTES
                    }
                },
                {
                    model: UserStat,
                    as: 'userStat',
                    attributes: {
                        exclude: USER_STAT_EXCLUDED_ATTRIBUTES
                    }
                }
            ]
        })
    }

    toObject (user) {
        return user.get({ plain: true })
    }
}
