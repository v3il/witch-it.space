export const useCurrentUserStore = defineStore('currentUser', {
    state: () => ({
        myProfile: null
    }),

    getters: {
        isAuthorized: state => state.myProfile !== null,
        isVerified: ({ myProfile }) => myProfile ? !!myProfile.steamId && !!myProfile.steamTradeLink : false
    },

    actions: {
        async fetchMyProfile () {
            const { data } = await useFetch('/api/profiles/me', {
                headers: useRequestHeaders(['cookie'])
            })

            this.myProfile = data.value.profile
        }
    }
})
