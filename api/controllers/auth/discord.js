import qs from 'qs'
import { axiosInstance } from '../../axios'
import { config, Routes } from '../../../shared'
import { generateToken, extractUserPublicData, getUserFromCookies } from '../../util'
// eslint-disable-next-line
import { User } from '../../models'

const REDIRECT_URL = `${config.SERVER_ORIGIN}/api/auth/discord/callback`

const authUsingDiscord = (request, response) => {
    response.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=identify`)
}

const authUsingDiscordCallback = async (request, response) => {
    const { code } = request.query

    if (!code) {
        return response.redirect(`${Routes.AUTH}`)
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

    const { id: discordId, username, discriminator } = userData
    const userFromCookies = await getUserFromCookies(request)

    let user

    if (userFromCookies) {
        user = await User.findOne({ where: { id: userFromCookies.id } })

        if (!user) {
            return response.redirect(Routes.AUTH)
        }

        await user.update({
            discordId,
            discordTag: `${username}#${discriminator}`
        })
    }

    if (!user) {
        user = await User.findOne({ where: { discordId } })
    }

    if (!user) {
        user = await User.create({
            discordId,
            displayName: username,
            discordTag: `${username}#${discriminator}`
        })
    }

    const userPublicData = {
        authType: 'discord',
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

const discordAuthController = {
    authUsingDiscord,
    async authUsingDiscordCallback (request, response) {
        try {
            await authUsingDiscordCallback(request, response)
        } catch (e) {
            response.redirect(`${Routes.AUTH}?error=errors.authFailed`)
        }
    }
}

export { discordAuthController }
