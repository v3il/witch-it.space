import Cookies from 'js-cookie'

const COOKIE_NAME = 'wit.theme'
const DEFAULT_THEME = 'dark'

export const state = () => ({
    theme: DEFAULT_THEME
})

export const actions = {
    async getThemeFromCookie (d1, d) {
        const theme = await Cookies.get(COOKIE_NAME) ?? DEFAULT_THEME

        console.error(this)

        d1.commit('setTheme', theme)
    },

    setTheme ({ commit }, theme) {
        // const theme = await Cookies.get(COOKIE_NAME) ?? DEFAULT_THEME

        console.error(this)

        const d = new Date()
        d.setFullYear(d.getFullYear() + 1)

        this.$cookies.set(COOKIE_NAME, theme, { expires: d })

        commit('setTheme', theme)
    }
}

export const mutations = {
    setTheme (state, theme) {
        // console.error(d)
        state.theme = theme
        // Cookies.set(COOKIE_NAME, theme, { expires: 365 })
    }
}
