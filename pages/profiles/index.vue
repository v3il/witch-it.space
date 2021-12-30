<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        {{ $t('MainMenu_Profiles') }}
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
        <ProfilesFilter :filters-data="filters" class="wit-offset-bottom--sm" @change="onFiltersChange" />

        <div v-if="filteredProfiles.length" class="wit-flex wit-flex--wrap wis-profiles__grid">
          <div v-for="profile in filteredProfiles" :key="profile.id" class="wit-paddings--xs wis-profiles__profile-container">
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

        <EmptyState v-else :text="$t('Profiles_NoProfiles')" />
      </Card>
    </main>
  </div>
</template>

<script>
import { isEqual } from 'lodash'
import { mapState } from 'vuex'
import ProfilesFilter from '@/components/profiles/ProfilesFilter'
import Card from '@/components/Card'
import TopNavBar from '@/components/TopNavBar'
import { User } from '@/store'
import TopTabs from '@/components/TopTabs'
import { getObjectsDiff } from '@/utils'
import UserView from '@/components/UserView'

const Modes = {
    VERIFIED: 'verified',
    ALL: 'allProfiles'
}

const DEFAULT_FILTERS = {
    query: '',
    isSteamGuarded: false
}

export default {
    modes: Object.values(Modes),

    components: {
        ProfilesFilter,
        Card,
        TopNavBar,
        TopTabs,
        UserView
    },

    middleware: ['fetchUser'],

    async asyncData ({ app: { $userService } }) {
        const { error, profiles } = await $userService.fetchAll()
        return { error, profiles }
    },

    data: () => ({
        mode: Modes.VERIFIED,
        filters: { ...DEFAULT_FILTERS }
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

        verifiedProfiles () {
            return this.profiles.filter((profile) => {
                return profile.steamTradeLink && profile.discordId && profile.steamId
            })
        }
    },

    watch: {
        filters: {
            deep: true,
            handler (filters) {
                const routeFilters = this.getFiltersFromRoute()

                if (isEqual(filters, routeFilters)) {
                    return
                }

                const changedFilters = getObjectsDiff(DEFAULT_FILTERS, filters)
                this.$router.replace({ path: this.$route.path, query: changedFilters })
            }
        },

        $route: {
            deep: true,
            handler () {
                this.filters = this.getFiltersFromRoute()
            }
        }
    },

    created () {
        if (this.error) {
            this.$showError(this.error)
        }

        this.filters = this.getFiltersFromRoute()
    },

    methods: {
        getFiltersFromRoute () {
            const { query: params } = this.$route

            return {
                query: params.query ?? DEFAULT_FILTERS.query,
                isSteamGuarded: params.isSteamGuarded === 'true' ?? DEFAULT_FILTERS.isSteamGuarded
            }
        },

        onFiltersChange (filters) {
            this.filters = filters
        },

        resetFilter (filterProp) {
            this.filters[filterProp] = DEFAULT_FILTERS[filterProp]
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
        padding: var(--offset-xs);
    }
}

.wit-profile-view {
    border-radius: var(--offset-xs);
    border: 1px solid #36394c;
    padding: 0 var(--offset-md);
}

.wis-profiles__grid {
    display: grid;
    flex-wrap: wrap;
    margin-left: calc(-1 * var(--offset-xs));
    margin-right: calc(-1 * var(--offset-xs));
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
</style>
