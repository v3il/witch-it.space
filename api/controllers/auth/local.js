import { BadRequest } from '@curveball/http-errors'
import { compare, genSalt, hash } from 'bcrypt'
import { Op } from 'sequelize'
import { translateText } from '../../util'
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
                [Op.ne]: null
            }
        }
    })

    if (!savedUser) {
        throw new BadRequest(translateText('Error_NoUserWithLogin', request.locale))
    }

    const isCorrectPassword = await compare(password, savedUser.password)

    if (!isCorrectPassword) {
        throw new BadRequest(translateText('Error_WrongPassword', request.locale))
    }

    signInUser({
        response,
        user: savedUser
    })
}

const register = async (request, response) => {
    const requestBody = { login: '', password: '', ...request.body }

    const login = requestBody.login.toString().trim()
    const password = requestBody.password.toString().trim()

    if (login.length < 4) {
        throw new BadRequest(translateText('Error_InvalidLogin', request.locale))
    }

    if (password.length < 6) {
        throw new BadRequest(translateText('Error_InvalidPassword', request.locale))
    }

    const usersWithSameLogin = await User.findAll({ where: { login } })

    if (usersWithSameLogin.length) {
        throw new BadRequest(translateText('Error_NotUniqueLogin', request.locale))
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
        response
    })
}

const localAuthController = {
    login,
    register
}

export { localAuthController }
