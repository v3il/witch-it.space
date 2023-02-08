import qs from 'qs'
import { Routes } from '~/shared/Routes'
import { useUserCookies } from '~/server/composables/useUserCookies'
import { userService } from '~/server/services'
import { Locales, Themes } from '~/shared/config'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { signUser } = useUserCookies()
    const { code } = getQuery(event)

    if (!code) {
        return sendRedirect(event, `${Routes.AUTH_RESULT}?error=Error_WrongOAuth2Token`)
    }

    const tokenData = await $fetch(
        'https://discord.com/api/v8/oauth2/token', {
            method: 'POST',
            body: qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:3000/api/auth/discord/callback',
                client_id: config.public.discordClientId,
                client_secret: config.discordClientSecret,
                scope: 'identify'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )

    console.error(tokenData.access_token)

    const userData = await $fetch('https://discord.com/api/v8/users/@me', {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`
        }
    })

    const { getUserFromCookies } = useUserCookies()
    const user = await getUserFromCookies(event)

    const { id: discordId, username } = userData

    if (user) {
        await user.$query().patch({ discordId })
        return sendRedirect(event, Routes.AUTH_RESULT)
    }

    let savedUser = await userService.getByDiscordId(discordId)

    if (!user) {
        savedUser = await userService.createUser({
            discordId,
            displayName: username,
            locale: Locales.EN,
            theme: Themes.DARK
        })
    }

    signUser(event, savedUser)

    return sendRedirect(event, Routes.AUTH_RESULT)

    // const { code } = request.query
    //
    // if (!code) {
    //     return response.redirect(`${Routes.AUTH_RESULT}?error=Error_WrongOAuth2Token`)
    // }
    //
    // const { data: tokenData } = await axiosInstance.post(
    //     'https://discord.com/api/v8/oauth2/token',
    //     qs.stringify({
    //         grant_type: 'authorization_code',
    //         code,
    //         redirect_uri: REDIRECT_URL,
    //         client_id: config.DISCORD_CLIENT_ID,
    //         client_secret: config.DISCORD_CLIENT_SECRET,
    //         scope: 'identify'
    //     }), {
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }
    // )
    //
    // const { data: userData } = await axiosInstance.get('https://discord.com/api/v8/users/@me', {
    //     headers: {
    //         Authorization: `Bearer ${tokenData.access_token}`
    //     }
    // })
    //
    // const { id: discordId, username } = userData
    //
    // if (request.user) {
    //     await request.user.$query().patch({ discordId })
    //     return response.redirect(Routes.AUTH_RESULT)
    // }
    //
    // let user = await userService.getByDiscordId(discordId)
    //
    // if (!user) {
    //     user = await userService.createUser({
    //         discordId,
    //         displayName: username,
    //         locale: request.locale,
    //         theme: request.theme
    //     })
    // }
    //
    // signInUser({
    //     user,
    //     response,
    //     isSocial: true
    // })
})
