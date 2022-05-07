<template>
  <FiltersView :is-visible="isVisible" @reset="resetSortsAndFilters" @close="$emit('close')">
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
  </FiltersView>
</template>

<script>
import { mapActions } from 'vuex'
import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'
import CharacterSelector from '@/components/basic/filters/CharacterSelector.vue'
import QueryEditor from '@/components/basic/filters/QueryEditor.vue'
import SortsSelector from '@/components/basic/filters/SortsSelector.vue'
import FiltersView from '@/components/basic/filters/FiltersView.vue'
import { StoreModules } from '@/store/index.js'

export default {
    name: 'WishlistFilters',

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
        FiltersView
    },

    props: {
        filters: {
            required: true,
            type: Object
        },

        sorts: {
            required: true,
            type: Object
        },

        isVisible: {
            required: true,
            type: Boolean
        }
    },

    methods: {
        ...mapActions(StoreModules.FILTERS, {
            mergeFilters: 'mergeFilters',
            updateFilters: 'updateFilters',
            resetFilter: 'resetFilter',
            resetSorts: 'resetSorts',
            resetSortsAndFilters: 'resetSortsAndFilters',
            toggleSortOrder: 'toggleSortOrder',
            toggleOrderBy: 'toggleOrderBy'
        }),

        update (changedFilters) {
            this.mergeFilters(changedFilters)
        },

        reset (propName) {
            this.resetFilter(propName)
        },

        updateOrderBy (orderBy) {
            this.toggleOrderBy(orderBy)
        },

        toggleOrder () {
            this.toggleSortOrder()
        },

        resetSortParams () {
            this.resetSorts()
        }
    }
}
</script>

<style scoped lang="scss">
.wis-wishlist-filters__search {
    display: none;
}

@media (max-width: 1100px) {
    .wis-wishlist-filters__search {
        display: flex;
    }
}
</style>
