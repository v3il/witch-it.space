import SteamAuth from 'node-steam-openid'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const steam = new SteamAuth({
        returnUrl: `${config.public.serverOrigin}/api/auth/steam/callback`,
        realm: config.public.serverOrigin,
        apiKey: config.steamClientSecret
    })

    const redirectURL = await steam.getRedirectUrl()

    return sendRedirect(event, redirectURL)
})
