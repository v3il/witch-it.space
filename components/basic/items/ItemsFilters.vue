<template>
  <SidebarPanel :is-visible="isFiltersOpen" @close="closeFilters">
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
import { computed, useStore } from '@nuxtjs/composition-api'
import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'
import CharacterSelector from '@/components/basic/filters/CharacterSelector.vue'
import QueryEditor from '@/components/basic/filters/QueryEditor.vue'
import SortsSelector from '@/components/basic/filters/SortsSelector.vue'
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

    props: {
        storeModuleName: {
            required: true,
            type: String
        }
    },

    setup (props) {
        const store = useStore()

        const filters = computed(() => store.state[props.storeModuleName].filters)
        const sorts = computed(() => store.state[props.storeModuleName].sorts)
        const isFiltersOpen = computed(() => store.state[props.storeModuleName].isFiltersOpen)

        const closeFilters = () => store.dispatch(props.storeModuleName + '/closeFilters')
        const mergeFilters = changedFilters => store.dispatch(props.storeModuleName + '/mergeFilters', changedFilters)
        const resetFilterParam = propName => store.dispatch(props.storeModuleName + '/resetFilterParam', propName)
        const resetSorts = () => store.dispatch(props.storeModuleName + '/resetSorts')
        const resetSortsAndFilters = () => store.dispatch(props.storeModuleName + '/resetSortsAndFilters')
        const toggleSortOrder = () => store.dispatch(props.storeModuleName + '/toggleSortOrder')
        const toggleOrderBy = orderBy => store.dispatch(props.storeModuleName + '/toggleOrderBy', orderBy)

        return {
            filters,
            sorts,
            isFiltersOpen,
            closeFilters,
            mergeFilters,
            resetFilterParam,
            resetSorts,
            resetSortsAndFilters,
            toggleSortOrder,
            toggleOrderBy
        }
    },

    methods: {
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
    }
}
</script>
