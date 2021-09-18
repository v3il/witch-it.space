import qs from 'qs'
import { BadRequest } from '@curveball/http-errors'
import { axiosInstance } from '../../axios'
import { config } from '../../config'
import { translateText, generateTokenData } from '../../util'
import { User } from '../../models'

const REDIRECT_URL = `${config.SERVER_ORIGIN}/api/auth/discord/callback`

const authUsingDiscord = (request, response) => {
    response.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=identify`)
}

const authUsingDiscordCallback = async (request, response) => {
    const { code } = request.query

    if (!code) {
        throw new BadRequest(translateText('errors.wrongGoogleToken', request.locale))
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

    let user = await User.findOne({ where: { discordId } })

    if (!user) {
        user = await User.create({
            discordId,
            nickname: username,
            discordTag: `${username}#${discriminator}`
        })
    }

    const userPublicData = {
        id: user.id,
        discordTag: user.discordTag,
        nickname: user.nickname,
        steamTradeLink: user.steamTradeLink,
        isGuardProtected: user.isGuardProtected,
        isActive: user.isActive,
        avatarId: user.avatarId,
        locale: user.locale,
        inventorySyncTime: user.inventorySyncTime,
        authType: 'discord'
    }

    const token = generateTokenData(userPublicData)

    response.cookie('token', token.token, {
        maxAge: 86400 * 1000, // 24 hours
        httpOnly: true, // http only, prevents JavaScript cookie access
        secure: true // cookie must be sent over https / ssl
    })

    console.log(token, response.cookie)

    // response.cookies.userToken = token.token

    // response.json({ token })
    //
    // console.log(userData)
    //
    // // if (!response.ok) { throw new Error(`Error status code: ${response.status}`) }
    // // return JSON.parse(await response.json())
    // // }
    //
    // // res.redirect(`/?token=${json.access_token}`);

    response.redirect('/app') // Successful auth
}

const discordAuthController = {
    authUsingDiscord,
    authUsingDiscordCallback
}

export { discordAuthController }
