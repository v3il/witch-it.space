import { sampleSize } from 'lodash'

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        profiles: []
    }),

    getters: {
        profilesCount: state => state.profiles.length
    },

    actions: {
        async fetchProfiles () {
            const { data } = await useFetch('/api/profiles/fetch')

            this.profiles = data.value.profiles
        },

        getRandomProfiles (count) {
            return sampleSize(this.profiles, count)
        }
    }
})
