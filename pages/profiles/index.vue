<template>
  <div class="wit-flex wit-flex--column wit-profiles-page">
    <ProfilesHeader />

    <div class="wit-profiles-page__content">
      <div class="wis-block--max-width">
        <Search store-module="profiles" class="wit-profiles-page__search" />
        <ProfilesView :profiles="sortedProfiles" />
      </div>
    </div>

    <ProfilesFilter />
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { ProfilesFilter, ProfilesHeader, ProfilesView } from '@/components/profiles'
import { ProfilesFiltersScheme } from '@/domain/models/schemes/index.js'
import { Search } from '@/components/basic/index.js'

const Modes = {
    VERIFIED: 'verified',
    ALL: 'allProfiles'
}

export default {
    components: {
        ProfilesView,
        Search,
        ProfilesFilter,
        ProfilesHeader
    },

    setup () {
        const store = useStore()
        const sortedProfiles = computed(() => store.getters['profiles/sortedProfiles'])

        return { sortedProfiles }
    },

    async asyncData ({ store }) {
        await store.dispatch('profiles/setData', {
            defaultFilters: ProfilesFiltersScheme.getDefaultFilters(),
            defaultSorts: ProfilesFiltersScheme.getDefaultSorts(),
            availableSorts: ProfilesFiltersScheme.getAvailableSorts()
        })

        await store.dispatch('profiles/fetchProfiles')

        // TODO: error page

        // if (!profile) {
        //     return error({ statusCode: 404, linkTitle: $t('Profiles_BackToProfilesList'), linkUrl: Routes.PROFILES })
        // }
    }
}
</script>

<style scoped lang="scss">
.wit-profiles-page {
    min-height: 100vh;
}

.wit-profiles-page__content {
    width: 100%;
    padding: 0 24px;
}

.wit-profiles-page__search {
    padding-left: 0;
    padding-right: 0;
}
</style>
