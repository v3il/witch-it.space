import { sampleSize } from 'lodash'
import { useFiltersStore } from '~/store/filters'

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        profiles: []
    }),

    getters: {
        profilesCount: state => state.profiles.length,
        verifiedProfilesCount: state => state.profiles.filter(({ isVerified }) => isVerified).length,

        test: (state) => {
            const filters = useFiltersStore()

            console.error(filters.filter.query)

            return filters.filter.query
        }
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
