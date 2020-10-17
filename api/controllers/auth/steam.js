import SteamAuth from 'node-steam-openid'
import { config, Routes } from '../../../shared'
import { extractUserPublicData, generateToken } from '../../util'
// eslint-disable-next-line
import { User } from '../../models'

const steam = new SteamAuth({
    returnUrl: `${config.SERVER_ORIGIN}/api/auth/steam/callback`,
    realm: config.SERVER_ORIGIN,
    apiKey: config.STEAM_CLIENT_ID
})

let redirectURL

const authUsingSteam = async (request, response) => {
    if (!redirectURL) {
        redirectURL = await steam.getRedirectUrl()
    }

    return response.redirect(redirectURL)
}

const authUsingSteamCallback = async (request, response) => {
    const user = await steam.authenticate(req)

    console.log(user)

    // const { id: googleId, name, locale } = googleUser
    //
    // let user = await User.findOne({ where: { googleId } })
    //
    // if (!user) {
    //     user = await User.create({
    //         googleId,
    //         nickname: name,
    //         locale: config.AVAILABLE_LOCALES.includes(locale) ? locale : config.DEFAULT_LOCALE
    //     })
    // }
    //
    // const userPublicData = {
    //     authType: 'google',
    //     ...extractUserPublicData(user)
    // }
    //
    // const token = generateToken(userPublicData)
    //
    // response.cookie('token', token, {
    //     maxAge: config.JWT_TOKEN_DURATION * 1000,
    //     httpOnly: true,
    //     secure: true
    // })

    response.sendStatus(200)
    // response.redirect(Routes.MAIN)
}

const steamAuthController = {
    authUsingSteam,
    authUsingSteamCallback
}

export { steamAuthController }
