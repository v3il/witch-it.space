import { filtersActions, filtersMutations, filtersState } from '@/shared/filters'
import { usersService } from '@/domain'
import { User } from '@/domain/models'

export const state = () => ({
    ...filtersState(),
    profiles: []
})

export const getters = {
    filteredProfiles (state) {
        const lowerCasedQuery = state.filters.query.toLowerCase()

        return state.profiles.filter((profile) => {
            return lowerCasedQuery ? profile.displayName.toLowerCase().includes(lowerCasedQuery) : true
        })
    },

    sortedProfiles (state, getters) {
        const { sortBy, order } = state.sorts
        const isAsc = order === 'asc'

        return Array.from(getters.filteredProfiles).sort((a, b) => {
            const first = isAsc ? a : b
            const second = isAsc ? b : a

            switch (sortBy) {
            case 'marketSize':
                return first.marketSize - second.marketSize
            case 'wishlistSize':
                return first.wishlistSize - second.wishlistSize
            case 'name':
                return first.displayName.localeCompare(second.displayName)
            }

            return 0
        })
    }
}

export const actions = {
    ...filtersActions,

    async fetchProfiles ({ commit }) {
        const { profiles } = await usersService.fetchAll()
        commit('SET_PROFILES', profiles)
    }
}

export const mutations = {
    ...filtersMutations,

    SET_PROFILES (state, profiles) {
        state.profiles = profiles // .map(profile => User.create(profile))
    }
}
