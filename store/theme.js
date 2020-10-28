import Cookies from 'js-cookie'

const COOKIE_NAME = 'wit.theme'
const DEFAULT_THEME = 'dark'

export const state = () => ({
    theme: DEFAULT_THEME
})

export const actions = {
    getThemeFromCookie ({ commit }) {
        const theme = Cookies.get(COOKIE_NAME) ?? DEFAULT_THEME
        commit('setTheme', theme)
    }
}

export const mutations = {
    setTheme (state, theme) {
        state.theme = theme
        Cookies.set(COOKIE_NAME, theme, { expires: 365 })
    }
}
