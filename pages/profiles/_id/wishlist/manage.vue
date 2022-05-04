<template>
  <div class="wit-wishlist">
    <TopNavBar class="layout__header">
      <template #brand>
        <h1 class="wit-font-size--sm wit-offset-bottom--xs">
          {{ $t('Wishlist_Manage_Title') }}
        </h1>
      </template>
    </TopNavBar>

    <div class="wit-wishlist__background wit-flex">
      <div class="wit-wishlist__content">
        <div ref="filters" class="wit-flex wit-flex--justify-between wit-wishlist__header">
          <Tabs :modes="$options.modes" :selected-mode="mode" @switch="toggleMode">
            <template #tab0>
              <div class="wit-flex wit-flex--align-center">
                <span class="wis-tabs__label">{{ $t('Wishlist_MyWishlist') }}</span>
                <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-heart" /></span>
                <b-tag rounded class="wit-offset-left--xs wit-font-weight--700">
                  {{ sortedOfferModels.length }}
                </b-tag>
              </div>
            </template>

            <template #tab1>
              <div class="wit-flex wit-flex--align-center">
                <span class="wis-tabs__label">{{ $t('Wishlist_OtherItems') }}</span>
                <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-grid" /></span>
                <b-tag rounded class="wit-offset-left--xs wit-font-weight--700">
                  {{ sortedNonWishlistItems.length }}
                </b-tag>
              </div>
            </template>
          </Tabs>

          <div class="wit-flex">
            <SearchInput
              :placeholder="$t('Items_SearchByItemName')"
              :query="filters.query"
              @update="updateFilters({ query: $event })"
              @reset="resetFilter"
              @toggle="isFiltersVisible = !isFiltersVisible"
            />

            <Dropdown position="bottom-end">
              <template #trigger>
                <b-button type="is-link" class="wit-position--relative wit-more-actions">
                  <i class="mdi mdi-20px mdi-cog" />
                </b-button>
              </template>

              <template #items>
                <DropdownItem
                  v-if="hasSelectedEntities"
                  @click="clearSelectedEntities"
                >
                  {{ $t('Wishlist_Manage_Deselect') }}
                </DropdownItem>

                <DropdownItem @click="openMassPriceEditor">
                  {{ isMyWishlistMode ? $t('Wishlist_Manage_ChangePrices') : $t('Wishlist_Manage_AddToWishlist') }}
                </DropdownItem>

                <DropdownItem v-if="isMyWishlistMode" @click="deleteAllOffers">
                  <span class="wit-color--danger">{{ $t('Wishlist_Manage_RemoveOffers') }}</span>
                </DropdownItem>
              </template>
            </Dropdown>
          </div>
        </div>

        <ItemsListView v-if="isMyWishlistMode" :items="sortedOfferModels" class="wit-wishlist__items-list">
          <template #default="{ items: offers }">
            <ItemView
              v-for="(offer, index) in offers"
              :key="offer.id"
              :item="offer.item"
              :is-selected="isOfferSelected(offer)"
              add-title
              add-border
              @clicked="toggleOffer(offer)"
              @shiftClick="onOffersRangeToggle(index)"
            >
              <div class="wit-offer-controls">
                <IconButton
                  icon="pencil-ruler"
                  type="primary"
                  circle
                  :size="24"
                  :disabled="isOfferSelected(offer)"
                  @click="editOffer(offer)"
                />
              </div>

              <div class="wit-offer-controls wit-offer-controls--remove">
                <IconButton
                  icon="close"
                  type="danger"
                  circle
                  :size="24"
                  :disabled="isOfferSelected(offer)"
                  @click="deleteOffer(offer)"
                />
              </div>
              <ItemPriceList :prices="offer.prices" />
            </ItemView>
          </template>
        </ItemsListView>

        <ItemsListView v-else :items="sortedNonWishlistItems" class="wit-wishlist__items-list">
          <template #default="{ items: offers }">
            <ItemView
              v-for="(offer, index) in offers"
              :key="offer.item.id"
              :item="offer.item"
              :is-selected="isOfferSelected(offer)"
              add-title
              add-border
              @clicked="toggleOffer(offer)"
              @shiftClick="onItemsRangeToggle(index)"
            >
              <div class="wit-offer-controls">
                <IconButton
                  icon="plus-thick"
                  type="primary"
                  circle
                  :size="24"
                  :disabled="isOfferSelected(offer)"
                  @click="addOffer(offer)"
                />
              </div>
            </ItemView>
          </template>
        </ItemsListView>
      </div>

      <WishlistFilters
        :is-visible="isFiltersVisible"
        :filters="filters"
        :sorts="sorts"
        @changeFilters="updateFilters"
        @resetFilter="resetFilter"
        @resetSorts="resetSorts"
        @updateOrderBy="updateOrderBy"
        @toggleOrder="toggleOrder"
        @reset="resetSortsFilters"
        @close="isFiltersVisible = false"
      />
    </div>

    <SetMassPricePopup />
    <EditOfferPopup />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { isEqual } from 'lodash'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import TopTabs from '@/components/header/TopTabs.vue'
import Tabs from '@/components/basic/Tabs.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
import DropdownItem from '@/components/basic/dropdown/DropdownItem.vue'
import IconButton from '@/components/basic/IconButton.vue'
import EditOfferPopup from '@/components/basic/offers/EditOfferPopup.vue'
import SetMassPricePopup from '@/components/basic/offers/SetMassPricePopup.vue'
import ItemView from '@/components/items/ItemView.vue'
import ItemsListView from '@/components/items/ItemsListView.vue'
import { StoreModules } from '@/store/index.js'
import { WishlistTabs } from '@/domain/models/tabs/index.js'
import { Offer } from '@/domain/models/index.js'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'
import VirtualScrollBar from '@/components/basic/VirtualScrollBar.vue'
import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'
import CharacterSelector from '@/components/basic/filters/CharacterSelector.vue'
import SearchInput from '@/components/basic/filters/SearchInput.vue'

export default {
    name: 'Manage',

    modes: WishlistTabs.values,

    components: {
        WishlistFilters,
        TopNavBar,
        TopTabs,
        Tabs,
        ItemPriceList,
        Dropdown,
        DropdownItem,
        IconButton,
        EditOfferPopup,
        SetMassPricePopup,
        ItemView,
        ItemsListView,
        VirtualScrollBar,
        RaritiesSelector,
        EventsSelector,
        SlotsSelector,
        CharacterSelector,
        SearchInput
    },

    async asyncData ({ store, route, $wishlistService }) {
        await store.dispatch(`${StoreModules.WISHLIST}/getInitialFilters`, route)
        await store.dispatch(`${StoreModules.WISHLIST}/getInitialSorts`, route)

        return $wishlistService.fetch(route.params.id)
    },

    computed: {
        ...mapState(StoreModules.WISHLIST, [
            'mode',
            'filters',
            'sorts',
            'selectedOffers',
            'selectedNonWishlistItems'
        ]),

        ...mapGetters(StoreModules.WISHLIST, [
            'isMyWishlistMode',
            'isNonWishlistItemsMode',
            'sortedOfferModels',
            'sortedNonWishlistItems',
            'changedFilters',
            'changedSorts',
            'isFiltersChanged',
            'isSortsChanged',
            'hasSelectedEntities',
            'selectedEntities',
            'selectedExistingOffers',
            'selectedAvailableOffers'
        ])
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

    data: () => ({
        isFiltersVisible: false
    }),

    created () {
        if (this.error) {
            return this.$showError(this.error)
        }

        const tradableItems = this.$itemsService.getTradableItems()
        const itemsInWishlistIds = this.offers.map(offer => offer.itemId)
        const nonWishlistItems = tradableItems.filter(item => !itemsInWishlistIds.includes(item.id))

        this.storeOffers({
            existingOffers: this.offers.map(offer => Offer.create(offer)),
            availableOffers: nonWishlistItems.map(item => Offer.fromItem(item))
        })
    },

    methods: {
        ...mapActions(StoreModules.WISHLIST, {
            storeOffers: 'storeOffers',
            toggleMode: 'toggleMode',
            fetchWishlist: 'fetchWishlist',
            updateFilters: 'updateFilters',
            updateSorts: 'updateSorts',
            resetFilter: 'resetFilter',
            resetSorts: 'resetSorts',
            resetSortsFilters: 'resetSortsFilters',
            toggleOffer: 'toggleOffer',
            toggleNonWishlistItem: 'toggleNonWishlistItem',
            clearSelectedEntities: 'clearSelectedEntities',
            removeOffers: 'removeOffers',
            createOffers: 'createOffers',
            setMassPrices: 'setMassPrices',
            updateFilter: 'updateFilter',
            toggleOrder: 'toggleOrder',
            updateOrderBy: 'updateOrderBy'
        }),

        updateRoute () {
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.changedSorts, ...this.changedFilters }
            }).catch(e => e)
        },

        isOfferSelected (offer) {
            return offer.isSelected
            // return this.selectedOffers.includes(offer)
        },

        isItemSelected (item) {
            return this.selectedNonWishlistItems.includes(item)
        },

        async deleteOffer (offer) {
            const { error, removed } = await this.removeOffers(offer)

            if (error) {
                return this.$showError(error)
            }

            this.$showSuccess(`Removed ${removed} items`)
        },

        async deleteAllOffers () {
            const offers = this.selectedOffers.length ? this.selectedOffers : this.sortedOfferModels
            const { error, removed } = await this.removeOffers(offers)

            if (error) {
                return this.$showError(error)
            }

            this.$showSuccess(`Removed ${removed} items`)
        },

        editOffer (offer) {
            this.$vfm.show(PopupNames.MANAGE_OFFER, { offer: offer.clone() })
        },

        addOffer (offer) {
            this.$vfm.show(PopupNames.MANAGE_OFFER, { offer: offer.clone() })
        },

        openMassPriceEditor () {
            const offers = this.hasSelectedEntities ? this.selectedExistingOffers : this.sortedOfferModels
            const nonWishlistItems = this.hasSelectedEntities ? this.selectedAvailableOffers : this.sortedNonWishlistItems
            const entities = this.isMyWishlistMode ? offers : nonWishlistItems

            if (entities.length === 1) {
                return this.isMyWishlistMode ? this.editOffer(entities[0]) : this.addOffer(entities[0])
            }

            this.$vfm.show(PopupNames.MANAGE_PRICES, {
                entities: entities.map(offer => offer.clone()),
                existingItems: this.isMyWishlistMode
            })
        },

        onOffersRangeToggle (clickedItemIndex) {
            const offers = this.sortedOfferModels

            for (let i = clickedItemIndex - 1; i >= 0; i--) {
                if (this.isOfferSelected(offers[i])) {
                    return this.toggleOffersRange({ from: i + 1, to: clickedItemIndex })
                }
            }

            for (let i = clickedItemIndex + 1; i < offers.length; i++) {
                if (this.isOfferSelected(offers[i])) {
                    return this.toggleOffersRange({ from: clickedItemIndex, to: i - 1 })
                }
            }
        },

        toggleOffersRange ({ from, to }) {
            const offers = this.sortedOfferModels

            for (let index = from; index <= to; index++) {
                this.toggleOffer(offers[index])
            }
        },

        onItemsRangeToggle (clickedItemIndex) {
            const items = this.sortedNonWishlistItems

            for (let i = clickedItemIndex - 1; i >= 0; i--) {
                if (this.isItemSelected(items[i])) {
                    return this.toggleItemsRange({ from: i + 1, to: clickedItemIndex })
                }
            }

            for (let i = clickedItemIndex + 1; i < items.length; i++) {
                if (this.isItemSelected(items[i])) {
                    return this.toggleItemsRange({ from: clickedItemIndex, to: i - 1 })
                }
            }
        },

        toggleItemsRange ({ from, to }) {
            const items = this.sortedNonWishlistItems

            for (let index = from; index <= to; index++) {
                this.toggleNonWishlistItem(items[index])
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .wit-wishlist__background {
        min-height: calc(100vh - var(--header-height));
        margin: var(--offset-sm) var(--offset-sm) 0;
        position: relative;
    }

    .wit-wishlist__header {
        position: sticky;
        top: 0;
        padding: var(--offset-sm);
        background-color: inherit;
        z-index: 4;
        border-radius: var(--offset-xxs) var(--offset-xxs) 0 0;
    }

    .wit-wishlist__content {
        flex: 1;
        background-color: var(--content-bg);
        border-radius: var(--offset-xxs);
        margin-bottom: var(--offset-sm);
    }

    .wit-wishlist__items-list {
        padding: 0 var(--offset-sm) var(--offset-sm);
    }

    .wit-more-actions {
        width: 36px;
        height: 36px;
        padding: 0;
        transition: width 0.3s ease, margin-right 0.3s ease;
        will-change: width, margin-left;
        overflow: hidden;
        margin-left: var(--offset-xs);
        background: #2e3648;
        border: var(--default-border);
        color: var(--muted-text-color);
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

    .wis-tabs__icon {
        display: none;
    }

    @media (max-width: 767.98px) {
        .wis-tabs__icon {
            display: block;
        }

        .wis-tabs__label {
            display: none;
        }
    }
</style>
