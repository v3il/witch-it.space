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
</script>

<style scoped lang="scss">
.wit-profiles-page__content {
    width: 100%;
    padding: 24px;
}
</style>
