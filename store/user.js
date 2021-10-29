import { Locale, Theme, User } from '@/store/Types'

const AUTH_WINDOW_TARGET = 'AuthWindow'

export const state = () => ({
    user: null
})

export const actions = {
    async [User.Actions.FETCH_USER] ({ commit, dispatch }) {
        try {
            const { data } = await this.$axios.get('/api/user')
            const { user } = data

            commit(User.Mutations.SET_USER, user)

            await dispatch(Theme.F.Actions.SET_THEME, user.theme, { root: true })
            await dispatch(Locale.F.Actions.SET_LOCALE, user.locale, { root: true })
        } catch (e) {
            // console.error('User error')
            commit(User.Mutations.SET_USER, null)
            throw e
        }
    },

    [User.Actions.LOGIN] ({ commit, dispatch }, credentials) {
        return this.$axios.post('/api/auth/login', credentials)
    },

    [User.Actions.AUTH] ({ commit, dispatch, state }, socialNetworkName) {
        return new Promise((resolve, reject) => {
            const authWindow = window.open(`/api/auth/${socialNetworkName}`, AUTH_WINDOW_TARGET, 'width=600, height=600')

            const intervalId = setInterval(() => {
                if (authWindow.closed) {
                    console.log('Close')
                    clearInterval(intervalId)
                    reject(null)
                }
            }, 1000)

            window.$setAuthResult = function ({ isSuccess, error }) {
                console.log(isSuccess, error)

                authWindow?.close()
                isSuccess ? resolve() : reject(error)
            }

            // console.log(authWindow)
            //
            // authWindow.onload = function () { // wait til load to add onunload event
            //     authWindow.onbeforeunload = function () {
            //         console.log('Close')
            //     }
            // }

            // authWindow.onbeforeunload = function () {
            //     console.log('test')
            //     return null
            // }

            // authWindow.window.addEventListener('beforeunload', () => {
            //     // eslint-disable-next-line prefer-promise-reject-errors
            //     reject(null)
            //     console.log('Close')
            //     return false
            // }, { once: true })
        })
    },

    [User.Actions.REGISTER] ({ commit, dispatch }, credentials) {
        return this.$axios.post('/api/auth/register', credentials)
    },

    [User.Actions.LOGOUT] ({ commit }) {
        return this.$axios.post('/api/auth/logout')
            .then(() => commit(User.Mutations.SET_USER, null))
    }
}

export const mutations = {
    [User.Mutations.SET_USER] (state, user) {
        state.user = user
    }
}
