import { Cookies } from '~/shared'

export const state = () => ({
    list: [],
    user: null
})

export const actions = {
    async fetchUser ({ commit }) {
        try {
            const { data } = await this.$axios.get('/api/user')

            // console.error('User succ')

            commit('setUser', data.user)
        } catch (e) {
            // console.error('User error')
            commit('setUser', null)
        }
    },

    async nuxtServerInit ({ commit }, { app }) {
        // console.log(store.state)

        await app.store.dispatch('theme/setTheme', app.$cookies.get(Cookies.THEME))
        await app.store.dispatch('locale/setLocale', app.$cookies.get(Cookies.LOCALE))

        // app.i18n.locale = app.store.state.locale

        // await app.store.dispatch('i18n/setLocale', store.state.locale.locale)

        // console.log(store.state.locale.locale)

        // app.i18n.locale = (store.state.locale.locale)
        // await app.i18n.setLocale(store.state.locale.locale)
    }
}

export const mutations = {
    setUser (state, user) {
        state.user = user
    },

    add (state, text) {
        state.list.push({
            text,
            done: false
        })
    },
    remove (state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle (state, todo) {
        todo.done = !todo.done
    }
}
