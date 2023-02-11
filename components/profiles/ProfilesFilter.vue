<template>
    <div>filters</div>
<!--  <SidebarPanel :is-visible="isFiltersOpen" from="right" icon="filter" :title="$t('Filter')" @close="closeFilters">-->
<!--    <div class="wit-paddings&#45;&#45;md">-->
<!--      <SortsSelector-->
<!--        class="wit-padding-top&#45;&#45;sm wit-padding-bottom&#45;&#45;sm wiz-border&#45;&#45;bottom wit-offset-bottom&#45;&#45;sm"-->
<!--        :sorts="sorts"-->
<!--        :available-sorts="$options.availableSorts"-->
<!--        @updateOrderBy="updateOrderBy($event)"-->
<!--        @toggleOrder="toggleOrder"-->
<!--        @resetSorts="resetSortParams"-->
<!--      />-->

<!--      <b-button type="is-danger" expanded @click="fullReset">-->
<!--        {{ $t('Clear') }}-->
<!--      </b-button>-->
<!--    </div>-->
<!--  </SidebarPanel>-->
</template>

<script>
// import { mapActions } from 'vuex'
// import { computed, useStore } from '@nuxtjs/composition-api'
// import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
// import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
// import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'
// import CharacterSelector from '@/components/basic/filters/CharacterSelector.vue'
// import QueryEditor from '@/components/basic/filters/QueryEditor.vue'
// import SortsSelector from '@/components/basic/filters/SortsSelector.vue'
// import { StoreModules } from '@/store/index.js'
// import { SidebarPanel } from '@/components/basic/index.js'
//
// export default {
//     name: 'ProfilesFilter',
//
//     availableSorts: [
//         { value: 'marketSize', label: 'Profiles_Sort_Market' },
//         { value: 'name', label: 'Profiles_Sort_Name' },
//         { value: 'wishlistSize', label: 'Profiles_Sort_Wishlist' }
//     ],
//
//     components: {
//         RaritiesSelector,
//         EventsSelector,
//         SlotsSelector,
//         CharacterSelector,
//         QueryEditor,
//         SortsSelector,
//         SidebarPanel
//     },
//
//     setup () {
//         const store = useStore()
//
//         const filters = computed(() => store.state.profiles.filters)
//         const sorts = computed(() => store.state.profiles.sorts)
//         const isFiltersOpen = computed(() => store.state.profiles.isFiltersOpen)
//
//         const closeFilters = () => store.dispatch('profiles/closeFilters')
//
//         return { filters, sorts, isFiltersOpen, closeFilters }
//     },
//
//     methods: {
//         ...mapActions('profiles', {
//             mergeFilters: 'mergeFilters',
//             updateFilters: 'updateFilters',
//             resetFilterParam: 'resetFilterParam',
//             resetSorts: 'resetSorts',
//             resetSortsAndFilters: 'resetSortsAndFilters',
//             toggleSortOrder: 'toggleSortOrder',
//             toggleOrderBy: 'toggleOrderBy'
//         }),
//
//         update (changedFilters) {
//             this.mergeFilters(changedFilters)
//         },
//
//         reset (propName) {
//             this.resetFilterParam(propName)
//         },
//
//         updateOrderBy (orderBy) {
//             this.toggleOrderBy(orderBy)
//         },
//
//         toggleOrder () {
//             this.toggleSortOrder()
//         },
//
//         resetSortParams () {
//             this.resetSorts()
//         },
//
//         fullReset () {
//             this.resetSortsAndFilters()
//             this.closeFilters()
//         }
//     }
// }
</script>

<style scoped lang="scss">
.wis-wishlist-filters__search {
    display: none;
}

@media (max-width: 1200px) {
    .wis-wishlist-filters__search {
        display: flex;
    }
}
</style>
