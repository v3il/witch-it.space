<template>
  <div class="wit-wishlist-editor wit-flex wit-flex--column">
    <div class="wit-wishlist-editor__header">
      <div class="wit-flex wit-flex--align-center wit-block--full-height">
        <b-button type="is-primary is-light" class="wit-transition wit-offset-right--xs" @click="$emit('close')">
          {{ $t('Close') }}
        </b-button>
      </div>
    </div>

    <div class="wit-flex wit-wishlist-editor__container wit-flex__item--grow">
      <div class="wit-wishlist-editor__items-container wit-offset-right--sm wit-paddings--sm wit-background--content wit-flex wit-flex--column">
        <WishlistFilters
          :default-filters="$options.defaultFilters"
          :filters="filters"
          :default-sort="$options.defaultSort"
          :sort="sort"
          class="wit-offset-bottom--xs"
          @filtersChanged="onFiltersChange"
          @sortChanged="onSortChange"
        />

        <ItemsList :items="sortedItems" class="wit-wishlist-editor__items wit-flex__item--grow" />
      </div>

      <Card class="wit-wishlist-editor__editor">
        1
      </Card>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'
import Card from '@/components/basic/Card.vue'
import { eventsManager, raritiesManager, slotsManager } from '@/shared/index.js'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'

const DEFAULT_FILTERS = {
    query: '',
    rarities: [],
    slots: [],
    events: [],
    hideRecipes: true
}

const DEFAULT_SORT = {
    sortBy: 'rarity',
    order: 'desc'
}

export default {
    name: 'WishlistEditor',

    defaultFilters: { ...DEFAULT_FILTERS },
    defaultSort: { ...DEFAULT_SORT },

    rarities: raritiesManager.getTradeable(),
    events: eventsManager.getAll(),
    slots: slotsManager.getAll(),

    sorts: {
        rarity: 'Items_Sort_Rarity',
        name: 'Items_Sort_Name'
    },

    components: {
        ItemsList,
        Card,
        WishlistFilters
    },

    data: () => ({
        filters: { ...DEFAULT_FILTERS },
        sort: { ...DEFAULT_SORT }
    }),

    computed: {
        items () {
            return Object.values(this.$store.state.items.items)/* .slice(0, 100) */.filter(item => item.isTradeable)
        },

        filteredItems () {
            const items = this.items
            const lowerCasedQuery = this.filters.query.toLowerCase()

            return items.filter((item) => {
                const isFilteredByName = lowerCasedQuery ? item.name.toLowerCase().includes(lowerCasedQuery) : true
                const isFilteredByRarity = this.filters.rarities.length ? this.filters.rarities.includes(item.rarity) : true
                const isFilteredByEvent = this.filters.events.length ? this.filters.events.includes(item.event) : true
                const isFilteredBySlot = this.filters.slots.length ? this.filters.slots.includes(item.slot) : true
                const isFilteredByTradeable = this.filters.isOnlyTradeable ? item.isTradeable : true

                return isFilteredByRarity &&
                    isFilteredBySlot &&
                    isFilteredByName &&
                    isFilteredByTradeable &&
                    isFilteredByEvent
            })
        },

        sortedItems () {
            const { sortBy, order } = this.sort
            const isAsc = order === 'asc'

            return Array.from(this.filteredItems).sort((a, b) => {
                const first = isAsc ? a : b
                const second = isAsc ? b : a

                switch (sortBy) {
                case 'rarity':
                    return first.quality - second.quality
                case 'name':
                    return first.name.localeCompare(second.name)
                }

                return 0
            })
        }
    },

    created () {
        console.log(111, this.filters)
        console.log(this.$options.defaultFilters)
        console.log(this.sort)
        console.log(this.$options.defaultSort)
    },

    methods: {
        onFiltersChange (filters) {
            this.filters = filters
        },

        onSortChange (sort) {
            this.sort = sort
        }
    }
}
</script>

<style scoped lang="scss">
.wit-wishlist-editor {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: calc(var(--zindex-fixed) + 1);
    background-color: var(--body-bg);
}

.wit-wishlist-editor__header {
    background-color: var(--header-bg);
    flex: 0 0 50px;
    position: sticky;
    top: 0;
    padding: 0 var(--offset-sm);
}

.wit-wishlist-editor__container {
    max-height: calc(100% - 50px);
    padding: var(--offset-sm);
}

.wit-wishlist-editor__items-container {
    flex: 1;
    border-radius: var(--offset-xxs);
    //overflow-y: scroll;
}

//.wit-wishlist-editor__items {
//    overflow-y: scroll;
//    padding-right: var(--offset-xs);
//}

.wit-wishlist-editor__editor {
    flex: 0 0 450px;
    overflow-y: scroll;
}
</style>
