import { Theme, User, Root, Locale, Items, Wishlist } from '@/store/Types'
import { Cookies, Routes } from '~/shared'
import { StoreModules } from '@/store/StoreModules.js'

export const state = () => ({})

export const actions = {
    async nuxtServerInit ({ commit }, { app, $itemsService, redirect }) {
        console.error('NSI')

        await app.store.dispatch(Theme.F.Actions.SET_THEME, app.$cookies.get(Cookies.THEME))
        await app.store.dispatch(Locale.F.Actions.SET_LOCALE, app.$cookies.get(Cookies.LOCALE))

        await app.store.dispatch('user/fetchUser')
            .then(() => app.store.dispatch(Items.F.Actions.FETCH_ITEMS))
            .then(() => $itemsService.setItems(app.store.state.items.items))
            .catch(console.error)

        // await app.store.dispatch(Items.F.Actions.FETCH_ITEMS)

        // .then(() => app.store.dispatch(Items.F.Actions.FETCH_ITEMS))
        // .then(() => $itemsService.setItems(app.store.state.items.items))

        // const isAuthorized = false // app.store.getters['user/isAuthorized']
        //
        // if (isAuthorized) {
        //
        // }
    },

    nuxtClientInit ({ commit }, { store, $itemsService }) {
        console.error('NCI')

        console.error(store)

        const isAuthorized = store.getters['user/isAuthorized']

        if (isAuthorized) {
            $itemsService.setItems(store.state.items.items)
        }
    }
}

export const mutations = {}

export const strict = false

export { Theme, User, Locale, Root, Items, Wishlist, StoreModules }
