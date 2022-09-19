export const state = () => ({
    usersCount: 0,
    randomUsers: []
})

export const actions = {
    loadGlobalData ({ commit }) {
        return this.$axios.$get('/api/global')
            .then(({ usersCount, randomUsers }) => {
                commit('SET_USERS_COUNT', usersCount)
                commit('SET_RANDOM_USERS', randomUsers)
            })
            .catch(console.error)
    }
}

export const mutations = {
    SET_USERS_COUNT (state, usersCount) {
        state.usersCount = usersCount
    },

    SET_RANDOM_USERS (state, randomUsers) {
        state.randomUsers = randomUsers
    }
}
