import { sampleSize } from 'lodash'

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        myProfile: null,
        profiles: []
    }),

    getters: {
        profilesCount: state => state.profiles.length,
        isAuthorized: state => state.myProfile !== null
    },

    actions: {
        async fetchProfiles () {
            const { data } = await useFetch('/api/profiles/fetch')

            this.profiles = data.value.profiles
        },

        async fetchMyProfile () {
            const { data } = await useFetch('/api/profiles/me', {
                headers: useRequestHeaders(['cookie'])
            })

            this.myProfile = data.value.profile

            console.error(data.value.profile)
        },

        getRandomProfiles (count) {
            return sampleSize(this.profiles, count)
        }
    }
})
