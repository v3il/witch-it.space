import { Cookies, config } from '~/shared'

export const state = () => ({
    locale: config.DEFAULT_LOCALE
})

export const actions = {
    setLocale ({ commit }, locale) {
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        const validLocale = locale ?? config.DEFAULT_LOCALE

        this.$cookies.set(Cookies.LOCALE, validLocale, { expires })
        commit('setLocale', validLocale)
    }
}

export const mutations = {
    setLocale (state, locale) {
        state.locale = locale
    }
}
