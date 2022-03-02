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
                    {{ filteredExistingOffers.length }}
                  </b-tag>
                </template>

                <template #tab1>
                  {{ $t('Wishlist_AllItems') }}
                  <b-tag rounded class="wit-offset-left--xxs wit-font-weight--700">
                    {{ filteredNewOffers.length }}
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
              <ScrollablePagination v-if="sortedExistingOffers.length" :items-per-page="100" :items="sortedExistingOffers" class="wit-wishlist-editor__items-list wit-flex__item--grow">
                <template #default="{ visibleItems }">
                  <Grid cell-width="130px" mobile-cell-width="130px">
                    <WishlistOfferView
                      v-for="(offerModel, index) in visibleItems"
                      :key="offerModel.id"
                      :offer-model="offerModel"
                      :is-editing="isEditingOffer(offerModel)"
                      @click="toggleOffer(offerModel)"
                      @shiftClick="toggleRange(index)"
                    >
                      <ItemPriceList :prices="offerModel.prices" />
                    </WishlistOfferView>
                  </Grid>
                </template>
              </ScrollablePagination>

              <EmptyState v-else icon="view-grid" :text="$t('Items_NoItems')" class="wit-padding-top--sm" />
            </template>

            <template v-if="isAllItemsMode">
              <ScrollablePagination v-if="sortedNewOffers.length" :items="sortedNewOffers" class="wit-wishlist-editor__items-list wit-flex__item--grow">
                <template #default="{ visibleItems }">
                  <Grid cell-width="130px" mobile-cell-width="130px">
                    <WishlistOfferView
                      v-for="(offerModel, index) in visibleItems"
                      :key="offerModel.id"
                      :offer-model="offerModel"
                      :is-editing="isEditingOffer(offerModel)"
                      @click="toggleOffer(offerModel)"
                      @shiftClick="toggleRange(index)"
                    />
                  </Grid>
                </template>
              </ScrollablePagination>

              <EmptyState v-else icon="view-grid" :text="$t('Items_NoItems')" class="wit-padding-top--sm" />
            </template>
          </div>
        </div>
      </template>

      <WishlistEditorPopup ref="wishlistEditor" :offers="offersInEditor" @updateOfferList="offersInEditor = $event" @submit="saveWishlistItems" />

      <Popup ref="setGlobalPrice" popup-title="Bulk price editor" @submit="() => {}">
        <div style="width: 500px;">
          <div class="wit-block--full-width">
            <PriceEditor
              v-for="price in globalPrices"
              :key="price.id"
              :price="price"
              :is-removable="globalPrices.length > 1"
              class="wit-price-editor wit-block--full-width"
              @priceTypeChanged="() => {}"
              @priceRemoved="() => {}"
              @priceAdded="() => {}"
            />
          </div>
        </div>
      </Popup>

      <b-button class="editor" type="is-primary" @click="openEditor">
        Editor ({{ offersInEditor.length }})
      </b-button>
    </div>
  </div>
</template>

<script>
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import TopTabs from '@/components/header/TopTabs.vue'
import { getFiltersFromRoute, getSortFromRoute } from '@/utils/index.js'
import Tabs from '@/components/basic/Tabs.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'
import ScrollablePagination from '@/components/basic/ScrollablePagination.vue'
import Grid from '@/components/basic/Grid.vue'
import Popup from '@/components/basic/popup/Popup.vue'
import PriceEditor from '@/components/price/PriceEditor.vue'
import WishlistEditorPopup from '@/components/wishlist/WishlistEditorPopup.vue'
import WishlistOfferView from '@/components/wishlist/WishlistOfferView.vue'

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
        TopTabs,
        Tabs,
        ItemPriceList,
        ScrollablePagination,
        Grid,
        Popup,
        PriceEditor,
        WishlistEditorPopup,
        WishlistOfferView
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
        globalPrices: [],
        offers: [],
        existingOffers: [],
        newOffers: [],
        offersInEditor: []
    }),

    computed: {
        filteredNewOffers () {
            return this.filterOffers(this.newOffers)
        },

        sortedNewOffers () {
            return this.sortOffers(this.filteredNewOffers)
        },

        filteredExistingOffers () {
            return this.filterOffers(this.existingOffers)
        },

        sortedExistingOffers () {
            return this.sortOffers(this.filteredExistingOffers)
        },

        isWishlistMode () {
            return this.mode === Modes.WISHLIST
        },

        isAllItemsMode () {
            return this.mode === Modes.ALL_ITEMS
        }
    },

    created () {
        const tradableItems = this.$itemsService.getTradableItems()
        const { newOffers, existingOffers } = this.$wishlistService.getOffersList(tradableItems, this.wishlist)

        this.newOffers = newOffers
        this.existingOffers = existingOffers

        this.filters = getFiltersFromRoute(this.$route, this.$options.defaultFilters)
        this.sort = getSortFromRoute(this.$route, this.$options.defaultSort, this.$options.sorts)
    },

    methods: {
        openEditor () {
            this.$refs.wishlistEditor.show()
        },

        addItemsToEditor () {
            const offers = this.isAllItemsMode ? this.sortedNewOffers : this.sortedExistingOffers
            this.offersInEditor.push(...offers)
        },

        async removeFromWishlist () {
            const { error, entityIds, removed } = await this.$wishlistService.removeFromWishlist(this.sortedExistingOffers)

            if (error) {
                return this.$showError(error)
            }

            const removedOffers = this.existingOffers.filter(offerModel => entityIds.includes(offerModel.id))
            const newOffers = removedOffers.map(offer => this.$wishlistService.createNewWishlistItem(offer.item))

            this.newOffers.push(...newOffers)
            this.existingOffers = this.existingOffers.filter(offer => !removedOffers.includes(offer))

            this.$showSuccess(`Removed ${removed} items`)
        },

        async onDelete (offerModel) {
            const { error, removed } = await this.$wishlistService.removeFromWishlist([offerModel])

            if (error) {
                return this.$showError(error)
            }

            const newOffer = this.$wishlistService.createNewWishlistItem(offerModel.item)

            this.newOffers.push(newOffer)
            this.existingOffers = this.existingOffers.filter(offer => offer !== offerModel)

            this.$showSuccess(`Removed ${removed} items`)
        },

        onFiltersChange (filters) {
            this.filters = filters
        },

        onSortChange (sort) {
            this.sort = sort
        },

        filterOffers (offers) {
            return offers.filter((offerModel) => {
                const { item } = offerModel
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
            })
        },

        sortOffers (offers) {
            const { sortBy, order } = this.sort
            const isAsc = order === 'asc'

            return Array.from(offers).sort((a, b) => {
                const first = isAsc ? a.item : b.item
                const second = isAsc ? b.item : a.item

                switch (sortBy) {
                case 'rarity':
                    return first.quality - second.quality
                case 'name':
                    return first.name.localeCompare(second.name)
                }

                // todo: recipes last!

                return 0
            })
        },

        toggleOffer (offerModel) {
            if (this.isEditingOffer(offerModel)) {
                offerModel.cancelChanges()
                return this.offersInEditor = this.offersInEditor.filter(editingOffer => editingOffer !== offerModel)
            }

            offerModel.startEditing()
            this.offersInEditor.push(offerModel)
        },

        isEditingOffer (offerModel) {
            return this.offersInEditor.includes(offerModel)
        },

        async saveWishlistItems () {
            const { created, updated, error } = await this.$wishlistService.saveWishlist(this.offersInEditor)

            if (error) {
                return this.$showError(error)
            }

            const createdItemIds = created.map(offer => offer.itemId)
            const createdOffers = created.map(offer => this.$wishlistService.createWishlistItem({ wishlistItem: offer }))

            createdOffers.forEach((createdOffer, index) => {
                const model = this.offersInEditor.find(editingOffer => editingOffer.item.id === createdOffer.item.id)

                if (model) {
                    this.offersInEditor.splice(index, 1, createdOffer)
                }

                this.existingOffers.push(createdOffer)
            })

            updated.forEach((updatedModel) => {
                const offerModel = this.existingOffers.find(offerModel => offerModel.id === updatedModel.id)

                if (offerModel) {
                    this.$wishlistService.updateWishlistItem(offerModel, updatedModel)
                }
            })

            this.newOffers = this.newOffers.filter(offer => !createdItemIds.includes(offer.item.id))

            this.$showSuccess(`Created ${created.length} items, Updated ${updated.length} items`)

            console.log(created, updated, error)
        },

        toggleRange (clickedItemIndex) {
            // const model = this.wishlistModels.find(wm => wm.item.id === offerModel.item.id)

            const prevSelectedIndex = null

            // while (let i = clickedItemIndex - 1; i>= 0; i--) {
            //     const model =this.selectedItems.filter(wishlistItem => wishlistItem !== selectedWishlistModel)
            //
            //
            // }

            console.log(clickedItemIndex)
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
    padding: 0 var(--offset-xs);
    //margin-right: var(--offset-xs);
}

.editor {
    position: fixed;
    bottom: 0;
    right: 0;
}

.wit-wishlist-editor__editor {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 24px;
    display: none;

    .aaa {
        display: block;
        //position: fixed;
        //left: 24px;
        //top: 24px;
        //z-index: 9998;
        //right: 24px;
        //bottom: 24px;
        background-color: var(--card-bg-color);
    }

    //flex: 0 0 420px;
    //max-width: 420px;
    //border-radius: var(--offset-xxs);
    //
    //@media screen and (max-width: 1023px) {
    //    position: fixed;
    //    bottom: 0;
    //    left: 0;
    //    right: 0;
    //    height: 100px;
    //    border-top: 1px solid red;
    //    margin-left: 0 !important;
    //}
}
</style>
