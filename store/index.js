import { Theme, User, Root, Locale, Items } from '@/store/Types'
import { Cookies } from '~/shared'

export const state = () => ({})

export const actions = {
    async nuxtServerInit ({ commit }, { app }) {
        await app.store.dispatch(Theme.F.Actions.SET_THEME, app.$cookies.get(Cookies.THEME))
        await app.store.dispatch(Locale.F.Actions.SET_LOCALE, app.$cookies.get(Cookies.LOCALE))
    }
}

export const mutations = {}

export { Theme, User, Locale, Root, Items }
