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

    const tokenData = await $fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: qs.stringify({
            code,
            client_id: config.googleClientId,
            client_secret: config.googleClientSecret,
            redirect_uri: `${config.public.serverOrigin}/api/auth/google/callback`,
            grant_type: 'authorization_code'
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    const googleUser = await $fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenData.access_token}`,
        {
            headers: {
                Authorization: `Bearer ${tokenData.id_token}`
            }
        }
    )

    const { getUserFromCookies } = useUserCookies()
    const user = await getUserFromCookies(event)

    const { id: googleId, name } = googleUser

    if (user) {
        await user.$query().patch({ googleId })
        return sendRedirect(event, Routes.AUTH_RESULT)
    }

    let savedUser = await userService.getByGoogleId(googleId)

    if (!savedUser) {
        savedUser = await userService.createUser({
            googleId,
            displayName: name,
            locale: Locales.EN,
            theme: Themes.DARK
        })
    }

    signUser(event, savedUser)

    return sendRedirect(event, Routes.AUTH_RESULT)
})
