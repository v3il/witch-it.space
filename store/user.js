import { Locale, Theme, User } from '@/store/Types'

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

    [User.Actions.REGISTER] ({ commit, dispatch }, credentials) {
        return this.$axios.post('/api/auth/register', credentials)
    }
}

export const mutations = {
    [User.Mutations.SET_USER] (state, user) {
        state.user = user
    }
}
