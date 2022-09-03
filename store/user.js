import { User } from '@/store'
import { openWindow } from '@/utils'
import { config, Routes } from '@/shared'

const AUTH_WINDOW_TARGET = 'AuthWindow'

export const state = () => ({
    user: null
})

export const getters = {
    isAuthorized: state => !!state.user,
    isMySteamProfile: ({ user }) => ['76561198890437027', '76561198965865000', '76561199095727689'].includes(user?.steamId),
    isSteamConnected: ({ user }) => !!user?.steamId,
    isDiscordConnected: ({ user }) => !!user?.discordId,
    isGoogleConnected: ({ user }) => !!user?.googleId,
    isVerified: ({ user }) => !!user?.steamId && !!user?.steamTradeLink,
    isPublic: ({ user }) => user?.isPublic
}

export const actions = {
    fetchUser ({ commit, dispatch }) {
        return this.$axios.$get('/api/user')
            .then(({ user }) => {
                console.error(user)
                commit('SET_USER', user)
            })
            // .then(() => dispatch('items/fetchItems', {}, { root: true }))
            .catch(e => console.error('Fetch user failed', e))
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
            .then(() => this.$router.replace(Routes.LOGIN + '?logout')
                .then(() => commit('SET_USER', null)))
    },

    disconnectSocial ({ commit }, socialName) {
        return this.$axios.$post('/api/user/disconnect', { socialName })
            .then(() => commit('DISCONNECT_SOCIAL', socialName))
    },

    updateSettings ({ commit }, settings) {
        return this.$axios.$post('/api/user/settings', settings)
            .then(() => commit('UPDATE_USER_DATA', settings))
    },

    updateAccountSettings ({ commit }, accountSettings) {
        return this.$axios.$post('/api/user/settings/account', accountSettings)
            .then(() => commit('UPDATE_USER_DATA', accountSettings))
    },

    updateSecuritySettings ({ commit }, securitySettings) {
        return this.$axios.$post('/api/user/settings/security', securitySettings)
            .then(() => commit('UPDATE_USER_DATA', securitySettings))
    },

    toggleProfile ({ commit }, isPublic) {
        return this.$axios.$post('/api/user/toggle', { isPublic })
            .then(() => commit('SET_PROFILE_VISIBILITY', isPublic))
    },

    deleteProfile ({ dispatch }) {
        return this.$axios.$post('/api/user/remove').then(() => dispatch('logout'))
    }
}

export const mutations = {
    SET_USER (state, user) {
        state.user = user
    },

    DISCONNECT_SOCIAL (state, socialName) {
        const prop = {
            steam: 'steamId',
            discord: 'discordId',
            google: 'googleId'
        }[socialName]

        state.user[prop] = null
    },

    SET_PROFILE_VISIBILITY (state, isPublic) {
        state.user.isPublic = isPublic
    },

    UPDATE_USER_DATA (state, data) {
        state.user = { ...state.user, ...data }
    }
}
