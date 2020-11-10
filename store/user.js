export const state = () => ({
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
            throw e
        }
    },

    login ({ commit, dispatch }, credentials) {
        // try {
        return this.$axios.post('/api/auth/login', credentials)
        // } catch (e) {
        //     console.log(111222, e.response ? e.response.data : e.data)
        // }
        // try {
        //     const { data } = await this.$axios.post('/api/auth/login', credentials)
        //     const { user } = data
        //
        //     // console.error('User succ')
        //
        //     commit('setUser', user)
        //
        //     await dispatch('theme/setTheme', user.theme)
        //     await dispatch('locale/setLocale', user.locale)
        // } catch (e) {
        //     // console.error('User error')
        //     commit('setUser', null)
        //     throw e
        // }
    }
}

export const mutations = {
    setUser (state, user) {
        state.user = user
    }
}
