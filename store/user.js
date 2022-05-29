import { User } from '@/store'
import { openWindow } from '@/utils'
import { config, Routes } from '@/shared'

const AUTH_WINDOW_TARGET = 'AuthWindow'

export const state = () => ({
    user: null
})

export const getters = {
    isAuthorized: state => !!state.user,
    isMyProfile: state => state.user?.steamId === '76561198890437027',

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
    fetchUser ({ commit }) {
        return this.$axios.$get('/api/user')
            .then(({ user }) => commit('SET_USER', user))
    },

    login ({ dispatch }, credentials) {
        return this.$axios.post('/api/auth/login', credentials)
            .then(() => dispatch('fetchUser'))
    },

    register ({ dispatch }, credentials) {
        return this.$axios.post('/api/auth/register', credentials)
            .then(() => dispatch('fetchUser'))
    },

    authUsingSocials ({ commit, dispatch }, socialNetworkName) {
        return new Promise((resolve, reject) => {
            const authWindow = openWindow(`/api/auth/${socialNetworkName}`, {
                tagName: AUTH_WINDOW_TARGET
            })

            const intervalId = setInterval(() => {
                if (authWindow.closed) {
                    clearInterval(intervalId)
                    reject(null)
                }
            }, 500)

            const handler = ({ origin, data }) => {
                if (origin !== config.SERVER_ORIGIN || !data.authResult) {
                    return
                }

                const { error } = data.authResult

                authWindow?.close()
                window.removeEventListener('message', handler, false)
                error ? reject(new Error(error)) : resolve()
            }

            window.addEventListener('message', handler, false)
        }).then(() => dispatch('fetchUser'))
    },

    logout ({ commit }) {
        return this.$axios.$post('/api/auth/logout')
            .then(() => commit('SET_USER', null))
            .then(() => this.$router.replace(Routes.LOGIN))
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
    SET_USER (state, user) {
        state.user = user
    },

    [User.Mutations.SET_USER] (state, user) {
        state.user = user
    },

    [User.Mutations.UPDATE_USER_DATA] (state, data) {
        state.user = { ...state.user, ...data }
    }
}
