import { sampleSize } from 'lodash'

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        profiles: []
    }),

    getters: {
        profilesCount: state => state.profiles.length,
        verifiedProfilesCount: state => state.profiles.filter(({ isVerified }) => isVerified).length
    },

    actions: {
        async fetchProfiles () {
            const { data } = await useFetch('/api/profiles/fetch', {
                headers: useRequestHeaders(['cookie'])
            })

            this.profiles = data.value.profiles
        },

        getRandomProfiles (count) {
            return sampleSize(this.profiles, count)
        }
    }
})
