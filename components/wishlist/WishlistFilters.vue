<template>
  <div>
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

    <b-button type="is-danger" expanded>
      <div class="wit-flex wit-flex--align-center">
        Clear
      </div>
    </b-button>
  </div>
</template>

<script>
import Filters from '@/components/basic/Filters.vue'
import { eventsManager, raritiesManager, slotsManager } from '@/shared/index.js'
import DropdownItem from '@/components/basic/dropdown/DropdownItem.vue'
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'
import CharacterSelector from '@/components/basic/filters/CharacterSelector.vue'

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
        SlotsSelector,
        CharacterSelector
    },

    props: {
        filters: {
            required: true,
            type: Object
        },

        sorts: {
            required: true,
            type: Object
        }
    },

    computed: {
        sortByTitle () {
            return this.sorts.sortBy === 'rarity' ? this.$t('Items_Sort_Rarity') : this.$t('Items_Sort_Name')
        }
    },

    methods: {
        update (changedFilters) {
            this.$emit('changeFilters', changedFilters)
        },

        reset (propName) {
            this.$emit('resetFilter', propName)
        }
    }
}
</script>
