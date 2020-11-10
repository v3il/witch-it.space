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
        await app.store.dispatch('theme/setTheme', app.$cookies.get(Cookies.THEME))
        await app.store.dispatch('locale/setLocale', app.$cookies.get(Cookies.LOCALE))
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
