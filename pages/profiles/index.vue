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

        <div>
          <Loader v-if="isLoading" />

          <div v-else-if="isMyProfileMode" class="wit-flex wit-flex--wrap wis-profiles__grid">
            <div class="wit-paddings--xs wis-profiles__profile-container">
              <ProfileView :profile="myProfile" class="wit-block--full-height" />
            </div>
          </div>

          <div v-else-if="filteredProfiles.length" class="wit-flex wit-flex--wrap wis-profiles__grid">
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
        </div>
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

const modes = {
    VERIFIED: 'verified',
    ALL: 'allProfiles'
}

const DEFAULT_FILTERS = {
    query: '',
    isSteamGuarded: false
}

export default {
    modes: Object.values(modes),

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
        mode: modes.ALL,
        // profiles: [],
        isLoading: false,
        filters: { ...DEFAULT_FILTERS }
    }),

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        isMyProfileMode () {
            return this.mode === modes.ME
        },

        hasFilteredProfiles () {
            return this.profiles.length !== this.filteredProfiles.length
        },

        myProfile () {
            return this.profiles.find(profile => profile.id === this.user.id)
        },

        filteredProfiles () {
            const lowerCasedQuery = this.filters.query.toLowerCase()
            return this.profiles.filter((profile) => {
                const isFilteredByName = lowerCasedQuery ? profile.displayName.toLowerCase().includes(lowerCasedQuery) : true
                const isFilteredBySteamGuard = this.filters.isSteamGuarded ? profile.isGuardProtected : true

                return isFilteredByName && isFilteredBySteamGuard
            })
        },

        profilesCount () {
            return this.hasFilteredProfiles ? this.filteredProfiles.length : this.profiles.length
        },

        firstTabLabel () {
            const key = this.hasFilteredProfiles ? 'Profiles_FilteredProfiles' : 'Profiles_AllProfiles'
            return this.$t(key)
        },

        verifiedProfiles () {
            return this.profiles.filter((user) => {
                return user.steamTradeLink && user.discordId && user.steamId
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
            this.page = 1
        },

        resetFilter (filterProp) {
            this.filters[filterProp] = DEFAULT_FILTERS[filterProp]
            this.page = 1
        },

        // async loadProfiles () {
        //     this.isLoading = true
        //
        //     try {
        //         const { data } = await this.$axios.get('/api/profiles')
        //         this.profiles = data.profiles.sort((a, b) => b.userStat.marketSize - a.userStat.marketSize)
        //     } catch (e) {
        //         this.$showError(e)
        //     }
        //
        //     this.isLoading = false
        // },

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
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(-1 * var(--offset-xs));
    margin-right: calc(-1 * var(--offset-xs));
}

.wis-profiles__profile-container {
    flex: 0 0 auto;

    @media screen and (max-width: 600px) {
        width: 100%;
    }

    @media screen and (min-width: 601px) {
        width: 50%;
    }

    @media (min-width: 900px) {
        width: 33.3333%;
    }

    @media (min-width: 1450px) {
        width: 20%;
    }

    @media (min-width: 2500px) {
        width: 15%;
    }
}
</style>
