<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <div class="wit-font-size--sm">
          {{ $t('MainMenu_Profiles') }}
        </div>
      </template>

      <template #topMenu>
        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="switchMode">
          <template #tab0>
            {{ $t('Profiles_VerifiedProfiles') }}
            <span class="wit-top-tabs__counter wit-offset-left--xxs">{{ verifiedProfiles.length }}</span>
          </template>

          <template #tab1>
            {{ $t('Profiles_AllProfiles') }}
            <span class="wit-top-tabs__counter wit-offset-left--xxs">{{ profiles.length }}</span>
          </template>
        </TopTabs>
      </template>
    </TopNavBar>

    <main class="wis-profiles">
      <Card>
        <Filters
          ref="filters"
          :filters="filters"
          :sort="sort"
          :default-filters="$options.defaultFilters"
          :default-sort="$options.defaultSort"
          :query-input-placeholder="$t('Profiles_SearchByUsername')"
          :sorts="$options.sorts"
          class="wit-offset-bottom--xxs"
          @filtersChanged="onFiltersChange"
          @sortChanged="onSortChange"
        >
          <template #default="{ filterParams, update }">
            <b-switch :value="filterParams.isSteamGuarded" @input="update({ isSteamGuarded: $event })">
              {{ $t('Profiles_SteamGuardedOnly') }}
            </b-switch>
          </template>
        </Filters>

        <div v-if="filteredProfiles.length" class="wit-flex wit-flex--wrap wis-profiles__grid">
          <div v-for="profile in sortedProfiles" :key="profile.id" class="wit-paddings--xs wis-profiles__profile-container">
            <UserView
              :profile="profile"
              class="wit-block--full-height wit-profile-view"
              hide-icons
              hide-social-buttons
              hide-trade-button
              hide-note
              :avatar-size="50"
              mode="market"
            />
          </div>
        </div>

        <EmptyState v-else :text="$t('Profiles_NoProfiles')" icon="account-multiple-remove" class="wit-padding-top--sm" />
      </Card>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card'
import TopNavBar from '@/components/TopNavBar'
import { User } from '@/store'
import TopTabs from '@/components/TopTabs'
import { getFiltersFromRoute, getSortFromRoute } from '@/utils'
import UserView from '@/components/UserView'
import Filters from '@/components/Filters.vue'

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
        Card,
        TopNavBar,
        TopTabs,
        UserView,
        Filters
    },

    middleware: ['fetchUser'],

    async asyncData ({ app: { $userService } }) {
        const { error, profiles } = await $userService.fetchAll()
        return { error, profiles }
    },

    data: () => ({
        mode: Modes.VERIFIED,
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
                    return first.userStat.marketSize - second.userStat.marketSize
                case 'wishlist':
                    return first.userStat.wishlistSize - second.userStat.wishlistSize
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
        if (this.error) {
            this.$showError(this.error)
        }

        this.filters = getFiltersFromRoute(this.$route, this.$options.defaultFilters)
        this.sort = getSortFromRoute(this.$route, this.$options.defaultSort, this.$options.sorts)
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
.wis-profiles {
    padding: var(--offset-md);

    @media screen and (max-width: 1024px) {
        padding: var(--offset-sm);
    }
}

.wit-profile-view {
    border-radius: var(--offset-xs);
    border: 1px solid #36394c;
    padding: 0 var(--offset-md);
}

.wis-profiles__grid {
    display: grid;
    margin-left: calc(-1 * var(--offset-xs));
    margin-right: calc(-1 * var(--offset-xs));
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
