<template>
    <div class="wit-flex wit-flex--column wit-profiles-page">
        <ProfilesHeader />

        <div class="wit-profiles-page__content container-sm">
            <div class="wis-block--max-width">
                <FiltersSearch class="mb-4" />
                <ProfilesView :profiles="filteredUsers" />
            </div>
        </div>

        <ProfilesFilter />
    </div>
</template>

<script setup>
// import { computed, useStore } from '@nuxtjs/composition-api'
import { ProfilesFilter, ProfilesHeader, ProfilesView } from '@/components/profiles'
import { useProfilesStore } from '~/store/profiles'
import { useFiltersStore } from '~/store/filters'
import { SortOrders } from '~/shared/items'
// import { ProfilesFilters } from '@/domain/models/schemes/index.js'
// import { Search } from '@/components/basic/index.js'

const Modes = {
    VERIFIED: 'verified',
    ALL: 'allProfiles'
}

const router = useRouter()
const filtersStore = useFiltersStore()

filtersStore.setDefaultState({
    defaultFilter: { query: '' },
    defaultSort: { sortBy: 'marketSize', order: SortOrders.DESC },
    availableSorts: ['marketSize', 'name', 'wishlistSize']
})

filtersStore.updateStateFromRoute()

const profilesStore = useProfilesStore()
const profiles = computed(() => profilesStore.profiles)
const filteredUsers = computed(() => profilesStore.filteredUsers)

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
.wit-profiles-page {
    //min-height: 100vh;
}

.wit-profiles-page__content {
    width: 100%;
    padding: 24px;
}
</style>
