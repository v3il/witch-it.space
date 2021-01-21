import { Cookies, config, Locales, en, ua, ru } from '~/shared'
import { Locale, User } from '@/store/Types'

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
    [Locale.Actions.SET_LOCALE] ({ commit, rootState }, locale) {
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        const validLocale = locale ?? config.DEFAULT_LOCALE

        this.$cookies.set(Cookies.LOCALE, validLocale, { expires })
        commit(Locale.Mutations.SET_LOCALE, validLocale)

        const user = rootState.user.user

        if (user && user.locale !== locale) {
            this.$axios.post('/api/user/locale', { locale }).catch(console.error)
        }
    }
}

export const mutations = {
    [Locale.Mutations.SET_LOCALE] (state, locale) {
        state.locale = locale
    }
}
