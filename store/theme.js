import { Cookies, config } from '~/shared'
import { Theme } from '@/store/Types'

export const state = () => ({
    theme: config.DEFAULT_THEME
})

export const actions = {
    [Theme.Actions.SET_THEME] ({ commit, rootState }, theme) {
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        const validTheme = theme ?? config.DEFAULT_THEME

        this.$cookies.set(Cookies.THEME, validTheme, { expires })
        commit(Theme.Mutations.SET_THEME, validTheme)

        if (rootState.user.user) {
            this.$axios.post('/api/user/theme', { theme }).catch(console.error)
        }
    }
}

export const mutations = {
    [Theme.Mutations.SET_THEME] (state, theme) {
        state.theme = theme
    }
}
