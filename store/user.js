import { Locale, Theme, User } from '@/store'
import { openWindow } from '@/utils'
import { Routes, config } from '@/shared'

const AUTH_WINDOW_TARGET = 'AuthWindow'

export const state = () => ({
    user: null
})

export const getters = {
    isAuthorized: state => !!state.user,

    [User.Getters.IS_STEAM_CONNECTED] ({ user }) {
        return !!user?.steamId
    },

    [User.Getters.IS_DISCORD_CONNECTED] ({ user }) {
        return !!user?.discordId
    },

    [User.Getters.IS_GOOGLE_CONNECTED] ({ user }) {
        return !!user?.googleId
    },

    [User.Getters.IS_VERIFIED] ({ user }) {
        return !!user?.steamId && !!user?.discordId && !!user?.steamTradeLink
    }
}

export const actions = {
    async [User.Actions.FETCH_USER] ({ commit, dispatch }) {
        try {
            const { data } = await this.$axios.get('/api/user')

            if (!data) {
                return
            }

            const { user } = data

            // console.log('Fetched', user)

            commit(User.Mutations.SET_USER, user)

            await dispatch(Theme.F.Actions.SET_THEME, user.theme, { root: true })
            await dispatch(Locale.F.Actions.SET_LOCALE, user.locale, { root: true })

            // console.log('Set')
        } catch (e) {
            // console.error('User error')
            commit(User.Mutations.SET_USER, null)
            // throw e
        }
    },

    [User.Actions.LOGIN] ({ commit, dispatch }, credentials) {
        return this.$axios.post('/api/auth/login', credentials)
    },

    [User.Actions.AUTH_USING_SOCIALS] ({ commit, dispatch }, socialNetworkName) {
        return new Promise((resolve, reject) => {
            const authWindow = openWindow(`/api/auth/${socialNetworkName}`, {
                tagName: AUTH_WINDOW_TARGET
            })

            const intervalId = setInterval(() => {
                if (authWindow.closed) {
                    clearInterval(intervalId)
                    reject(null)
                }
            }, 1000)

            const handler = async ({ origin, data }) => {
                if (origin !== config.SERVER_ORIGIN || !data.authResult) {
                    return
                }

                const { error } = data.authResult

                authWindow?.close()
                error ? reject(new Error(error)) : resolve()
                window.removeEventListener('message', handler, false)

                await dispatch(User.Actions.FETCH_USER)
            }

            window.addEventListener('message', handler, false)
        })
    },

    [User.Actions.REGISTER] ({ commit, dispatch }, credentials) {
        return this.$axios.post('/api/auth/register', credentials)
    },

    [User.Actions.LOGOUT] ({ commit }) {
        return this.$axios.post('/api/auth/logout')
            .then(() => this.$router.replace(Routes.LOGIN))
            .then(() => commit(User.Mutations.SET_USER, null))
    },

    [User.Actions.DISCONNECT_SOCIAL] ({ commit }, social) {
        return this.$axios.post('/api/user/disconnect', { social })
            .then(({ data }) => commit(User.Mutations.SET_USER, data.user))
    },

    [User.Actions.UPDATE_SETTINGS] ({ commit }, settings) {
        return this.$axios.post('/api/user/settings', settings)
            .then(({ data }) => commit(User.Mutations.SET_USER, data.user))
    },

    [User.Actions.TOGGLE_PROFILE] ({ commit }, isPublic) {
        return this.$axios.post('/api/user/toggle', { isPublic })
            .then(({ data }) => commit(User.Mutations.SET_USER, data.user))
    },

    [User.Actions.REMOVE_PROFILE] ({ commit }) {
        return this.$axios.post('/api/user/remove')
            .then(() => this.$router.replace(Routes.LOGIN))
            .then(() => commit(User.Mutations.SET_USER, null))
    }
}

export const mutations = {
    [User.Mutations.SET_USER] (state, user) {
        state.user = user
    },

    [User.Mutations.UPDATE_USER_DATA] (state, data) {
        state.user = { ...state.user, ...data }
    }
}
