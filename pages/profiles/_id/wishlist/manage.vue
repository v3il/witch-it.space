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

              <div class="wit-flex wit-flex--align-start">
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

                <v-popover ref="popover" placement="bottom-end">
                  <b-button type="is-link" class="wit-position--relative wit-more-actions">
                    <i class="mdi mdi-24px mdi-dots-grid" />
                  </b-button>

                  <div slot="popover">
                    <ul>
                      <li>
                        <b-button type="is-ghost" class="wit-color--white" @click="addItemsToEditor">
                          Add filtered items to editor
                        </b-button>
                      </li>
                      <li>
                        <b-button type="is-ghost" class="wit-color--white" @click="removeFromWishlist">
                          Remove filtered items from wishlist
                        </b-button>
                      </li>
                    </ul>
                  </div>
                </v-popover>
              </div>
            </div>

            <template v-if="isWishlistMode">
              <ScrollablePagination v-if="sortedItemsInWishlist.length" :items="sortedItemsInWishlist" class="wit-wishlist-editor__items-list wit-flex__item--grow">
                <template #default="{ visibleItems }">
                  <Grid cell-width="130px" mobile-cell-width="130px">
                    <ItemView
                      v-for="wishlistModel in visibleItems"
                      :key="wishlistModel.id"
                      :item="wishlistModel.item"
                      @clicked="toggleWishlistItem(wishlistModel)"
                    >
                      <ItemPriceList v-if="wishlistModel.prices.length" :prices="wishlistModel.prices" />
                      <div v-if="isWishlistItemSelected(wishlistModel)" class="wit-flex wit-flex--justify-end wit-selected-item-overlay">
                        <i class="mdi mdi-24px mdi-square-edit-outline wit-selected-item-overlay__icon" />
                      </div>
                    </ItemView>
                  </Grid>
                </template>
              </ScrollablePagination>

              <EmptyState v-else icon="view-grid" :text="$t('Items_NoItems')" class="wit-padding-top--sm" />
            </template>

            <template v-if="isAllItemsMode">
              <ScrollablePagination v-if="sortedItems.length" :items="sortedItems" class="wit-wishlist-editor__items-list wit-flex__item--grow">
                <template #default="{ visibleItems }">
                  <Grid cell-width="130px" mobile-cell-width="130px">
                    <ItemView
                      v-for="item in visibleItems"
                      :key="item.id"
                      :item="item"
                      @clicked="toggleItem"
                    >
                      <div v-if="isItemSelected(item)" class="wit-flex wit-flex--justify-end wit-selected-item-overlay">
                        <i class="mdi mdi-24px mdi-square-edit-outline wit-selected-item-overlay__icon" />
                      </div>
                    </ItemView>
                  </Grid>
                </template>
              </ScrollablePagination>

              <EmptyState v-else icon="view-grid" :text="$t('Items_NoItems')" class="wit-padding-top--sm" />
            </template>
          </div>

          <div class="wit-wishlist-editor__editor wit-paddings--sm1 wit-padding-top--sm wit-padding-right--xs wit-offset-left--sm wit-background--content wit-flex wit-flex--column">
            <div v-if="selectedItems.length" class="wit-flex__item--grow wit-flex wit-flex--column wit-block--full-height">
              <ScrollablePagination :items="selectedItems" :items-per-page="20" class="wit-offset-bottom--sm">
                <template #default="{ visibleItems }">
                  <WishlistSelectedItem
                    v-for="wishlistModel in visibleItems"
                    :key="wishlistModel.id"
                    :wishlist-item="wishlistModel"
                    class="wit-wishlist-editor__item"
                    @itemRemoved="toggleWishlistItem"
                    @delete="onDelete"
                  />
                </template>
              </ScrollablePagination>

              <div class="wit-flex__item--no-shrink wit-flex">
                <b-button type="is-primary" class="wit-flex__item--grow1 wit-offset-right--xs" expanded @click="saveWishlistItems">
                  Save
                </b-button>

                <b-button type="is-primary is-light" class="wit-offset-right--xs" expanded @click="clearEditor">
                  Clear editor
                </b-button>

                <v-popover ref="popover" placement="top-end">
                  <b-button type="is-link" class="wit-position--relative wit-more-actions">
                    <i class="mdi mdi-24px mdi-dots-grid" />
                  </b-button>

                  <div slot="popover">
                    <ul>
                      <li>
                        <b-button type="is-ghost" class="wit-color--white" @click="setPriceForAllItems">
                          Set price for all items
                        </b-button>
                      </li>
                      <!--                      <li>-->
                      <!--                        <b-button type="is-ghost" class="wit-color&#45;&#45;white" @click="removeFromWishlist">-->
                      <!--                          Remove filtered items from wishlist-->
                      <!--                        </b-button>-->
                      <!--                      </li>-->
                    </ul>
                  </div>
                </v-popover>
              </div>
            </div>

            <div v-else class="wit-flex wit-flex--center wit-block--full-height wit-paddings--xs">
              <EmptyState icon="cursor-default-click-outline" :text="$t('Wishlist_SelectItemToEdit')" class="wit-padding-top--sm" />
            </div>
          </div>
        </div>
      </template>

      <Popup ref="setGlobalPrice" @submit="setGlobalPrices">
        <template #header>
          Bulk price editor
        </template>

        <div style="width: 500px;">
          <div class="wit-block--full-width">
            <PriceEditor
              v-for="price in globalPrices"
              :key="price.id"
              :price="price"
              :is-removable="globalPrices.length > 1"
              class="wit-price-editor wit-block--full-width"
              @priceTypeChanged="() => {}"
              @priceRemoved="removeGlobalPrice"
              @priceAdded="addGlobalPrice"
            />
          </div>
        </div>
      </Popup>
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
import Grid from '@/components/basic/Grid.vue'
import Popup from '@/components/basic/Popup.vue'
import PriceEditor from '@/components/price/PriceEditor.vue'

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
        name: 'Items_Sort_Name'
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
        ScrollablePagination,
        Grid,
        Popup,
        PriceEditor
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
        wishlistModels: [],
        tradableItems: [],
        globalPrices: []
    }),

    computed: {
        availableItems () {
            const itemsInWishlist = this.wishlistModels.map(wishlistItem => wishlistItem.item)
            return this.tradableItems.filter(item => !itemsInWishlist.includes(item))
        },

        filteredItems () {
            return this.availableItems.filter(this.isFilteredItem)
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
        this.tradableItems = this.$itemsService.toList().filter(item => item.isTradable)
        this.wishlistModels = this.wishlist.map(wishlistItem => this.$wishlistService.createWishlistItem({ wishlistItem }))

        this.filters = getFiltersFromRoute(this.$route, this.$options.defaultFilters)
        this.sort = getSortFromRoute(this.$route, this.$options.defaultSort, this.$options.sorts)
    },

    methods: {
        clearEditor () {
            this.selectedItems = []
        },

        setPriceForAllItems () {
            this.globalPrices = [this.$priceService.createDefaultPrice()]
            this.$refs.setGlobalPrice.show()
        },

        addGlobalPrice () {
            this.globalPrices.push(this.$priceService.createDefaultPrice())
        },

        removeGlobalPrice ({ price }) {
            console.log(price)
            this.globalPrices = this.globalPrices.filter(p => p !== price)
        },

        setGlobalPrices () {
            console.log(this.globalPrices)
            this.selectedItems.forEach(offerModel => offerModel.setPrices(this.globalPrices))
            this.$refs.setGlobalPrice.hide()
        },

        addItemsToEditor () {
            if (this.isAllItemsMode) {
                return this.sortedItems.forEach((item) => {
                    if (!this.isItemSelected(item)) {
                        this.selectedItems.push(this.$wishlistService.createNewWishlistItem(item))
                    }
                })
            }

            this.sortedItemsInWishlist.forEach((wishlistModel) => {
                if (!this.isWishlistItemSelected(wishlistModel)) {
                    this.selectedItems.push(wishlistModel)
                }
            })
        },

        async removeFromWishlist () {
            const { error, entityIds, removed } = await this.$wishlistService.removeFromWishlist(this.sortedItemsInWishlist)

            if (error) {
                return this.$showError(error)
            }

            this.wishlistModels = this.wishlistModels.filter(wishlistItem => !entityIds.includes(wishlistItem.id))
            this.selectedItems = this.selectedItems.filter(wishlistItem => !entityIds.includes(wishlistItem.id))

            this.$showSuccess(`Removed ${removed} items`)
        },

        async onDelete (wishlistModel) {
            const { error, entityIds, removed } = await this.$wishlistService.removeFromWishlist([wishlistModel])

            if (error) {
                return this.$showError(error)
            }

            this.wishlistModels = this.wishlistModels.filter(wishlistItem => !entityIds.includes(wishlistItem.id))
            this.selectedItems = this.selectedItems.filter(wishlistItem => !entityIds.includes(wishlistItem.id))

            this.$showSuccess(`Removed ${removed} items`)
        },

        async removeSelected () {
            const { error, entityIds, removed } = await this.$wishlistService.removeFromWishlist(this.selectedItems)

            if (error) {
                return this.$showError(error)
            }

            this.wishlistModels = this.wishlistModels.filter(wishlistItem => !entityIds.includes(wishlistItem.id))
            this.selectedItems = this.selectedItems.filter(wishlistItem => !entityIds.includes(wishlistItem.id))

            this.$showSuccess(`Removed ${removed} items`)
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
            if (this.isWishlistItemSelected(wishlistModel)) {
                return this.selectedItems = this.selectedItems.filter(selectedOffer => selectedOffer.id !== wishlistModel.id)
            }

            this.selectedItems.push(wishlistModel.clone())
        },

        toggleItem (item) {
            const selectedWishlistModel = this.selectedItems.find(wishlistModel => wishlistModel.item === item)

            if (selectedWishlistModel) {
                return this.selectedItems = this.selectedItems.filter(wishlistItem => wishlistItem !== selectedWishlistModel)
            }

            this.selectedItems.push(this.$wishlistService.createNewWishlistItem(item))
        },

        isWishlistItemSelected (wishlistModel) {
            return this.selectedItems.some(selectedOffer => selectedOffer.id === wishlistModel.id)
        },

        isItemSelected (item) {
            return this.selectedItems.some(wishlistModel => wishlistModel.item === item)
        },

        // isItemInWishlist (wishlistModel) {
        //     return this.wishlistModels.includes(wishlistModel)
        // },

        async saveWishlistItems () {
            const { created, updated, error } = await this.$wishlistService.saveWishlist(this.selectedItems)

            if (error) {
                return this.$showError(error)
            }

            const createdModels = created.map(wishlistItem => this.$wishlistService.createWishlistItem({ wishlistItem }))
            this.wishlistModels.push(...createdModels)

            updated.forEach((updatedModel) => {
                const offerModel = this.wishlistModels.find(offerModel => offerModel.id === updatedModel.id)

                if (offerModel) {
                    this.$wishlistService.updateWishlistItem(offerModel, updatedModel)
                }
            })

            this.selectedItems.forEach((offerModel, index) => {
                const model = this.wishlistModels.find(wm => wm.item.id === offerModel.item.id)

                if (model) {
                    this.selectedItems.splice(index, 1, model.clone())
                }
            })

            // this.selectedItems = []

            // this.wishlistModels = this.wishlistModels.filter(wishlistItem => !entityIds.includes(wishlistItem.id))
            // this.selectedItems = this.selectedItems.filter(wishlistItem => !entityIds.includes(wishlistItem.id))

            this.$showSuccess(`Updated ${updated.length} items`)

            console.log(created, updated, error)
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
.wit-tabs-switcher,
.wit-more-actions {
    padding: 0 var(--offset-xs);
}

.wit-more-actions {
    width: 36px;
    height: 36px;
    padding: 0;
    background-color: #2e3648;
    border: var(--default-border);
    color: var(--body-color);
}

//.wit-wishlist-editor__wishlist-list {
//    display: grid;
//    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
//    grid-column-gap: 16px; //var(--offset-sm);
//    grid-auto-rows: max-content;
//    grid-row-gap: 16px; //var(--offset-sm);
//    justify-items: center;
//    overflow-y: scroll;
//    padding-right: var(--offset-xs);
//}

.wit-wishlist-editor__item {
    border-bottom: var(--default-border);
    padding-bottom: var(--offset-sm);
    padding-left: var(--offset-sm);
    padding-right: var(--offset-sm);

    //&:nth-child(even) {
    //    background-color: rgba(0, 0, 0, 0.1);
    //}

    &:not(:first-child) {
        padding-top: var(--offset-sm);
    }
}

.wit-wishlist-editor__items-list/*,
.wit-wishlist-editor__wishlist-list*/ {
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
</style>
