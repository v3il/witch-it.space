import { Cookies, config } from '~/shared'
import { Theme } from '@/store/Types'

export const state = () => ({
    usersCount: 0
})

export const actions = {
    loadGlobalData ({ commit, rootState }, theme) {
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        const validTheme = theme ?? config.DEFAULT_THEME

        this.$cookies.set(Cookies.THEME, validTheme, { expires })
        commit(Theme.Mutations.SET_THEME, validTheme)

        const user = rootState.user.user

        if (user && user.theme !== theme) {
            // eslint-disable-next-line no-console
            this.$axios.post('/api/user/theme', { theme }).catch(console.error)
        }
    }
}

export const mutations = {
    SET_USERS_COUNT (state, usersCount) {
        state.usersCount = usersCount
    }
}
