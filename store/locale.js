import { Cookies, config } from '~/shared'

export const state = () => ({
    locale: config.DEFAULT_LOCALE
})

export const actions = {
    setLocale ({ commit }, locale) {
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        this.$cookies.set(Cookies.LOCALE, locale ?? config.DEFAULT_LOCALE, { expires })

        commit('setLocale', locale ?? config.DEFAULT_LOCALE)
    }
}

export const mutations = {
    setLocale (state, locale) {
        state.locale = locale
    }
}
