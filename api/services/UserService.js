import { genSalt, hash } from 'bcrypt'
import { User } from '../models'
import { getCurrentTimestamp } from '../util/index.js'

const EXCLUDED_ATTRIBUTES = ['password']
// const USER_SETTINGS_EXCLUDED_ATTRIBUTES = ['id', 'userId']
// const USER_STAT_EXCLUDED_ATTRIBUTES = ['id', 'userId']

export class UserService {
    getById (id) {
        return User.query().findById(id)
    }

    async getByDiscordId (discordId) {
        const users = await User.query().where('discordId', discordId)
        return users[0]
    }

    async getByGoogleId (googleId) {
        const users = await User.query().where('googleId', googleId)
        return users[0]
    }

    async getBySteamId (steamId) {
        const users = await User.query().where('steamId', steamId)
        return users[0]
    }

    getPublicProfiles () {
        const params = {
            where: { isPublic: true },
            attributes: {
                exclude: EXCLUDED_ATTRIBUTES
            },
            // include: this._getIncludes(),
            benchmark: true
            // logging: console.log
        }

        return User.findAll(params)
    }

    async encryptPassword (password) {
        const salt = await genSalt(3)
        return hash(password, salt)
    }

    createUser (userData) {
        return User.query().insertAndFetch(userData)
    }

    toObject (user) {
        return user.getPublicData()
    }

    // _getIncludes (excludeAttrs = true) {
    //     return [
    //         {
    //             model: UserSettings,
    //             as: 'settings',
    //             attributes: {
    //                 exclude: excludeAttrs ? USER_SETTINGS_EXCLUDED_ATTRIBUTES : []
    //             }
    //         },
    //         {
    //             model: UserStat,
    //             as: 'userStat',
    //             attributes: {
    //                 exclude: excludeAttrs ? USER_STAT_EXCLUDED_ATTRIBUTES : []
    //             }
    //         }
    //     ]
    // }

    setWishlistUpdateTime (user) {
        return user.update({
            wishlistUpdateTime: getCurrentTimestamp()
        })
    }
}
