export default defineEventHandler((event) => {
    const config = useRuntimeConfig()
    const redirectUrl = `${config.public.serverOrigin}/api/auth/google/callback`
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${redirectUrl}&client_id=${config.googleClientId}`

    return sendRedirect(event, url)
})
