export default defineEventHandler((event) => {
    const config = useRuntimeConfig()
    const redirectUrl = `${config.public.serverOrigin}/api/auth/discord/callback`
    const url = `https://discord.com/api/oauth2/authorize?client_id=${config.discordClientId}&redirect_uri=${redirectUrl}&response_type=code&scope=identify`

    return sendRedirect(event, url)
})
