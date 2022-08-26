import { compare, genSalt, hash } from 'bcrypt'
import { User } from '../models'
import { getCurrentTimestamp } from '../../shared'

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

    async getByLogin (login) {
        const users = await User.query().where('login', login)
        return users[0]
    }

    async getByLoginWithPassword (login) {
        const users = await User.query().where('login', login).whereNotNull('password')
        return users[0]
    }

    getPublicProfiles () {
        return User.query().where('isPublic', true)
    }

    async encryptPassword (password) {
        const salt = await genSalt(3)
        return hash(password, salt)
    }

    checkPasswords (enteredPassword, userPassword) {
        return compare(enteredPassword, userPassword)
    }

    createUser (userData) {
        return User.query().insertAndFetch(userData)
    }

    toObject (user) {
        return user.getPublicData()
    }

    isMyProfile (user) {
        return ['76561198890437027', '76561198965865000', '76561199095727689'].includes(user.steamId)
    }

    updateWishlistData (user, wishlistSize) {
        console.error('wl', wishlistSize)

        return user.$query().patch({
            wishlistSize,
            wishlistUpdateTime: getCurrentTimestamp()
        })
    }

    updateMarketData (user, marketSize) {
        console.error('market', marketSize)

        return user.$query().patch({
            marketSize,
            marketUpdateTime: getCurrentTimestamp()
        })
    }

    disconnectSocial (user, socialName) {
        const prop = {
            steam: 'steamId',
            discord: 'discordId',
            google: 'googleId'
        }[socialName]

        return user.$query().patch({ [prop]: null })
    }

    toggleProfileVisibility (user, isPublic) {
        return user.$query().patch({ isPublic })
    }

    deleteUser (user) {
        return user.$query().del()
    }

    updateUserSettings (user, settings) {
        return user.$query().patch(settings)
    }
}
