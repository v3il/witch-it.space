import SteamAuth from 'node-steam-openid'
import { config, Routes } from '../../../shared'
import { extractUserPublicData, generateToken, getUserFromCookies } from '../../util'
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
    const steamUser = await steam.authenticate(request)
    const { steamid: steamId, username, profile } = steamUser
    const userFromCookies = await getUserFromCookies(request)

    let user

    if (userFromCookies) {
        user = await User.findOne({ where: { id: userFromCookies.id } })

        if (!user) {
            return response.redirect(Routes.AUTH)
        }

        await user.update({
            steamId,
            steamProfileUrl: profile
        })
    }

    if (!user) {
        user = await User.findOne({ where: { steamId } })
    }

    if (!user) {
        user = await User.create({
            steamId,
            steamProfileUrl: profile,
            displayName: username
        })
    }

    const userPublicData = {
        authType: 'steam',
        ...extractUserPublicData(user)
    }

    const token = generateToken(userPublicData)

    response.cookie('token', token, {
        maxAge: config.JWT_TOKEN_DURATION * 1000,
        httpOnly: true,
        secure: true
    })

    response.redirect(Routes.MAIN)
}

const steamAuthController = {
    authUsingSteam,
    authUsingSteamCallback
}

export { steamAuthController }
