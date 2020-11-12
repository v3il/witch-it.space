import { BadRequest } from '@curveball/http-errors'
import { compare, genSalt, hash } from 'bcrypt'
import { ne } from 'sequelize/types/lib/operators'
import { translateText } from '../../util'
// eslint-disable-next-line
import { User } from '../../models'
import { signInUser } from './signInUser'

const login = async (request, response) => {
    const requestBody = { login: '', password: '', ...request.body }

    const login = requestBody.login.toString().trim()
    const password = requestBody.password.toString().trim()

    const savedUser = await User.findOne({
        where: {
            login,
            password: {
                [ne]: null
            }
        }
    })

    if (!savedUser) {
        throw new BadRequest(translateText('errors.wrongLogin', request.locale))
    }

    const isCorrectPassword = await compare(password, savedUser.password)

    if (!isCorrectPassword) {
        throw new BadRequest(translateText('errors.wrongPassword', request.locale))
    }

    signInUser({
        response,
        user: savedUser,
        authType: 'local'
    })
}

const register = async (request, response) => {
    const requestBody = { login: '', password: '', ...request.body }

    const login = requestBody.login.toString().trim()
    const password = requestBody.password.toString().trim()

    if (!login.length) {
        throw new BadRequest(translateText('errors.invalidLogin', request.locale))
    }

    if (password.length < 8) {
        throw new BadRequest(translateText('errors.invalidPassword', request.locale))
    }

    const usersWithSameMail = await User.findAll({ where: { login } })

    if (usersWithSameMail.length) {
        throw new BadRequest(translateText('errors.notUniqueLogin', request.locale))
    }

    const salt = await genSalt(3)
    const encryptedPassword = await hash(password, salt)

    const user = await User.create({
        login,
        displayName: login,
        password: encryptedPassword,
        locale: request.locale,
        theme: request.theme
    })

    signInUser({
        user,
        response,
        authType: 'local'
    })
}

const localAuthController = {
    login,
    register
}

export { localAuthController }
