import SteamAuth from 'node-steam-openid'
import { Routes } from '~/shared/Routes'
import { useUserCookies } from '~/server/composables/useUserCookies'
import { userService } from '~/server/services'
import { Locales, Themes } from '~/shared/config'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { signUser } = useUserCookies()

    const steam = new SteamAuth({
        returnUrl: `${config.public.serverOrigin}/api/auth/steam/callback`,
        realm: config.public.serverOrigin,
        apiKey: config.steamClientSecret
    })

    const steamUser = await steam.authenticate(event.req)
    const { steamid: steamId, username } = steamUser

    const { getUserFromCookies } = useUserCookies()
    const user = await getUserFromCookies(event)

    if (user) {
        await user.$query().patch({ steamId })
        return sendRedirect(event, Routes.AUTH_RESULT)
    }

    let savedUser = await userService.getBySteamId(steamId)

    if (!savedUser) {
        savedUser = await userService.createUser({
            steamId,
            displayName: username,
            locale: Locales.EN,
            theme: Themes.DARK
        })
    }

    signUser(event, savedUser)

    return sendRedirect(event, Routes.AUTH_RESULT)
})
