<template>
  <SidebarPanel :is-visible="isFiltersOpen" @close="closeFilters">
    <QueryEditor
      :query="filters.query"
      class="wis-wishlist-filters__search wit-offset-bottom--sm"
      @update="update({ query: $event })"
      @reset="reset('query')"
    />

    <RaritiesSelector
      :selected-rarities="filters.rarities"
      class="wit-offset-bottom--sm"
      @update="update({ rarities: $event })"
      @reset="reset('rarities')"
    />

    <CharacterSelector
      :selected-character="filters.character"
      class="wit-offset-bottom--sm"
      @update="update({ character: $event })"
      @reset="reset('character')"
    />

    <EventsSelector
      :selected-events="filters.events"
      class="wit-offset-bottom--sm"
      @update="update({ events: $event })"
      @reset="reset('events')"
    />

    <SlotsSelector
      :selected-slots="filters.slots"
      class="wit-offset-bottom--sm"
      @update="update({ slots: $event })"
      @reset="reset('slots')"
    />

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
    name: 'ItemsFilters',

    availableSorts: [
        { value: 'rarity', label: 'Items_Sort_Rarity' },
        { value: 'name', label: 'Items_Sort_Name' }
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
        ...mapActions('offers', {
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

        const filters = computed(() => store.state.offers.filters)
        const sorts = computed(() => store.state.offers.sorts)
        const isFiltersOpen = computed(() => store.state.offers.isFiltersOpen)

        const closeFilters = () => store.dispatch('offers/closeFilters')

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
