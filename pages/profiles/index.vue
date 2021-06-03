<template>
  <div class="wis-profiles">
    <ProfilesFilter :filters-data="filtersData" class="wit-offset-bottom--sm wit-offset-left--auto wit-offset-right--auto" @change="onFiltersChange" />

    <Loader v-if="isLoading" />

    <div v-else-if="filteredProfiles.length" class="wit-flex wit-flex--wrap wis-profiles__grid">
      <div v-for="profile in filteredProfiles" :key="profile.id" class="wit-paddings--xs wis-profiles__profile-container">
        <ProfileView :profile="profile" class="wit-block--full-height" />
      </div>
    </div>

    <EmptyState v-else :text="$t('Profiles_NoProfiles')" />
  </div>
</template>

<script>
import ProfilesFilter from '@/components/profiles/ProfilesFilter'
import ProfileView from '@/components/profiles/ProfileView'

export default {
    components: {
        ProfilesFilter,
        ProfileView
    },

    middleware: ['fetchUser'],

    data: () => ({
        profiles: [],
        isLoading: false,

        filtersData: {
            query: '',
            isSteamGuarded: false
        }
    }),

    computed: {
        filteredProfiles () {
            const lowerCasedQuery = this.filtersData.query.toLowerCase()
            return this.profiles.filter((profile) => {
                const isFilteredByName = profile.displayName.toLowerCase().includes(lowerCasedQuery)
                const isFilteredBySteamGuard = this.filtersData.isSteamGuarded ? profile.isGuardProtected : true

                return isFilteredByName && isFilteredBySteamGuard
            })
        }
    },

    async created () {
        await this.loadProfiles()
    },

    methods: {
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
        }
    }
}
</script>

<style scoped lang="scss">
.wis-profiles {
    padding: var(--offset-md) var(--offset-md) var(--offset-sm);

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
</style>
