import qs from 'qs'
import { axiosInstance } from '../../../../WitchTrade/api/axios'
import { config, Routes } from '../../../../WitchTrade/shared'
import { userService } from '../../../../WitchTrade/api/services'
import { signInUser } from './signInUser'

const REDIRECT_URL = `${config.SERVER_ORIGIN}/api/auth/discord/callback`

const authUsingDiscord = (request, response) => {
    response.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=identify`)
}

const authUsingDiscordCallback = async (request, response) => {
    const { code } = request.query

    if (!code) {
        return response.redirect(`${Routes.AUTH_RESULT}?error=Error_WrongOAuth2Token`)
    }

    const { data: tokenData } = await axiosInstance.post(
        'https://discord.com/api/v8/oauth2/token',
        qs.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URL,
            client_id: config.DISCORD_CLIENT_ID,
            client_secret: config.DISCORD_CLIENT_SECRET,
            scope: 'identify'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )

    const { data: userData } = await axiosInstance.get('https://discord.com/api/v8/users/@me', {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`
        }
    })

    const { id: discordId, username } = userData

    if (request.user) {
        await request.user.$query().patch({ discordId })
        return response.redirect(Routes.AUTH_RESULT)
    }

    let user = await userService.getByDiscordId(discordId)

    if (!user) {
        user = await userService.createUser({
            discordId,
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

const discordAuthController = {
    authUsingDiscord,
    async authUsingDiscordCallback (request, response) {
        try {
            await authUsingDiscordCallback(request, response)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
            response.redirect(`${Routes.AUTH_RESULT}?error=Error_AuthFailed`)
        }
    }
}

export { discordAuthController }
