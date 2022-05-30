import SteamAuth from 'node-steam-openid'
import { config, Routes } from '../../../shared'
import { userService } from '../../services/index.js'
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
    const { steamid: steamId, username } = steamUser

    if (request.user) {
        await request.user.$query().patch({ steamId })
        return response.redirect(Routes.AUTH_RESULT)
    }

    let user = await userService.getBySteamId(steamId)

    if (!user) {
        user = await userService.createUser({
            steamId,
            displayName: username,
            locale: request.locale,
            theme: request.theme
        })
    }

    signInUser({
        user,
        response,
        isSocial: true
    })
}

const steamAuthController = {
    authUsingSteam,
    async authUsingSteamCallback (request, response) {
        try {
            await authUsingSteamCallback(request, response)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
            response.redirect(`${Routes.AUTH_RESULT}?error=Error_AuthFailed`)
        }
    }
}

export { steamAuthController }
