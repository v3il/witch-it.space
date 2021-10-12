import { Cookies, config, Locales, en, ua, ru } from '~/shared'

export const state = () => ({
    locale: config.DEFAULT_LOCALE
})

export const getters = {
    lngSet: (state) => {
        return {
            [Locales.UA]: ua,
            [Locales.EN]: en,
            [Locales.RU]: ru
        }[state.locale] ?? {}
    }
}

export const actions = {
    setLocale ({ commit }, locale) {
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        const validLocale = locale ?? config.DEFAULT_LOCALE

        this.$cookies.set(Cookies.LOCALE, validLocale, { expires, path: '*', sameSite: true })
        commit('setLocale', validLocale)
    }
}

export const mutations = {
    setLocale (state, locale) {
        state.locale = locale
    }
}
