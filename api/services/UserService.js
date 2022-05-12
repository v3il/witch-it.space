import { genSalt, hash } from 'bcrypt'
import { User, UserSettings, UserStat } from '../models'
import { getCurrentTimestamp } from '../util/index.js'

const EXCLUDED_ATTRIBUTES = ['password']
const USER_SETTINGS_EXCLUDED_ATTRIBUTES = ['id', 'userId']
const USER_STAT_EXCLUDED_ATTRIBUTES = ['id', 'userId']

export class UserService {
    getById (id, { excludeAttrs } = { excludeAttrs: true }) {
        const params = {
            where: { id },
            attributes: {
                exclude: EXCLUDED_ATTRIBUTES
            },
            include: this._getIncludes(excludeAttrs),
            benchmark: true
            // logging: console.log
        }

        return User.findOne(params)
    }

    getPublicProfiles () {
        const params = {
            where: { isPublic: true },
            attributes: {
                exclude: EXCLUDED_ATTRIBUTES
            },
            include: this._getIncludes(),
            benchmark: true
            // logging: console.log
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
            include: this._getIncludes()
        })
    }

    toObject (user) {
        return user.get({ plain: true })
    }

    _getIncludes (excludeAttrs = true) {
        return [
            {
                model: UserSettings,
                as: 'settings',
                attributes: {
                    exclude: excludeAttrs ? USER_SETTINGS_EXCLUDED_ATTRIBUTES : []
                }
            },
            {
                model: UserStat,
                as: 'userStat',
                attributes: {
                    exclude: excludeAttrs ? USER_STAT_EXCLUDED_ATTRIBUTES : []
                }
            }
        ]
    }

    setWishlistUpdateTime (user) {
        return user.update({
            wishlistUpdateTime: getCurrentTimestamp()
        })
    }
}
