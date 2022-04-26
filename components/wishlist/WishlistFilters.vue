<template>
  <FiltersView @reset="$emit('reset')" @close="$emit('close')">
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
      class="wiz-border--top wit-padding-top--sm wit-padding-bottom--sm wiz-border--bottom"
      :sorts="sorts"
      :available-sorts="$options.availableSorts"
      @updateOrderBy="updateOrderBy($event)"
      @toggleOrder="toggleOrder"
      @resetSorts="$emit('resetSorts')"
    />
  </FiltersView>
</template>

<script>
import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'
import CharacterSelector from '@/components/basic/filters/CharacterSelector.vue'
import QueryEditor from '@/components/basic/filters/QueryEditor.vue'
import SortsSelector from '@/components/basic/filters/SortsSelector.vue'
import FiltersView from '@/components/basic/filters/FiltersView.vue'

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
        }
    },

    methods: {
        update (changedFilters) {
            this.$emit('changeFilters', changedFilters)
        },

        reset (propName) {
            this.$emit('resetFilter', propName)
        },

        updateOrderBy (orderBy) {
            this.$emit('updateOrderBy', orderBy)
        },

        toggleOrder () {
            this.$emit('toggleOrder')
        }
    }
}
</script>

<style scoped lang="scss">
.wis-wishlist-filters {
    border-radius: var(--offset-xxs);
    width: 275px;
    background-color: var(--content-bg);
    margin-left: var(--offset-sm);
    position: sticky;
    top: var(--offset-sm);
    height: auto;
    padding: var(--offset-sm);
    align-self: flex-start;
    overflow-y: auto;
    overscroll-behavior: contain;
    max-height: calc(100vh - 60px - 32px);
}

.wis-wishlist-filters__search,
.wis-wishlist-filters__close {
    display: none;
}

@media (max-width: 1100px) {
    .wis-wishlist-filters {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: calc(var(--navbar-z) + 1);
        margin: 0;
        width: auto;
        min-height: 100vh;
        max-height: 100vh;
        padding: var(--offset-sm);
        background-color: rgba(0, 0, 0, 0.7);
    }

    .wis-wishlist-filters__content {
        width: 300px;
        background-color: var(--content-bg);
        padding: var(--offset-sm);
        border-radius: var(--offset-xxs);
        height: 100%;
        margin: 0 auto;
    }

    .wis-wishlist-filters__search,
    .wis-wishlist-filters__close {
        display: flex;
    }
}
</style>
