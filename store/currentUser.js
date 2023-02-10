export const useCurrentUserStore = defineStore('currentUser', {
    state: () => ({
        currentUser: null
    }),

    getters: {
        isAuthorized: state => state.currentUser !== null,
        isVerified: ({ currentUser }) => currentUser ? !!currentUser.steamId && !!currentUser.steamTradeLink : false
    },

    actions: {
        async fetchCurrentUser () {
            const { data } = await useFetch('/api/profiles/me', {
                headers: useRequestHeaders(['cookie'])
            })

            this.currentUser = data.value.profile
        },

        clearUser () {
            this.currentUser = null
        }
    }
})
