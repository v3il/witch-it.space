import qs from 'qs'
import { BadRequest } from '@curveball/http-errors'
import { axiosInstance } from '../../axios'
import { config } from '../../config'
import { translateText, generateTokenData } from '../../util'
import { User } from '../../models'

const REDIRECT_URL = `${config.SERVER_ORIGIN}/api/auth/discord/callback`

console.log(REDIRECT_URL)

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

    response.json({ token })

    console.log(userData)

    // if (!response.ok) { throw new Error(`Error status code: ${response.status}`) }
    // return JSON.parse(await response.json())
    // }

    // res.redirect(`/?token=${json.access_token}`);

    response.redirect('/auth/discord/success') // Successful auth
}

const discordAuthController = {
    authUsingDiscord,
    authUsingDiscordCallback
}

export { discordAuthController }

// app.get('/auth/discord', (req, res) => {
//     res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=identify`)
// })
// app.get('/auth/discord/callback', async function (req, res) {
//     if (!req.query.code) { throw new Error('NoCodeProvided') }
//     const code = req.query.code
//
//     try {
//         const response = await axios.post('https://discord.com/api/v8/oauth2/token',
//             qs.stringify({
//                 grant_type: 'authorization_code',
//                 code,
//                 redirect_uri: redirect,
//                 client_id: clientId,
//                 client_secret: clientSecret,
//                 scope: 'identify'
//             }), {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             })
//         const json = await response.data
//
//         console.log(json.access_token)
//
//         // const fetchUser = async (id) => {
//         const response2 = await axios.get('https://discord.com/api/v8/users/@me', {
//             headers: {
//                 Authorization: `Bearer ${json.access_token}`
//             }
//         })
//
//         console.log(response2.data)
//
//         // if (!response.ok) { throw new Error(`Error status code: ${response.status}`) }
//         // return JSON.parse(await response.json())
//         // }
//
//         // res.redirect(`/?token=${json.access_token}`);
//
//         res.redirect('/app') // Successful auth
//     } catch (e) {
//         console.log(e)
//     }
// })
