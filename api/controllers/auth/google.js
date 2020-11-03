import qs from 'qs'
import { axiosInstance } from '../../axios'
import { config, Routes } from '../../../shared'
import { getUserFromCookies } from '../../util'
// eslint-disable-next-line
import { User } from '../../models'
import { signInUser } from './signInUser'

const REDIRECT_URL = `${config.SERVER_ORIGIN}/api/auth/google/callback`

const authUsingGoogle = (request, response) => {
    response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${config.GOOGLE_CLIENT_ID}`)
}

const authUsingGoogleCallback = async (request, response) => {
    const { code } = request.query

    if (!code) {
        return response.redirect(`${Routes.LOGIN}?error=errors.wrongOauth2Token`)
    }

    const { data: tokenData } = await axiosInstance.post(
        'https://oauth2.googleapis.com/token',
        qs.stringify({
            code,
            client_id: config.GOOGLE_CLIENT_ID,
            client_secret: config.GOOGLE_CLIENT_SECRET,
            redirect_uri: REDIRECT_URL,
            grant_type: 'authorization_code'
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    const { data: googleUser } = await axiosInstance
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenData.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.id_token}`
                }
            }
        )

    const { id: googleId, name, locale } = googleUser
    const userFromCookies = await getUserFromCookies(request)

    let user

    if (userFromCookies) {
        user = await User.findOne({ where: { id: userFromCookies.id } })

        if (!user) {
            return response.redirect(Routes.LOGIN)
        }

        await user.update({ googleId })
    }

    if (!user) {
        user = await User.findOne({ where: { googleId } })
    }

    if (!user) {
        user = await User.create({
            googleId,
            displayName: name,
            locale: config.AVAILABLE_LOCALES.includes(locale) ? locale : config.DEFAULT_LOCALE
        })
    }

    signInUser({
        user,
        response,
        authType: 'google'
    })
}

const googleAuthController = {
    authUsingGoogle,
    async authUsingGoogleCallback (request, response) {
        try {
            await authUsingGoogleCallback(request, response)
        } catch (e) {
            response.redirect(`${Routes.LOGIN}?error=errors.authFailed`)
        }
    }
}

export { googleAuthController }
