import SteamAuth from 'node-steam-openid'
import { config, Routes } from '../../../shared'
import { getUserFromCookies } from '../../util'
// eslint-disable-next-line
import { User } from '../../models'
import { signInUser } from './signInUser'

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
            return response.redirect(Routes.LOGIN)
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
            displayName: username,
            locale: request.locale,
            theme: request.theme
        })
    }

    signInUser({
        user,
        response,
        authType: 'steam'
    })
}

const steamAuthController = {
    authUsingSteam,
    async authUsingSteamCallback (request, response) {
        try {
            await authUsingSteamCallback(request, response)
        } catch (e) {
            response.redirect(`${Routes.LOGIN}?error=Error_AuthFailed`)
        }
    }
}

export { steamAuthController }
