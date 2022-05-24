import { compare, genSalt, hash } from 'bcrypt'
import { User } from '../models'
import { getCurrentTimestamp } from '../util/index.js'

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

    setWishlistUpdateTime (user) {
        return user.update({
            wishlistUpdateTime: getCurrentTimestamp()
        })
    }
}
