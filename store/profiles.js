import { sampleSize } from 'lodash'
import { useFiltersStore } from '~/store/filters'
import { ProfilesFilterScheme } from '~/domain/models/filter/ProfilesFilterScheme'
import { SortOrders } from '~/shared/items'

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        profiles: []
    }),

    getters: {
        profilesCount: state => state.profiles.length,
        verifiedProfilesCount: state => state.profiles.filter(({ isVerified }) => isVerified).length,

        filteredUsers: (state) => {
            const filters = useFiltersStore()

            console.error(filters.filter.query)

            return state.profiles.filter(profile => profile.displayName.includes(filters.filter.query))
        },

        filteredProfiles (state) {
            const filtersStore = useFiltersStore()
            const lowerCasedQuery = filtersStore.filter.query.toLowerCase()

            return state.profiles.filter((profile) => {
                return lowerCasedQuery ? profile.displayName.toLowerCase().includes(lowerCasedQuery) : true
            })
        },

        sortedProfiles () {
            const filtersStore = useFiltersStore()
            const { sortBy, order } = filtersStore.sort
            const isAsc = order === SortOrders.ASC

            return Array.from(this.filteredProfiles).sort((a, b) => {
                const first = isAsc ? a : b
                const second = isAsc ? b : a

                switch (sortBy) {
                case ProfilesFilterScheme.Sorts.MARKET:
                    return first.marketSize - second.marketSize
                case ProfilesFilterScheme.Sorts.WISHLIST:
                    return first.wishlistSize - second.wishlistSize
                case ProfilesFilterScheme.Sorts.NAME:
                    return first.displayName.localeCompare(second.displayName)
                }

                return 0
            })
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
