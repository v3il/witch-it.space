import { sampleSize } from 'lodash'

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        profiles: []
    }),

    getters: {
        profilesCount: state => state.profiles.length
    },

    actions: {
        async fetchProfilesCount () {
            const { data } = await useFetch('/api/profiles/public')

            this.profiles = data.value.profiles
        },

        getRandomProfiles (count) {
            return sampleSize(this.profiles, count)
        }
    }
})
