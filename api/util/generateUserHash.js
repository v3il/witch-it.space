import crypto from 'crypto'

export const generateUserHash = (email) => {
    const dataToEncrypt = {
        email,
        randomPart: Math.random()
    }

    return crypto
        .createHash('sha256')
        .update(JSON.stringify(dataToEncrypt))
        .digest('hex')
}
