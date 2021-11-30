import { Theme, User, Root, Locale, Items, Wishlist } from '@/store/Types'
import { Cookies } from '~/shared'

export const state = () => ({})

export const actions = {
    async nuxtServerInit ({ commit }, { app, $itemsService }) {
        await app.store.dispatch(Theme.F.Actions.SET_THEME, app.$cookies.get(Cookies.THEME))
        await app.store.dispatch(Locale.F.Actions.SET_LOCALE, app.$cookies.get(Cookies.LOCALE))

        console.log($itemsService.fetch)

        await $itemsService.fetch()
    }
}

export const mutations = {}

export { Theme, User, Locale, Root, Items, Wishlist }
