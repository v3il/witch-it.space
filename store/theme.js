import { Cookies, config } from '~/shared'

export const state = () => ({
    theme: config.DEFAULT_THEME
})

export const actions = {
    setTheme ({ commit }, theme) {
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        const validTheme = theme ?? config.DEFAULT_THEME

        this.$cookies.set(Cookies.THEME, validTheme, { expires })
        commit('setTheme', validTheme)
    }
}

export const mutations = {
    setTheme (state, theme) {
        state.theme = theme
    }
}
