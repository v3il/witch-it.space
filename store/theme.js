import { Cookies } from '~/shared'

const DEFAULT_THEME = 'dark'

export const state = () => ({
    theme: DEFAULT_THEME
})

export const actions = {
    setTheme ({ commit }, theme) {
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        this.$cookies.set(Cookies.THEME, theme ?? DEFAULT_THEME, { expires })

        commit('setTheme', theme ?? DEFAULT_THEME)
    }
}

export const mutations = {
    setTheme (state, theme) {
        state.theme = theme
    }
}
