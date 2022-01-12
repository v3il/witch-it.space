<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <div class="wit-font-size--sm">
          {{ $t('MainMenu_EditWishlist') }}
        </div>
      </template>
    </TopNavBar>

    <div class="wit-profile wit-flex">
      <template v-if="error">
        <EmptyState :text="$t('Profiles_ProfileNotFound')" icon="account-remove" class="wit-padding-top--sm wit-block--full-width">
          <nuxt-link to="/profiles" class="wit-padding-top--xs">
            {{ $t('Profiles_BackToProfilesList') }}
          </nuxt-link>
        </EmptyState>
      </template>

      <template v-else>
        <div class="wit-flex wit-paddings--sm wit-flex__item--grow">
          <div class="wit-wishlist-editor__items-container wit-paddings--sm wit-background--content wit-flex wit-flex--column">
            <WishlistFilters
              :default-filters="$options.defaultFilters"
              :filters="filters"
              :default-sort="$options.defaultSort"
              :sort="sort"
              class="wit-offset-bottom--xs"
              @filtersChanged="onFiltersChange"
              @sortChanged="onSortChange"
            />

            <ItemsList :items="sortedItems" class="wit-flex__item--grow">
              <template #default="{ visibleItems }">
                <ItemView
                  v-for="item in visibleItems"
                  :key="item.id"
                  :item="item"
                  :class="{test: selectedItems.includes(item)}"
                  @clicked="onItemClicked"
                />
              </template>
            </ItemsList>
          </div>

          <div class="wit-wishlist-editor__editor wit-paddings--sm wit-offset-left--sm wit-background--content">
            <div style="overflow-y: scroll;" class="wit-block--full-height">
              {{ selectedItems }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'
import { eventsManager, raritiesManager, slotsManager } from '@/shared/index.js'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import ItemView from '@/components/items/ItemView.vue'

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
        WishlistFilters,
        TopNavBar,
        EmptyState,
        ItemView
    },

    async asyncData ({ app: { $userService, $wishlistService }, route }) {
        const { profile } = await $userService.fetch(route.params.id)
        const { wishlist } = await $wishlistService.fetch(route.params.id)
        return { profile, wishlist, error: null }
    },

    data: () => ({
        filters: { ...DEFAULT_FILTERS },
        sort: { ...DEFAULT_SORT },
        selectedItems: []
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

    methods: {
        onFiltersChange (filters) {
            this.filters = filters
        },

        onSortChange (sort) {
            this.sort = sort
        },

        onItemClicked (item) {
            if (this.selectedItems.includes(item)) {
                return this.selectedItems = this.selectedItems.filter(i => i !== item)
            }

            this.selectedItems.push(item)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profile {
    height: calc(100vh - var(--header-height));
    max-height: calc(100vh - var(--header-height));
}

.wit-wishlist-editor__items-container {
    flex: 1;
    border-radius: var(--offset-xxs);
}

.wit-wishlist-editor__editor {
    flex: 0 0 450px;
}

.test {
    box-shadow: 3px 3px 3px red;
}
</style>
