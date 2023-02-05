import { sampleSize } from 'lodash'

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        profiles: []
    }),

    getters: {
        profilesCount: state => state.profiles.length
    },

    actions: {
        fetchProfilesCount () {
            const { data } = useFetch('/api/profiles/public')

            this.profiles = data.value.profiles
        },

        getRandomProfiles (count) {
            return sampleSize(this.profiles, count)
        }
    }
})
