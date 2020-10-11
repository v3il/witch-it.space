export const state = () => ({
    list: [],
    user: null
})

export const actions = {
    async fetchUser ({ commit }) {
        try {
            const { data } = await this.$axios.get('/api/user')

            console.error('User succ')

            commit('setUser', data.user)
        } catch (e) {
            console.error('User error')
            commit('setUser', null)
        }
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
