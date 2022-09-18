export const state = () => ({
    usersCount: 0
})

export const actions = {
    loadGlobalData ({ commit }) {
        return this.$axios.$get('/api/global')
            .then(({ usersCount }) => {
                console.log(555, usersCount)
                commit('SET_USERS_COUNT', usersCount)
            })
            .catch(console.error)
    }
}

export const mutations = {
    SET_USERS_COUNT (state, usersCount) {
        state.usersCount = usersCount
    }
}
