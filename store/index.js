import { Items, Locale, Root, Theme, User, Wishlist } from '@/store/Types'
import { Cookies } from '~/shared'
import { StoreModules } from '@/store/StoreModules.js'

export const state = () => ({})

export const actions = {
    async nuxtServerInit ({ commit }, { app, $itemsService, store }) {
        // await app.store.dispatch(Theme.F.Actions.SET_THEME, app.$cookies.get(Cookies.THEME))
        // await app.store.dispatch(Locale.F.Actions.SET_LOCALE, app.$cookies.get(Cookies.LOCALE))
        await app.store.dispatch('items/fetchItems')

        await app.store.dispatch('user/fetchUser')
            .catch(console.error)
    },

    nuxtClientInit ({ commit }, { store, $itemsService }) {
        // todo
        window.items = store.state.items.items
        $itemsService.setItems(store.state.items.items || [])
    }
}

export const mutations = {}

export const strict = false

export { Theme, User, Locale, Root, Items, Wishlist, StoreModules }
