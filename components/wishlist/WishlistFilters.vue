<template>
  <Filters
    :filters="filters"
    :is-filters-changed="isFiltersChanged"
    :is-sorts-changed="isSortsChanged"
    :sorts="sorts"
    :query-input-placeholder="$t('Items_SearchByItemName')"
    @filtersChanged="$emit('filtersChanged', $event)"
    @sortChanged="$emit('sortChanged', $event)"
    @resetFilter="$emit('resetFilter', $event)"
    @resetFilters="$emit('resetFilters')"
  >
    <template #default="{ filterParams, update, reset }">
      <RaritiesSelector
        :selected-rarities="filterParams.rarities"
        class="wit-offset-bottom--sm"
        @update="update({ rarities: $event })"
        @reset="reset('rarities')"
      />

      <EventsSelector
        :selected-events="filterParams.events"
        class="wit-offset-bottom--sm"
        @update="update({ events: $event })"
        @reset="reset('events')"
      />

      <SlotsSelector
        :selected-slots="filterParams.slots"
        class="wit-offset-bottom--sm"
        @update="update({ slots: $event })"
        @reset="reset('slots')"
      />

      <div>
        <b-switch :value="filterParams.hideRecipes" @input="update({ hideRecipes: $event })">
          {{ $t('Items_Filters_HideRecipes') }}
        </b-switch>
      </div>
    </template>

    <template #sorting-dropdown="{ updateSortBy }">
      <Dropdown position="end">
        <template #trigger>
          <b-button icon-right="menu-down" class="wit-flex wit-flex--center wit-filter__sort-button wit-split-part--left">
            <span class="wit-color--muted wit-inline-block1 wit-offset-right--xxs">{{ $t('SortedBy') }}:</span>
            <span class="wit-color--white">{{ sortByTitle }}</span>
          </b-button>
        </template>

        <template #items>
          <DropdownItem @click="updateSortBy('rarity')">
            {{ $t('Items_Sort_Rarity') }}
          </DropdownItem>

          <DropdownItem @click="updateSortBy('name')">
            {{ $t('Items_Sort_Name') }}
          </DropdownItem>
        </template>
      </Dropdown>
    </template>
  </Filters>
</template>

<script>
import Filters from '@/components/basic/Filters.vue'
import { eventsManager, raritiesManager, slotsManager } from '@/shared/index.js'
import DropdownItem from '@/components/basic/dropdown/DropdownItem.vue'
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'

export default {
    name: 'WishlistFilters',

    rarities: raritiesManager.getTradeable(),
    events: eventsManager.getAll(),
    slots: slotsManager.getAll(),

    components: {
        Filters,
        DropdownItem,
        Dropdown,
        RaritiesSelector,
        EventsSelector,
        SlotsSelector
    },

    props: {
        filters: {
            required: true,
            type: Object
        },

        isFiltersChanged: {
            required: true,
            type: Boolean
        },

        sorts: {
            required: true,
            type: Object
        },

        isSortsChanged: {
            required: true,
            type: Boolean
        }
    },

    computed: {
        sortByTitle () {
            return this.sorts.sortBy === 'rarity' ? this.$t('Items_Sort_Rarity') : this.$t('Items_Sort_Name')
        }
    }
}
</script>
