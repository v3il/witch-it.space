<template>
  <div class="wit-flex wit-flex--column wit-profiles-page">
    <div class="wit-profiles-page__content">
      <div class="wis-block--max-width">
        <Search store-module="profiles" />
        <ProfilesView :profiles="sortedProfiles" />
      </div>
    </div>

    <ProfilesFilter />
  </div>
</template>

<script>
import { computed, useAsync, useContext, useStore } from '@nuxtjs/composition-api'
import { ProfilesFilter, ProfilesView } from '@/components/profiles'
import { ProfilesFiltersScheme } from '@/domain/models/schemes/index.js'
import { Search } from '@/components/basic/index.js'
import { Routes } from '@/shared/index.js'

const Modes = {
    VERIFIED: 'verified',
    ALL: 'allProfiles'
}

export default {
    components: {
        ProfilesView,
        Search,
        ProfilesFilter
    },

    setup () {
        const { $usersService, $http } = useContext()
        const store = useStore()
        const sortedProfiles = computed(() => store.getters['profiles/sortedProfiles'])

        console.error($http)

        const profiles = useAsync(() => $usersService.fetchAll(), 'profiles')

        // console.error(r.value.profiles)

        // store.commit('profiles/SET_DATA', 1)

        // console.error(sortedProfiles)

        return { sortedProfiles: profiles }
    }

    // async asyncData ({ store, $usersService }) {
    //     await store.dispatch('profiles/setData', {
    //         defaultFilters: ProfilesFiltersScheme.getDefaultFilters(),
    //         defaultSorts: ProfilesFiltersScheme.getDefaultSorts(),
    //         availableSorts: ProfilesFiltersScheme.getAvailableSorts()
    //     })
    //
    //     const { profiles } = $usersService.fetchAll()
    //     return { profiles }
    //
    //     // await store.dispatch('profiles/fetchProfiles')
    //
    //     // TODO: error page
    //
    //     // if (!profile) {
    //     //     return error({ statusCode: 404, linkTitle: $t('Profiles_BackToProfilesList'), linkUrl: Routes.PROFILES })
    //     // }
    // }
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
