<template>
  <SidebarPanel :is-visible="isFiltersOpen" @close="closeFilters">
    <SortsSelector
      class="wiz-border--top wit-padding-top--sm wit-padding-bottom--sm wiz-border--bottom wit-offset-bottom--sm"
      :sorts="sorts"
      :available-sorts="$options.availableSorts"
      @updateOrderBy="updateOrderBy($event)"
      @toggleOrder="toggleOrder"
      @resetSorts="resetSortParams"
    />

    <b-button type="is-danger" expanded @click="fullReset">
      {{ $t('Clear') }}
    </b-button>
  </SidebarPanel>
</template>

<script>
import { mapActions } from 'vuex'
import { computed, useStore } from '@nuxtjs/composition-api'
import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'
import CharacterSelector from '@/components/basic/filters/CharacterSelector.vue'
import QueryEditor from '@/components/basic/filters/QueryEditor.vue'
import SortsSelector from '@/components/basic/filters/SortsSelector.vue'
import { StoreModules } from '@/store/index.js'
import { SidebarPanel } from '@/components/basic/index.js'

export default {
    name: 'ProfilesFilter',

    availableSorts: [
        { value: 'marketSize', label: 'Profiles_Sort_Market' },
        { value: 'name', label: 'Profiles_Sort_Name' },
        { value: 'wishlistSize', label: 'Profiles_Sort_Wishlist' }
    ],

    components: {
        RaritiesSelector,
        EventsSelector,
        SlotsSelector,
        CharacterSelector,
        QueryEditor,
        SortsSelector,
        SidebarPanel
    },

    methods: {
        ...mapActions(StoreModules.FILTERS, {
            mergeFilters: 'mergeFilters',
            updateFilters: 'updateFilters',
            resetFilterParam: 'resetFilterParam',
            resetSorts: 'resetSorts',
            resetSortsAndFilters: 'resetSortsAndFilters',
            toggleSortOrder: 'toggleSortOrder',
            toggleOrderBy: 'toggleOrderBy'
        }),

        update (changedFilters) {
            this.mergeFilters(changedFilters)
        },

        reset (propName) {
            this.resetFilterParam(propName)
        },

        updateOrderBy (orderBy) {
            this.toggleOrderBy(orderBy)
        },

        toggleOrder () {
            this.toggleSortOrder()
        },

        resetSortParams () {
            this.resetSorts()
        },

        fullReset () {
            this.resetSortsAndFilters()
            this.closeFilters()
        }
    },

    setup () {
        const store = useStore()

        const filters = computed(() => store.state.filters.filters)
        const sorts = computed(() => store.state.filters.sorts)
        const isFiltersOpen = computed(() => store.state.filters.isFiltersOpen)

        const closeFilters = () => store.dispatch('filters/closeFilters')

        return { filters, sorts, isFiltersOpen, closeFilters }
    }
}
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
