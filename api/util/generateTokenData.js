import { sign } from 'jsonwebtoken'
import { config } from '../config'

export const generateTokenData = (userPublicData) => {
    const tokenDuration = 60 // 7 days

    const expires = Math.floor(Date.now() / 1000 + tokenDuration)
    const token = sign(userPublicData, config.JWT_SECRET, {
        expiresIn: tokenDuration
    })

    return { token, expires }
}
