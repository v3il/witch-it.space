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
                    {{ nonWishlistItems.length }}
                  </b-tag>
                </template>
              </Tabs>

              <div class="wit-flex wit-flex--align-start wit-padding-right--xs">
                <WishlistFilters
                  :filters="filters"
                  :is-filters-changed="isFiltersChanged"
                  :is-sorts-changed="isSortsChanged"
                  :sorts="sorts"
                  class="wit-wishlist-editor__items-filter wit-offset-bottom--xs"
                  @filtersChanged="onFiltersChange"
                  @sortChanged="onSortChange"
                  @resetFilter="resetFilter"
                  @resetFilters="resetFilters"
                />

                <Dropdown position="bottom-end">
                  <template #trigger>
                    <b-button type="is-link" class="wit-position--relative wit-more-actions">
                      <i class="mdi mdi-24px mdi-dots-grid" />
                    </b-button>
                  </template>

                  <template #items>
                    <!--                    <DropdownItem @click="addItemsToEditor">-->
                    <!--                      Add to editor-->
                    <!--                    </DropdownItem>-->

                    <DropdownItem @click="openMassPriceEditor">
                      Set price
                    </DropdownItem>

                    <DropdownItem
                      v-if="(hasSelectedExistingOffers && isWishlistMode) || (hasSelectedNewOffers && isAllItemsMode)"
                      @click="clearSelectedOffers"
                    >
                      Clear selection
                    </DropdownItem>

                    <!--                    <DropdownItem v-if="hasSelectedNewOffers && isAllItemsMode" @click="clearSelectedOffers">-->
                    <!--                      Clear selection-->
                    <!--                    </DropdownItem>-->

                    <DropdownItem @click="removeFromWishlist">
                      <span class="wit-color--danger">Remove from wishlist</span>
                    </DropdownItem>
                  </template>
                </Dropdown>
              </div>
            </div>

            <template v-if="isWishlistMode">
              <ItemsListView :items="sortedExistingOffers" class="wit-wishlist-editor__items-list wit-flex__item--grow">
                <template #default="{ items: offers }">
                  <ItemView
                    v-for="(offer, index) in offers"
                    :key="offer.id"
                    :item="offer.item"
                    :is-selected="isSelectedNewOffer(offer)"
                    @clicked="toggleNewOffer(offer)"
                    @shiftClick="onRangeToggle(index)"
                  >
                    <div class="wit-offer-controls">
                      <IconButton
                        icon="pencil-ruler"
                        type="primary"
                        circle
                        :size="24"
                        :disabled="isSelectedExistingOffer(offer)"
                        @click="editOffer(offer)"
                      />
                    </div>

                    <div class="wit-offer-controls wit-offer-controls--remove">
                      <IconButton
                        icon="close"
                        type="danger"
                        circle
                        :size="24"
                        :disabled="isSelectedExistingOffer(offer)"
                        @click="deleteOffer(offer)"
                      />
                    </div>
                    <ItemPriceList :prices="offer.prices" />
                  </ItemView>
                </template>
              </ItemsListView>

              <!--              <ScrollablePagination v-if="sortedExistingOffers.length" :items-per-page="200" :items="sortedExistingOffers" class="wit-wishlist-editor__items-list wit-flex__item&#45;&#45;grow">-->
              <!--                <template #default="{ visibleItems }">-->
              <!--                  <Grid cell-width="130px" mobile-cell-width="130px">-->
              <!--                    <ItemView-->
              <!--                      v-for="(offerModel, index) in visibleItems"-->
              <!--                      :key="offerModel.id"-->
              <!--                      :item="offerModel.item"-->
              <!--                      :is-selected="isSelectedExistingOffer(offerModel)"-->
              <!--                      @click="toggleExistingOffer(offerModel)"-->
              <!--                      @shiftClick="onRangeToggle(index)"-->
              <!--                    >-->
              <!--                      <div class="wit-offer-controls">-->
              <!--                        <IconButton-->
              <!--                          icon="pencil-ruler"-->
              <!--                          type="primary"-->
              <!--                          circle-->
              <!--                          :size="24"-->
              <!--                          :disabled="isSelectedExistingOffer(offerModel)"-->
              <!--                          @click="editOffer(offerModel)"-->
              <!--                        />-->
              <!--                      </div>-->

              <!--                      <div class="wit-offer-controls wit-offer-controls&#45;&#45;remove">-->
              <!--                        <IconButton-->
              <!--                          icon="close"-->
              <!--                          type="danger"-->
              <!--                          circle-->
              <!--                          :size="24"-->
              <!--                          :disabled="isSelectedExistingOffer(offerModel)"-->
              <!--                          @click="deleteOffer(offerModel)"-->
              <!--                        />-->
              <!--                      </div>-->
              <!--                      <ItemPriceList :prices="offerModel.prices" />-->
              <!--                    </ItemView>-->
              <!--                  </Grid>-->
              <!--                </template>-->
              <!--              </ScrollablePagination>-->

              <!--              <EmptyState v-else icon="view-grid" :text="$t('Items_NoItems')" class="wit-padding-top&#45;&#45;sm" />-->
            </template>

            <template v-if="isAllItemsMode">
              <ItemsListView :items="sortedNonWishlistItems" class="wit-wishlist-editor__items-list wit-flex__item--grow">
                <template #default="{ items }">
                  <ItemView
                    v-for="(item, index) in items"
                    :key="item.id"
                    :item="item"
                    :is-selected="isSelectedNewOffer(item)"
                    @clicked="toggleNewOffer(item)"
                    @shiftClick="onRangeToggle(index)"
                  >
                    <div class="wit-offer-controls">
                      <IconButton
                        icon="plus-thick"
                        type="primary"
                        circle
                        :size="24"
                        :disabled="isSelectedNewOffer(item)"
                        @click="addOffer(item)"
                      />
                    </div>
                  </ItemView>
                </template>
              </ItemsListView>
            </template>
          </div>
        </div>
      </template>

      <!--      <WishlistEditorPopup ref="wishlistEditor" :offers="offersInEditor" @updateOfferList="offersInEditor = $event" @submit="saveWishlistItems" />-->

      <!--      <Popup ref="setGlobalPrice" popup-title="Bulk price editor" @submit="() => {}">-->
      <!--        <div style="width: 500px;">-->
      <!--          <div class="wit-block&#45;&#45;full-width">-->
      <!--            <PriceEditor-->
      <!--              v-for="price in globalPrices"-->
      <!--              :key="price.id"-->
      <!--              :price="price"-->
      <!--              :is-removable="globalPrices.length > 1"-->
      <!--              class="wit-price-editor wit-block&#45;&#45;full-width"-->
      <!--              @priceTypeChanged="() => {}"-->
      <!--              @priceRemoved="() => {}"-->
      <!--              @priceAdded="() => {}"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </Popup>-->

      <SetMassPricePopup ref="massPriceEditorPopup" :offers-size="selectedOffers.length" @saveChanges="massAction" />

      <EditOfferPopup
        ref="editOfferPopup"
        :offer="editingOffer"
        @deleteOffer="deleteOffer"
        @saveChanges="saveOffer"
        @cancelChanges="cancelEditing"
      />

      <!--      <b-button class="editor" type="is-primary" @click="openEditor">-->
      <!--        Editor ({{ offersInEditor.length }})-->
      <!--      </b-button>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { isEqual } from 'lodash'
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
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
import DropdownItem from '@/components/basic/dropdown/DropdownItem.vue'
import IconButton from '@/components/basic/IconButton.vue'
import WishlistSelectedItem from '@/components/wishlist/WishlistOfferEditor.vue'
import EditOfferPopup from '@/components/basic/offers/EditOfferPopup.vue'
import SetMassPricePopup from '@/components/basic/offers/SetMassPricePopup.vue'
import ItemView from '@/components/items/ItemView.vue'
import { Offer } from '@/domain/models/index.js'
import ItemsListView from '@/components/items/ItemsListView.vue'
import { Quest, Wishlist } from '@/store/Types.js'
import { StoreModules } from '@/store/index.js'
import { state } from '@/store/wishlist.js'

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
    name: 'Manage',

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
        WishlistOfferView,
        Dropdown,
        DropdownItem,
        IconButton,
        WishlistSelectedItem,
        EditOfferPopup,
        SetMassPricePopup,
        ItemView,
        ItemsListView
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
        // filters: { ...DEFAULT_FILTERS },
        // sort: { ...DEFAULT_SORT },
        selectedItems: [],
        mode: Modes.WISHLIST,
        wishlistModels: [],
        // tradableItems: [],
        // globalPrices: [],
        // offers: [],
        existingOffers: [],
        newOffers: [],
        offersInEditor: [],
        editingOffer: null,
        selectedExistingOffers: [],
        selectedNewOffers: []
    }),

    async fetch ({ store, route }) {
        await store.dispatch(`${StoreModules.WISHLIST}/fetchWishlist`, route.params.id)
        await store.dispatch(`${StoreModules.WISHLIST}/getInitialFilters`, route)
        await store.dispatch(`${StoreModules.WISHLIST}/getInitialSorts`, route)
    },

    computed: {
        ...mapState(StoreModules.WISHLIST, [
            'offers',
            'defaultFilters',
            'filters',
            'defaultSorts',
            'sorts'
        ]),

        ...mapGetters(StoreModules.WISHLIST, [
            'changedFilters',
            'changedSorts',
            'isFiltersChanged',
            'isSortsChanged'
        ]),

        // changedFilters (state) {
        //     return this.$wishlistService.getChangedFilters(this.filters)
        // },

        nonWishlistItems () {
            const itemsInWishlist = this.existingOffers.map(({ item }) => item)
            return [] // this.tradableItems.filter(item => !itemsInWishlist.includes(item))
        },

        filteredNonWishlistItems () {
            return [] // this.nonWishlistItems.filter(this.checkItem)
        },

        sortedNonWishlistItems () {
            return [] // Array.from(this.filteredNonWishlistItems).sort(this.sortIteration)
        },

        // filteredNewOffers () {
        //     return this.filterOffers(this.newOffers)
        // },
        //
        // sortedNewOffers () {
        //     return this.sortOffers(this.filteredNewOffers)
        // },

        filteredExistingOffers () {
            return [] // this.existingOffers.filter(offer => this.checkItem(offer.item))
        },

        sortedExistingOffers () {
            return [] // this.offers // Array.from(this.existingOffers).sort(this.sortIteration2)
        },

        isWishlistMode () {
            return this.mode === Modes.WISHLIST
        },

        isAllItemsMode () {
            return this.mode === Modes.ALL_ITEMS
        },

        hasSelectedExistingOffers () {
            return this.selectedExistingOffers.length > 0
        },

        hasSelectedNewOffers () {
            return this.selectedNewOffers.length > 0
        },

        selectedOffers () {
            let offers = []

            if (this.isWishlistMode) {
                offers = this.hasSelectedExistingOffers ? this.selectedExistingOffers : this.existingOffers
            }

            if (this.isAllItemsMode) {
                offers = this.hasSelectedNewOffers ? this.selectedNewOffers : this.newOffers
            }

            return offers
        }
    },

    watch: {
        filters: {
            deep: true,
            handler: 'updateRoute'
        },

        sorts: {
            deep: true,
            handler: 'updateRoute'
        }
    },

    async created () {
        await this.$store.dispatch(Wishlist.F.Actions.FETCH_WISHLIST, 139)

        this.tradableItems = this.$itemsService.getTradableItems()
        // const { newOffers, existingOffers } = this.$wishlistService.getOffersList(this.tradableItems, this.wishlist)

        // this.newOffers = newOffers
        this.existingOffers = [] // this.wishlist.map(offer => Offer.create(offer))

        console.log('offers', this.offers)
        console.log('filters', this.filters)
        console.log('sorts', this.sorts)
        console.log('sorts', this.defaultFilters)
        console.log('sorts', this.defaultSorts)
        // console.log('changedFilters', this.changedFilters)
        // console.log('offers2', await this.fetchWishlist(139))

        // this.filters = getFiltersFromRoute(this.$route, this.$options.defaultFilters)
        // this.sort = getSortFromRoute(this.$route, this.$options.defaultSort, this.$options.sorts)
    },

    methods: {
        ...mapActions(StoreModules.WISHLIST, [
            'fetchWishlist',
            'updateFilters',
            'updateSorts',
            'resetFilter',
            'resetFilters'
        ]),

        onFiltersChange (filters) {
            if (isEqual(this.filters, filters)) {
                return
            }

            this.updateFilters(filters)
        },

        onSortChange (sorts) {
            if (isEqual(this.sorts, sorts)) {
                return
            }

            this.updateSorts(sorts)
        },

        // resetFilterProp (propName) {
        //     this.resetFilter(propName)
        // },
        //
        // resetFilterProps () {
        //     this.resetFilters()
        // },

        updateRoute () {
            this.$router.replace({
                path: this.$route.path,
                query: {
                    ...this.changedSorts,
                    ...this.changedFilters
                }
            })
        },

        // =============================

        isSelectedExistingOffer (offer) {
            return this.selectedExistingOffers.includes(offer)
        },

        toggleExistingOffer (offerModel) {
            if (this.isSelectedExistingOffer(offerModel)) {
                return this.selectedExistingOffers = this.selectedExistingOffers.filter(offer => offer !== offerModel)
            }

            this.selectedExistingOffers.push(offerModel)
        },

        isSelectedNewOffer (offer) {
            return this.selectedNewOffers.includes(offer)
        },

        toggleNewOffer (offerModel) {
            console.log(offerModel)

            if (this.isSelectedNewOffer(offerModel)) {
                return this.selectedNewOffers = this.selectedNewOffers.filter(offer => offer !== offerModel)
            }

            this.selectedNewOffers.push(offerModel)
        },

        clearSelectedOffers () {
            if (this.isAllItemsMode) {
                return this.selectedNewOffers = []
            }

            this.selectedExistingOffers = []
        },

        // openEditor () {
        //     this.$refs.wishlistEditor.show()
        // },

        // addItemsToEditor () {
        //     const offers = this.isAllItemsMode ? this.sortedNewOffers : this.sortedExistingOffers
        //     offers.forEach(offer => this.addToEditing(offer))
        // },

        // clearEditor () {
        //     this.offersInEditor = []
        // },

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

        // async onDelete (offerModel) {
        //     const { error, removed } = await this.$wishlistService.removeFromWishlist([offerModel])
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     const newOffer = this.$wishlistService.createNewWishlistItem(offerModel.item)
        //
        //     this.newOffers.push(newOffer)
        //     this.existingOffers = this.existingOffers.filter(offer => offer !== offerModel)
        //
        //     this.$showSuccess(`Removed ${removed} items`)
        //
        //     this.editingOffer = null
        //     this.$refs.editOfferPopup.close()
        // },

        // updateRoute () {
        //     const changedFilters = this.$wishlistService.getChangedFilters(this.filters)
        //     const changedSorts = this.$wishlistService.getChangedSorts(this.sorts)
        //
        //     console.error(changedFilters, changedSorts)
        //
        //     this.$router.replace({
        //         path: this.$route.path,
        //         query: {
        //             ...changedSorts,
        //             ...changedFilters
        //         }
        //     })
        // },

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

        checkItem (item) {
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

        sortIteration (a, b) {
            const { sortBy, order } = this.sorts
            const isAsc = order === 'asc'

            const firstItem = isAsc ? a : b
            const secondItem = isAsc ? b : a

            switch (sortBy) {
            case 'rarity':
                if (firstItem.quality === secondItem.quality) {
                    if (firstItem.isRecipe === secondItem.isRecipe) {
                        return secondItem.id - firstItem.id
                    }

                    return +secondItem.isRecipe - +firstItem.isRecipe
                }

                return firstItem.quality - secondItem.quality
            case 'name':
                return firstItem.name.localeCompare(secondItem.name)
            }

            return 0
        },

        sortIteration2 (a, b) {
            const { sortBy, order } = this.sorts
            const isAsc = order === 'asc'

            const firstItem = isAsc ? a.item : b.item
            const secondItem = isAsc ? b.item : a.item

            switch (sortBy) {
            case 'rarity':
                if (firstItem.quality === secondItem.quality) {
                    if (firstItem.isRecipe === secondItem.isRecipe) {
                        return secondItem.id - firstItem.id
                    }

                    return +secondItem.isRecipe - +firstItem.isRecipe
                }

                return firstItem.quality - secondItem.quality
            case 'name':
                return firstItem.name.localeCompare(secondItem.name)
            }

            return 0
        },

        sortOffers (offers) {
            const { sortBy, order } = this.sorts
            const isAsc = order === 'asc'

            return Array.from(offers).sort((a, b) => {
                const first = isAsc ? a : b
                const second = isAsc ? b : a

                const firstItem = first.item
                const secondItem = second.item

                const firstQuality = first.isRecipe ? firstItem.quality - 0.5 : firstItem.quality
                const secondQuality = second.isRecipe ? secondItem.quality - 0.5 : secondItem.quality

                switch (sortBy) {
                case 'rarity':
                    if (firstQuality === secondQuality) {
                        if (first.isRecipe === second.isRecipe) {
                            return secondItem.id - firstItem.id
                        }

                        return +second.isRecipe - +first.isRecipe
                    }

                    return firstQuality - secondQuality
                case 'name':
                    return firstItem.name.localeCompare(secondItem.name)
                }

                return 0
            })
        },

        // addToEditing (offerModel) {
        //     if (!this.isEditingOffer(offerModel)) {
        //         offerModel.startEditing()
        //         this.offersInEditor.push(offerModel)
        //     }
        // },

        // removeFormEditing (offerModel) {
        //     offerModel.cancelChanges()
        //     return this.offersInEditor = this.offersInEditor.filter(editingOffer => editingOffer !== offerModel)
        // },

        // toggleOffer (offerModel) {
        //     if (this.isEditingOffer(offerModel)) {
        //         return this.removeFormEditing(offerModel)
        //     }
        //
        //     this.addToEditing(offerModel)
        // },

        // isEditingOffer (offerModel) {
        //     return this.offersInEditor.includes(offerModel)
        // },

        // async saveWishlistItems () {
        //     const { created, updated, error } = await this.$wishlistService.saveWishlist(this.offersInEditor)
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     const createdItemIds = created.map(offer => offer.itemId)
        //     const createdOffers = created.map(offer => this.$wishlistService.createWishlistItem({ wishlistItem: offer }))
        //
        //     createdOffers.forEach((createdOffer, index) => {
        //         const model = this.offersInEditor.find(editingOffer => editingOffer.item.id === createdOffer.item.id)
        //
        //         if (model) {
        //             this.offersInEditor.splice(index, 1, createdOffer)
        //             createdOffer.startEditing()
        //         }
        //
        //         this.existingOffers.push(createdOffer)
        //     })
        //
        //     updated.forEach((updatedModel) => {
        //         const offerModel = this.existingOffers.find(offerModel => offerModel.id === updatedModel.id)
        //
        //         if (offerModel) {
        //             this.$wishlistService.updateWishlistItem(offerModel, updatedModel)
        //         }
        //     })
        //
        //     this.newOffers = this.newOffers.filter(offer => !createdItemIds.includes(offer.item.id))
        //
        //     this.$showSuccess(`Created ${created.length} items, Updated ${updated.length} items`)
        //
        //     console.log(created, updated, error)
        // },

        onRangeToggle (clickedItemIndex) {
            const offers = this.isAllItemsMode ? this.sortedNewOffers : this.sortedExistingOffers

            for (let i = clickedItemIndex - 1; i >= 0; i--) {
                if (this.isEditingOffer(offers[i])) {
                    return this.toggleRange({ from: i, to: clickedItemIndex })
                }
            }

            for (let i = clickedItemIndex + 1; i < offers.length; i++) {
                if (this.isEditingOffer(offers[i])) {
                    return this.toggleRange({ from: clickedItemIndex, to: i })
                }
            }
        },

        toggleRange ({ from, to }) {
            const offers = this.isAllItemsMode ? this.sortedNewOffers : this.sortedExistingOffers

            for (let index = from; index <= to; index++) {
                this.addToEditing(offers[index])
            }
        },

        editOffer (offer) {
            this.editingOffer = offer
            offer.startEditing()
            this.$refs.editOfferPopup.open()
        },

        async deleteOffer (offer) {
            const { error, removed } = await this.$wishlistService.removeFromWishlist([offer])

            if (error) {
                return this.$showError(error)
            }

            const newOffer = this.$wishlistService.createNewWishlistItem(offer.item)

            this.newOffers.push(newOffer)
            this.existingOffers = this.existingOffers.filter(o => o !== offer)

            this.$showSuccess(`Removed ${removed} items`)

            this.editingOffer = null
            this.$refs.editOfferPopup.close()
        },

        cancelEditing () {
            this.editingOffer.cancelChanges()
            this.editingOffer = null
        },

        async saveEditingOffer () {
            const { updated, error } = await this.$wishlistService.saveWishlist([this.editingOffer])

            if (error) {
                return this.$showError(error)
            }

            this.$wishlistService.updateWishlistItem(this.editingOffer, updated[0])

            this.editingOffer = null
            this.$refs.editOfferPopup.close()

            this.$showSuccess(`Updated ${updated.length} offer`)
        },

        async saveNewOffer () {
            const { created, error } = await this.$wishlistService.saveWishlist([this.editingOffer])

            if (error) {
                return this.$showError(error)
            }

            const offerModel = this.$wishlistService.createWishlistItem({ wishlistItem: created[0] })
            this.existingOffers.push(offerModel)

            this.newOffers = this.newOffers.filter(offer => offer !== this.editingOffer)

            this.editingOffer = null
            this.$refs.editOfferPopup.close()

            this.$showSuccess(`Created ${created.length} offer`)
        },

        saveOffer () {
            return this.editingOffer.isNew ? this.saveNewOffer() : this.saveEditingOffer()
        },

        addOffer (offer) {
            this.editingOffer = offer
            offer.startEditing()
            this.$refs.editOfferPopup.open()
        },

        openMassPriceEditor () {
            this.$refs.massPriceEditorPopup.open()
        },

        massAction (prices) {
            this.isWishlistMode ? this.setMassPrices(prices) : this.massCreate(prices)
        },

        async setMassPrices (prices) {
            const { updated, error } = await this.$wishlistService.setMassPrice(this.selectedOffers, prices)

            if (error) {
                return this.$showError(error)
            }

            updated.forEach((updatedOffer) => {
                const offer = this.existingOffers.find(existingOffer => updatedOffer.id === existingOffer.id)

                if (offer) {
                    this.$wishlistService.updateWishlistItem(offer, updatedOffer)
                }
            })

            console.log(updated)

            // this.selectedOffers.forEach((offer, index) => {
            //     const upd = updated[index] || created[index]
            //
            //     this.$wishlistService.updateWishlistItem(offer, upd)
            // })

            // this.editingOffer = null
            this.$refs.massPriceEditorPopup.close()

            this.$showSuccess(`Updated ${updated.length} offers`)
        },

        async massCreate (prices) {
            console.log(this.selectedOffers)

            const copies = this.selectedOffers.map((offer) => {
                const clone = offer.clone()
                const priceClones = prices.map(price => price.clone())
                clone.setPrices(priceClones)

                return clone
            })

            const { offers, error } = await this.$wishlistService.massCreate(copies)

            if (error) {
                return this.$showError(error)
            }

            const newOffers = offers.map(offer => this.$wishlistService.createWishlistItem({ wishlistItem: offer }))

            // const offerModel = this.$wishlistService.createWishlistItem({ wishlistItem: created[0] })
            this.existingOffers.push(...newOffers)

            this.newOffers = this.newOffers.filter(offer => !this.selectedOffers.includes(offer))

            this.selectedNewOffers = []
            this.$refs.massPriceEditorPopup.close()

            this.$showSuccess(`Created ${newOffers.length} offer`)
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
}

.wit-offer-controls {
    position: absolute;
    top: 16px;
    right: -10px;
    padding: var(--offset-xxs) 0 var(--offset-xxs) var(--offset-xxs);
    background: var(--card-bg-color);
    z-index: 3;
    border-radius: 50% 0 0 50%;
}

.wit-offer-controls--remove {
    top: 48px;
}
</style>
