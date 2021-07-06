<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        {{ $t('MainMenu_Profiles') }}
      </template>

      <template #topMenu>
        <ul class="wit-flex wit-flex--center wit-top-tabs">
          <li class="wit-top-tabs__tab wit-flex wit-flex--align-center wit-offset-right--md" :class="getTopNavLinkClass('all')">
            <b-button type="is-ghost" class="wit-top-tabs__button" @click="mode = 'all'">
              {{ hasFilteredProfiles ? 'Filtered Profiles' : 'All Profiles' }}
              <span class="wit-top-tabs__counter">{{ profilesCount }}</span>
            </b-button>
          </li>

          <li class="wit-top-tabs__tab wit-flex wit-flex--align-center" :class="getTopNavLinkClass('me')">
            <b-button type="is-ghost" class="wit-top-tabs__button" @click="mode = 'me'">
              My Profile
            </b-button>
          </li>
        </ul>
      </template>
    </TopNavBar>

    <main class="wis-profiles">
      <Card>
        <ProfilesFilter :filters-data="filtersData" class="wit-offset-left--auto wit-offset-right--auto" @change="onFiltersChange" />

        <div class="wit-padding-top--sm wit-padding-bottom--sm">
          <Loader v-if="isLoading" />

          <div v-else-if="mode === 'me'" class="wit-flex wit-flex--wrap wis-profiles__grid">
            <div class="wit-paddings--xs wis-profiles__profile-container">
              <ProfileView :profile="me" class="wit-block--full-height" />
            </div>
          </div>

          <div v-else-if="filteredProfiles.length" class="wit-flex wit-flex--wrap wis-profiles__grid">
            <div v-for="profile in filteredProfiles" :key="profile.id" class="wit-paddings--xs wis-profiles__profile-container">
              <ProfileView :profile="profile" class="wit-block--full-height" />
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
import ProfileView from '@/components/profiles/ProfileView'
import Card from '@/components/Card'
import TopNavBar from '@/components/TopNavBar'
import { User } from '@/store'

export default {
    components: {
        ProfilesFilter,
        ProfileView,
        Card,
        TopNavBar
    },

    middleware: ['fetchUser'],

    data: () => ({
        mode: 'all',
        profiles: [],
        isLoading: false,

        filtersData: {
            query: '',
            isSteamGuarded: false
        }
    }),

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        hasFilteredProfiles () {
            return this.profiles.length !== this.filteredProfiles.length
        },

        me () {
            return this.profiles.find(profile => profile.id === this.user.id)
        },

        filteredProfiles () {
            const lowerCasedQuery = this.filtersData.query.toLowerCase()
            return this.profiles.filter((profile) => {
                const isFilteredByName = lowerCasedQuery ? profile.displayName.toLowerCase().includes(lowerCasedQuery) : true
                const isFilteredBySteamGuard = this.filtersData.isSteamGuarded ? profile.isGuardProtected : true

                return isFilteredByName && isFilteredBySteamGuard
            })
        },

        profilesCount () {
            return this.hasFilteredProfiles ? this.filteredProfiles.length : this.profiles.length
        }
    },

    watch: {
        filtersData: {
            handler (filtersData) {
                if (isEqual(this.filtersData, this.$route.query)) {
                    return
                }

                this.$router.replace({ path: this.$route.path, query: filtersData })
            }
        },

        $route: {
            deep: true,
            handler () {
                this.getFiltersFromRoute()
            }
        }
    },

    async created () {
        this.getFiltersFromRoute()
        await this.loadProfiles()
    },

    methods: {
        getFiltersFromRoute () {
            const { query: params } = this.$route

            this.filtersData.query = params.query ?? ''
            this.filtersData.isSteamGuarded = params.isSteamGuarded === 'true'
        },

        async loadProfiles () {
            this.isLoading = true

            try {
                const { data } = await this.$axios.get('/api/profiles')
                this.profiles = data.profiles
            } catch (e) {
                this.$showError(e)
            }

            this.isLoading = false
        },

        onFiltersChange (filtersData) {
            this.filtersData = filtersData
        },

        getTopNavLinkClass (linkTag) {
            return {
                active: linkTag === this.mode
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wis-profiles {
    padding: var(--offset-md);

    @media screen and (max-width: 1024px) {
        padding-left: 0;
        padding-right: 0;
    }
}

.wis-profiles__grid {
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(-1 * var(--offset-xs));
    margin-right: calc(-1 * var(--offset-xs));
}

.wis-profiles__profile-container {
    flex: 0 0 auto;

    @media screen and (max-width: 767px) {
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        width: 50%;
    }

    @media (min-width: 1200px) {
        width: 33.33333%;
    }

    @media (min-width: 1920px) {
        width: 25%;
    }

    @media (min-width: 2500px) {
        width: 20%;
    }
}

.wit-top-tabs__button {
    &,
    &:active,
    &:focus,
    &:hover {
        color: var(--white);
        text-decoration: none;
        padding: 0;
    }
}

.wit-top-tabs__tab {
    border-bottom: 2px solid transparent;
    height: 100%;
    transition: border-color var(--default-transition);

    &.active {
        border-color: var(--warning);

        .wit-top-tabs__button {
            //color: var(--success);
        }
    }
}

.wit-top-tabs__counter {
    display: inline-block;
    padding: 0 8px;
    background-color: #dbdbdb;
    border-radius: 50px;
    font-size: 12px;
    line-height: 1.4;
    margin-left: 4px;
    color: #222736;
    font-weight: 700;
}
</style>
