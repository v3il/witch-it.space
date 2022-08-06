<template>
  <div class="wit-flex wit-flex--column wit-profiles-page">
    <div class="wit-profiles-page__content">
      <div class=" wis-block--max-width">
        <ProfilesSearch />
        <ProfilesView :profiles="profiles" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Card from '@/components/basic/Card.vue'
// import TopNavBar from '@/components/header/TopNavBar.vue'
import { User } from '@/store'
// import TopTabs from '@/components/header/TopTabs.vue'
import { getFiltersFromRoute, getSortFromRoute } from '@/utils'
// import UserView from '@/components/user/UserView.vue'
// import Filters from '@/components/basic/Filters.vue'
// import EmptyState from '@/components/basic/EmptyState.vue'

import { ProfilesSearch, ProfilesView } from '@/components/profiles'
import { ItemsFiltersScheme, ProfilesFiltersScheme } from '@/domain/models/schemes/index.js'

const Modes = {
    VERIFIED: 'verified',
    ALL: 'allProfiles'
}

export default {
    modes: Object.values(Modes),

    defaultFilters: {
        query: '',
        isSteamGuarded: false
    },

    defaultSort: {
        sortBy: 'market',
        order: 'desc'
    },

    sorts: {
        market: 'Profiles_Sort_Market',
        wishlist: 'Profiles_Sort_Wishlist',
        name: 'Profiles_Sort_Name'
    },

    components: {
        // Card,
        // TopNavBar,
        // TopTabs,
        // UserView,
        // Filters,
        // EmptyState,
        ProfilesView,
        ProfilesSearch
    },

    // middleware: ['isAuthorized'],

    async asyncData ({ app: { $usersService, store } }) {
        await store.dispatch('filters/setData', {
            defaultFilters: ProfilesFiltersScheme.getDefaultFilters(),
            defaultSorts: ProfilesFiltersScheme.getDefaultSorts(),
            availableSorts: ProfilesFiltersScheme.getAvailableSorts()
        })

        const { error, profiles } = await $usersService.fetchAll()
        return { error, profiles }
    },

    data: () => ({
        mode: Modes.VERIFIED + 1,
        filters: {},
        sort: {}
    }),

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        filteredProfiles () {
            const profiles = this.mode === Modes.VERIFIED ? this.verifiedProfiles : this.profiles
            const lowerCasedQuery = this.filters.query.toLowerCase()

            return profiles.filter((profile) => {
                const isFilteredByName = lowerCasedQuery ? profile.displayName.toLowerCase().includes(lowerCasedQuery) : true
                const isFilteredBySteamGuard = this.filters.isSteamGuarded ? profile.isGuardProtected : true

                return isFilteredByName && isFilteredBySteamGuard
            })
        },

        sortedProfiles () {
            const { sortBy, order } = this.sort
            const isAsc = order === 'asc'

            return Array.from(this.filteredProfiles).sort((a, b) => {
                const first = isAsc ? a : b
                const second = isAsc ? b : a

                switch (sortBy) {
                case 'market':
                    return first.marketSize - second.marketSize
                case 'wishlist':
                    return first.wishlistSize - second.wishlistSize
                case 'name':
                    return first.displayName.localeCompare(second.displayName)
                }

                return 0
            })
        },

        verifiedProfiles () {
            return this.profiles.filter((profile) => {
                return profile.steamTradeLink && profile.discordId && profile.steamId
            })
        }
    },

    created () {
        this.filters = getFiltersFromRoute(this.$route, this.$options.defaultFilters)
        this.sort = getSortFromRoute(this.$route, this.$options.defaultSort, [])
    },

    mounted () {
        if (this.error) {
            this.$showError(this.error)
        }
    },

    methods: {
        onFiltersChange (filters) {
            this.filters = filters
        },

        onSortChange (sort) {
            this.sort = sort
        },

        switchMode (mode) {
            this.mode = mode
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profiles-page {
    min-height: 100vh;
}

.wit-profiles-page__content {
    width: 100%;
    padding: 24px;
}
</style>
