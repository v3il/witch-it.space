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
            <div class="wit-flex wit-flex--wrap-reverse wit-flex--justify-between">
              <Tabs :modes="$options.modes" :selected-mode="mode" class="wit-tabs-switcher" @switch="mode = $event">
                <template #tab0>
                  {{ $t('Wishlist_MyWishlist') }}
                  <b-tag rounded class="wit-offset-left--xxs wit-font-weight--700">
                    {{ filteredItemsInWishlist.length }}
                  </b-tag>
                </template>

                <template #tab1>
                  {{ $t('Wishlist_AllItems') }}
                  <b-tag rounded class="wit-offset-left--xxs wit-font-weight--700">
                    {{ filteredItems.length }}
                  </b-tag>
                </template>
              </Tabs>

              <WishlistFilters
                :default-filters="$options.defaultFilters"
                :filters="filters"
                :default-sort="$options.defaultSort"
                :sort="sort"
                :sorts="$options.sorts"
                class="wit-wishlist-editor__items-filter wit-offset-bottom--xs"
                @filtersChanged="onFiltersChange"
                @sortChanged="onSortChange"
              />

              <button @click="addAll">
                Add all
              </button>
            </div>

            <template v-if="isWishlistMode">
              <InfinityGrid v-if="sortedItemsInWishlist.length" :items="sortedItemsInWishlist" cell-width="130px" mobile-cell-width="140px" class="wit-wishlist-editor__items-list wit-flex__item--grow">
                <template #default="{ visibleItems }">
                  <ItemView
                    v-for="wishlistModel in visibleItems"
                    :key="wishlistModel.id"
                    :item="wishlistModel.item"
                    :class="{ 'wit-selected-item': isItemSelected(wishlistModel.item) }"
                    @clicked="toggleWishlistItem(wishlistModel)"
                  >
                    <ItemPriceList v-if="wishlistModel.prices.length" :prices="wishlistModel.prices" />
                  </ItemView>
                </template>
              </InfinityGrid>

              <EmptyState v-else icon="view-grid" :text="$t('Items_NoItems')" class="wit-padding-top--sm" />
            </template>

            <template v-if="isAllItemsMode">
              <InfinityGrid v-if="sortedItems.length" :items="sortedItems" cell-width="130px" mobile-cell-width="100px" class="wit-wishlist-editor__items-list wit-flex__item--grow">
                <template #default="{ visibleItems }">
                  <ItemView
                    v-for="item in visibleItems"
                    :key="item.id"
                    :item="item"
                    :class="{ 'wit-selected-item': isItemSelected(item) }"
                    @clicked="toggleItem"
                  >
                    <div v-if="isItemInWishlist(item)" v-tooltip.top="$t('Wishlist_AlreadyInWishlist')" class="wit-position--absolute wit-item__icon-container">
                      <i class="mdi mdi-heart mdi-18px wit-color--white wit-item__icon" />
                    </div>
                  </ItemView>
                </template>
              </InfinityGrid>

              <EmptyState v-else icon="view-grid" :text="$t('Items_NoItems')" class="wit-padding-top--sm" />
            </template>
          </div>

          <div class="wit-wishlist-editor__editor wit-paddings--sm wit-offset-left--sm wit-background--content wit-flex wit-flex--column">
            <div v-if="selectedItems.length" class="wit-flex__item--grow wit-flex wit-flex--column wit-block--full-height">
              <ScrollablePagination :items="selectedItems" :items-per-page="20" class="wit-offset-bottom--sm">
                <template #default="{ visibleItems }">
                  <WishlistSelectedItem
                    v-for="wi in visibleItems"
                    :key="wi.id"
                    :wishlist-item="wi"
                    :is-in-wishlist="isItemInWishlist(wi)"
                    class="wit-wishlist-editor__item"
                    @itemRemoved="toggleWishlistItem"
                    @delete="onDelete"
                  />
                </template>
              </ScrollablePagination>

              <!--              <InfinityGrid :items="selectedItems" cell-width="100%" mobile-cell-width="100%" class="wit-block&#45;&#45;full-height wit-offset-bottom&#45;&#45;sm">-->
              <!--                <template #default="{ visibleItems }">-->
              <!--                  <WishlistSelectedItem v-for="wi in visibleItems" :key="wi.id" :wishlist-item="wi" class="wit-wishlist-editor__item" @itemRemoved="toggleWishlistItem" />-->
              <!--                </template>-->
              <!--              </InfinityGrid>-->

              <div class="wit-flex__item--no-shrink wit-flex">
                <b-button type="is-danger" class="wit-flex__item--grow wit-offset-right--xs" expanded @click="saveWishlistItems">
                  Save
                </b-button>

                <b-button type="is-danger" expanded @click="removeSelected">
                  R
                </b-button>
              </div>
            </div>

            <div v-else class="wit-flex wit-flex--center wit-block--full-height wit-paddings--xs">
              <EmptyState icon="cursor-default-click-outline" :text="$t('Wishlist_SelectItemToEdit')" class="wit-padding-top--sm" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import ItemView from '@/components/items/ItemView.vue'
import WishlistSelectedItem from '@/components/wishlist/WishlistSelectedItem.vue'
import WishlistItemView from '@/components/wishlist/WishlistItemView.vue'
import TopTabs from '@/components/header/TopTabs.vue'
import { getFiltersFromRoute, getSortFromRoute } from '@/utils/index.js'
import Tabs from '@/components/basic/Tabs.vue'
import ItemPrice from '@/components/items/ItemPrice.vue'
import InfinityGrid from '@/components/basic/InfinityGrid.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'
import ScrollablePagination from '@/components/basic/ScrollablePagination.vue'

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

const Modes = {
    WISHLIST: 'wishlist',
    ALL_ITEMS: 'allItems'
}

export default {
    name: 'WishlistEditor',

    modes: Object.values(Modes),
    defaultFilters: { ...DEFAULT_FILTERS },
    defaultSort: { ...DEFAULT_SORT },

    sorts: {
        rarity: 'Items_Sort_Rarity',
        name: 'Items_Sort_Name',
        wishlistStatus: 'Items_Sort_Wishlist_Status'
    },

    components: {
        WishlistFilters,
        TopNavBar,
        EmptyState,
        ItemView,
        WishlistSelectedItem,
        WishlistItemView,
        TopTabs,
        Tabs,
        ItemPrice,
        InfinityGrid,
        ItemPriceList,
        ScrollablePagination
    },

    async asyncData ({ $usersService, $wishlistService, route }) {
        const { profile } = await $usersService.fetch(route.params.id)
        const { wishlist } = await $wishlistService.fetch(route.params.id)

        return {
            profile,
            wishlist,
            error: null
        }
    },

    data: () => ({
        filters: { ...DEFAULT_FILTERS },
        sort: { ...DEFAULT_SORT },
        selectedItems: [],
        mode: Modes.WISHLIST,
        wishlistModels: []
    }),

    computed: {
        items () {
            return Object.values(this.$store.state.items.items).filter(item => item.isTradeable)
        },

        filteredItems () {
            return this.items.filter(this.isFilteredItem)
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
        },

        // -----

        filteredItemsInWishlist () {
            return (this.wishlistModels || []).filter(wishlistModel => this.isFilteredItem(wishlistModel.item))
        },

        sortedItemsInWishlist () {
            const { sortBy, order } = this.sort
            const isAsc = order === 'asc'

            return Array.from(this.filteredItemsInWishlist).sort((a, b) => {
                const first = isAsc ? a.item : b.item
                const second = isAsc ? b.item : a.item

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
        },

        isWishlistMode () {
            return this.mode === Modes.WISHLIST
        },

        isAllItemsMode () {
            return this.mode === Modes.ALL_ITEMS
        }
    },

    created () {
        this.wishlistModels = this.wishlist.map(wishlistItem => this.$wishlistService.createWishlistItem({ wishlistItem }))

        this.filters = getFiltersFromRoute(this.$route, this.$options.defaultFilters)
        this.sort = getSortFromRoute(this.$route, this.$options.defaultSort, this.$options.sorts)
    },

    methods: {
        async onDelete (id) {
            await this.$wishlistService.removeFromWishlist([id])
        },

        async removeSelected () {
            const ids = this.selectedItems.map(wi => wi.id)
            await this.$wishlistService.removeFromWishlist(ids)
        },

        addAll () {
            const a = performance.now()

            this.sortedItems.forEach((item) => {
                const wishlistModel = this.wishlistModels.find(wishlistModel => wishlistModel.item === item)

                this.selectedItems.push(wishlistModel || this.$wishlistService.createNewWishlistItem(item))
            })

            console.log(performance.now() - a)
        },

        onFiltersChange (filters) {
            this.filters = filters
        },

        onSortChange (sort) {
            this.sort = sort
        },

        isFilteredItem (item) {
            const lowerCasedQuery = this.filters.query.toLowerCase()
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
        },

        toggleWishlistItem (wishlistModel) {
            if (this.selectedItems.includes(wishlistModel)) {
                return this.selectedItems = this.selectedItems.filter(wishlistItem => wishlistItem !== wishlistModel)
            }

            this.selectedItems.push(wishlistModel)
        },

        toggleItem (item) {
            const selectedWishlistModel = this.selectedItems.find(wishlistModel => wishlistModel.item === item)

            if (selectedWishlistModel) {
                return this.selectedItems = this.selectedItems.filter(wishlistItem => wishlistItem !== selectedWishlistModel)
            }

            const wishlistModel = this.wishlistModels.find(wishlistModel => wishlistModel.item === item)

            this.selectedItems.push(wishlistModel || this.$wishlistService.createNewWishlistItem(item))
        },

        isItemSelected (item) {
            return this.selectedItems.some(wishlistItem => wishlistItem.item === item)
        },

        isItemInWishlist (item) {
            return this.wishlistModels.some(wishlistItem => wishlistItem.item.id === item.id)
        },

        saveWishlistItems () {
            this.$wishlistService.saveWishlist(this.selectedItems)
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

.wit-wishlist-editor__items-filter,
.wit-tabs-switcher {
    padding: 0 var(--offset-xs);
}

.wit-wishlist-editor__wishlist-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-column-gap: 16px; //var(--offset-sm);
    grid-auto-rows: max-content;
    grid-row-gap: 16px; //var(--offset-sm);
    justify-items: center;
    overflow-y: scroll;
    padding-right: var(--offset-xs);
}

.wit-wishlist-editor__item {
    padding-bottom: 8px;
    padding-top: 8px;

    &:not(:last-child) {
        border-bottom: var(--default-border);
    }
}

.wit-wishlist-editor__items-list,
.wit-wishlist-editor__wishlist-list {
    padding: var(--offset-xs) var(--offset-xs) 0;
    margin-right: var(--offset-xs);
}

.wit-wishlist-editor__editor {
    flex: 0 0 420px;
    max-width: 420px;
    border-radius: var(--offset-xxs);

    @media screen and (max-width: 1023px) {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        border-top: 1px solid red;
        margin-left: 0 !important;
    }
}

.wit-selected-item {
    box-shadow: 0 0 6px 3px var(--bg-color);
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

.wit-items-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-column-gap: var(--offset-sm);
    grid-row-gap: var(--offset-sm);
}
</style>
