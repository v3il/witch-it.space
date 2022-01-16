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
          <div class="wit-wishlist-editor__items-container wit-background--content wit-flex wit-flex--column">
            <WishlistFilters
              :default-filters="$options.defaultFilters"
              :filters="filters"
              :default-sort="$options.defaultSort"
              :sort="sort"
              class="wit-wishlist-editor__items-filter"
              @filtersChanged="onFiltersChange"
              @sortChanged="onSortChange"
            />

            <VPopover placement="right-end">
              <button>Click me</button>

              <template slot="popover">
                <a v-close-popover>Close</a>
              </template>
            </VPopover>

            <ItemsList :items="sortedItems" class="wit-wishlist-editor__items-list wit-flex__item--grow">
              <template #default="{ visibleItems }">
                <ItemView
                  v-for="item in visibleItems"
                  :key="item.id"
                  :item="item"
                  :class="{ 'wit-selected-item': isItemSelected(item) }"
                  @clicked="onItemClicked"
                >
                  <div v-if="isItemInWishlist(item)" class="wit-position--absolute wit-background--content wit-item__icon-container">
                    <i class="mdi mdi-heart mdi-18px wit-color--white wit-item__icon" />
                  </div>
                </ItemView>
              </template>
            </ItemsList>
          </div>

          <div class="wit-wishlist-editor__editor wit-paddings--sm wit-offset-left--sm wit-background--content">
            <div style="overflow-y: scroll;" class="wit-block--full-height">
              <WishlistSelectedItem v-for="wi in selectedItems" :key="wi.prices.length" :wishlist-item="wi" class="wit-offset-bottom--sm" />

              <!--              {{ selectedItems }}-->

              <!--              <p v-for="wi in selectedItems" :key="wi.item.id">-->
              <!--                {{ wi.item.id }}-->
              <!--              </p>-->
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import ItemView from '@/components/items/ItemView.vue'
import { WishlistItem } from '@/models/WishlistItem.js'
import WishlistSelectedItem from '@/components/wishlist/WishlistSelectedItem.vue'

const DEFAULT_FILTERS = {
    query: 'mand',
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

    components: {
        ItemsList,
        WishlistFilters,
        TopNavBar,
        EmptyState,
        ItemView,
        WishlistSelectedItem
    },

    async asyncData ({ app: { $userService, $wishlistService }, route, store }) {
        const items = store.state.items.items

        const { profile } = await $userService.fetch(route.params.id)
        const { wishlist } = await $wishlistService.fetch(route.params.id)

        // console.log(wishlist.map((w) => {
        //     return WishlistItem.fromSaved(items[w.itemId], w.prices)
        // }))

        return {
            profile,
            wishlist: wishlist.map((w) => {
                console.error(items[w.itemId])
                return WishlistItem.fromSaved({ id: 0, item: items[w.itemId], prices: w.prices })
            }),
            error: null
        }
    },

    data: () => ({
        filters: { ...DEFAULT_FILTERS },
        sort: { ...DEFAULT_SORT },
        selectedItems: []
    }),

    computed: {
        items () {
            return Object.values(this.$store.state.items.items).filter(item => item.isTradeable)
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
                case 'wishlistStatus':
                    return this.isItemInWishlist(first) - this.isItemInWishlist(second)
                }

                return 0
            })
        }
    },

    created () {
        // this.selectedItems = [this.wishlist[0]]

        console.log(this.wishlist[0])
        console.log(this.wishlist[0].prices)
    },

    methods: {
        onFiltersChange (filters) {
            this.filters = filters
        },

        onSortChange (sort) {
            this.sort = sort
        },

        onItemClicked (item) {
            const a = this.wishlist.find(wi => wi.item?.id === item?.id)

            if (a) {
                console.log(222, a)
                return this.selectedItems.push(a)
            }

            if (this.isItemSelected(item)) {
                return this.removeFromSelected(item)
            }

            this.selectedItems.push(WishlistItem.fromNew({ item }))
        },

        removeFromSelected (item) {
            this.selectedItems = this.selectedItems.filter(wishlistItem => wishlistItem.item !== item)
        },

        isItemSelected (item) {
            return this.selectedItems.some(wishlistItem => wishlistItem.item === item)
        },

        isItemInWishlist (item) {
            return [903, 902, 904].includes(item.id)

            // return this.wishlist.some(wishlistItem => wishlistItem.itemId === item.id)
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
    padding: var(--offset-sm) var(--offset-xs);
}

.wit-wishlist-editor__items-filter {
    padding: 0 var(--offset-xs);
}

.wit-wishlist-editor__items-list {
    padding: var(--offset-xs) var(--offset-xs) 0;
}

.wit-wishlist-editor__editor {
    flex: 0 0 450px;
}

.wit-selected-item {
    box-shadow: 0 0 6px 3px var(--color);
}

.wit-item__icon-container {
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--danger);
}

.wit-item__icon {
    width: 18px;
    height: 18px;
    text-align: center;
}
</style>
