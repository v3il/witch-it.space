import { Theme, User, Root, Locale, Items, Wishlist } from '@/store/Types'
import { Cookies } from '~/shared'

export const state = () => ({})

export const actions = {
    async nuxtServerInit ({ commit }, { app }) {
        await app.store.dispatch(Theme.F.Actions.SET_THEME, app.$cookies.get(Cookies.THEME))
        await app.store.dispatch(Locale.F.Actions.SET_LOCALE, app.$cookies.get(Cookies.LOCALE))
        await app.store.dispatch(User.F.Actions.FETCH_USER)
        await app.store.dispatch(Items.F.Actions.FETCH_ITEMS)
    },

    nuxtClientInit ({ commit }, { store, $itemsService }) {
        console.log('Client!!!', store.state.items.items, $itemsService)
    }
}

export const mutations = {}

export { Theme, User, Locale, Root, Items, Wishlist }
