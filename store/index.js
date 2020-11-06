import { Cookies } from '~/shared'

export const state = () => ({
    list: [],
    user: null
})

export const actions = {
    async fetchUser ({ commit, dispatch }) {
        try {
            const { data } = await this.$axios.get('/api/user')
            const { user } = data

            // console.error('User succ')

            commit('setUser', user)

            await dispatch('theme/setTheme', user.theme)
            await dispatch('locale/setLocale', user.locale)
        } catch (e) {
            // console.error('User error')
            commit('setUser', null)
        }
    },

    async nuxtServerInit ({ commit }, { app }) {
        await app.store.dispatch('theme/setTheme', app.$cookies.get(Cookies.THEME))
        await app.store.dispatch('locale/setLocale', app.$cookies.get(Cookies.LOCALE))
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
