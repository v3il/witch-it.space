import { Theme, User, Root, Locale } from '@/store/Types'
import { Cookies } from '~/shared'

export const state = () => ({
    errors: []
})

export const getters = {
    hasErrors: state => state.errors.length > 0,
    firstError: state => state.errors[0]
}

export const actions = {
    async nuxtServerInit ({ commit }, { app }) {
        await app.store.dispatch(Theme.Actions.SET_THEME, app.$cookies.get(Cookies.THEME))
        await app.store.dispatch(Locale.Actions.SET_LOCALE, app.$cookies.get(Cookies.LOCALE))
    }
}

export const mutations = {
    setErrors (state, errors) {
        state.errors = errors
    },

    resetErrors (state) {
        state.errors = []
    }
}

export { Theme, User, Locale, Root }
