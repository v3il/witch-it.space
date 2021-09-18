export const state = () => ({
    list: [],
    user: null
})

export const actions = {
    async fetchUser ({ commit }) {
        const { data } = await this.$axios.get('/api/user')

        console.error('User2', data.user)

        commit('setUser', data.user)
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
