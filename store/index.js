import { Theme, User, Root, Locale, Items, Wishlist } from '@/store/Types'
import { Cookies } from '~/shared'
import { StoreModules } from '@/store/StoreModules.js'

export const state = () => ({})

export const actions = {
    async nuxtServerInit ({ commit }, { app, $itemsService }) {
        await app.store.dispatch(Theme.F.Actions.SET_THEME, app.$cookies.get(Cookies.THEME))
        await app.store.dispatch(Locale.F.Actions.SET_LOCALE, app.$cookies.get(Cookies.LOCALE))
        await app.store.dispatch(User.F.Actions.FETCH_USER) // todo: Fix

        const isAuthorized = app.store.getters['user/isAuthorized']

        if (isAuthorized) {
            await app.store.dispatch(Items.F.Actions.FETCH_ITEMS)
            $itemsService.setItems(app.store.state.items.items)
        }
    },

    nuxtClientInit ({ commit }, { store, $itemsService }) {
        const isAuthorized = store.getters['user/isAuthorized']

        if (isAuthorized) {
            $itemsService.setItems(store.state.items.items)
        }
    }
}

export const mutations = {}

export const strict = false

export { Theme, User, Locale, Root, Items, Wishlist, StoreModules }
