import { sign } from 'jsonwebtoken'
import { config } from '../../shared'

export const generateToken = (userPublicData) => {
    return sign(userPublicData, config.JWT_SECRET, {
        expiresIn: config.TOKEN_COOKIE_DURATION
    })
}
