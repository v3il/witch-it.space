<template>
    <div class="wit-flex wit-flex--column wit-profiles-page">
        <ProfilesHeader />

        <div class="wit-profiles-page__content container-sm">
            <FiltersSearch class="mb-4" />
            <ProfilesView :profiles="sortedProfiles" />
        </div>

        <ProfilesFilter />
    </div>
</template>

<script setup>
import { ProfilesHeader, ProfilesView } from '@/components/profiles'
import { useProfilesStore } from '~/store/profiles'
import { useFiltersStore } from '~/store/filters'
import { ProfilesFilterScheme } from '~/domain/models/filter/ProfilesFilterScheme'

const filtersStore = useFiltersStore()

filtersStore.setDefaultState({
    defaultFilter: ProfilesFilterScheme.getDefaultFilter(),
    defaultSort: ProfilesFilterScheme.getDefaultSort(),
    availableSorts: ProfilesFilterScheme.getAvailableSorts()
})

filtersStore.updateStateFromRoute()

const profilesStore = useProfilesStore()

await profilesStore.fetchProfiles()

const sortedProfiles = computed(() => profilesStore.sortedProfiles)

// console.log(profilesStore.filteredUsers)

// export default {
//     components: {
//         ProfilesView,
//         Search,
//         ProfilesFilter,
//         ProfilesHeader
//     },
//
//     setup () {
//         const store = useStore()
//         const sortedProfiles = computed(() => store.getters['profiles/sortedProfiles'])
//
//         store.commit('profiles/MAP_PROFILES')
//
//         return { sortedProfiles }
//     },
//
//     async asyncData ({ store }) {
//         await store.dispatch('profiles/setData', {
//             defaultFilters: ProfilesFilters.getDefaultFilters(),
//             defaultSorts: ProfilesFilters.getDefaultSorts(),
//             availableSorts: ProfilesFilters.getAvailableSorts()
//         })
//
//         console.error('ASYNC')
//
//         await store.dispatch('profiles/fetchProfiles')
//
//         // TODO: error page
//
//         // if (!profile) {
//         //     return error({ statusCode: 404, linkTitle: $t('Profiles_BackToProfilesList'), linkUrl: Routes.PROFILES })
//         // }
//     }
// }
</script>

<style scoped lang="scss">
.wit-profiles-page__content {
    width: 100%;
    padding: 24px;
}
</style>
