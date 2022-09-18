export const state = () => ({
    usersCount: 0,
    randomAvatars: []
})

export const actions = {
    loadGlobalData ({ commit }) {
        return this.$axios.$get('/api/global')
            .then(({ usersCount, randomAvatars }) => {
                console.log(555, usersCount, randomAvatars)
                commit('SET_USERS_COUNT', usersCount)
                commit('SET_RANDOM_AVATARS', randomAvatars)
            })
            .catch(console.error)
    }
}

export const mutations = {
    SET_USERS_COUNT (state, usersCount) {
        state.usersCount = usersCount
    },

    SET_RANDOM_AVATARS (state, randomAvatars) {
        state.randomAvatars = randomAvatars
    }
}
