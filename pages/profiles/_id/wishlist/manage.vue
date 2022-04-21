<template>
  <div class="wit-wishlist">
    <TopNavBar class="layout__header">
      <template #brand>
        <h1 class="wit-font-size--sm wit-offset-bottom--xs">
          Manage wishlist
        </h1>
      </template>
    </TopNavBar>

    <!--    <div class="wit-flex wit-flex&#45;&#45;justify-between wit-flex&#45;&#45;align-center wit-wishlist__page-header">-->
    <!--      <div>-->
    <!--        <h3 class="wit-font-size&#45;&#45;sm wit-offset-bottom&#45;&#45;xs">-->
    <!--          Manage wishlist-->
    <!--        </h3>-->
    <!--        <p>Home > Wishlist > Manage wishlist</p>-->
    <!--      </div>-->

    <!--      <Dropdown position="bottom-end">-->
    <!--        <template #trigger>-->
    <!--              <b-button type="is-primary" class="wit-position&#45;&#45;relative wit-more-action01s">-->
    <!--                <div class="wit-flex wit-flex&#45;&#45;align-center">-->
    <!--                  <i class="mdi mdi-16px mdi-cog wit-offset-right&#45;&#45;xs" />-->
    <!--                  {{ $t('MainMenu_Settings') }}-->
    <!--                </div>-->
    <!--              </b-button>-->
    <!--        </template>-->

    <!--        <template #items>-->
    <!--          <DropdownItem @click="openMassPriceEditor">-->
    <!--            Set price-->
    <!--          </DropdownItem>-->

    <!--          <DropdownItem-->
    <!--            v-if="hasSelectedEntities"-->
    <!--            @click="clearSelectedEntities"-->
    <!--          >-->
    <!--            Clear selection-->
    <!--          </DropdownItem>-->

    <!--          <DropdownItem @click="deleteAllOffers">-->
    <!--            <span class="wit-color&#45;&#45;danger">Remove selected offers</span>-->
    <!--          </DropdownItem>-->
    <!--        </template>-->
    <!--      </Dropdown>-->
    <!--    </div>-->

    <div class="wit-wishlist__background wit-flex">
      <div v-if="isFiltersVisible" class="ababa">
        <b-button type="is-danger" class="wit-position--relative" expanded>
          <div class="wit-flex wit-flex--align-center">
            <!--            <i class="mdi mdi-16px mdi-cog wit-offset-right&#45;&#45;xs" />-->
            Clear
          </div>
        </b-button>

        <b-input
          class="wit-flex__item--grow"
          :value="filters.query"
          maxlength="20"
          :placeholder="$t('Items_SearchByItemName')"
          custom-class="wit-transition"
          :has-counter="false"
          icon-right="close"
          icon-right-clickable
          @input="update({ query: $event })"
          @icon-right-click="resetFilter('query')"
        />

        <RaritiesSelector
          :selected-rarities="filters.rarities"
          class="wit-offset-bottom--xs"
          @update="update({ rarities: $event })"
          @reset="reset('rarities')"
        />

        <CharacterSelector
          :selected-character="filters.character"
          class="wit-offset-bottom--xs"
          @update="update({ character: $event })"
          @reset="reset('character')"
        />

        <EventsSelector
          :selected-events="filters.events"
          class="wit-offset-bottom--xs"
          @update="update({ events: $event })"
          @reset="reset('events')"
        />

        <SlotsSelector
          :selected-slots="filters.slots"
          class="wit-offset-bottom--sm"
          @update="update({ slots: $event })"
          @reset="reset('slots')"
        />
      </div>

      <div class="wit-wishlist__content">
        <div ref="filters" class="wit-flex wit-flex--wrap-reverse wit-flex--justify-between wit-wishlist__header">
          <Tabs :modes="$options.modes" :selected-mode="mode" class="wit-tabs-switcher" @switch="toggleMode">
            <template #tab0>
              {{ $t('Wishlist_MyWishlist') }}
              <b-tag rounded class="wit-offset-left--xxs wit-font-weight--700">
                {{ sortedOfferModels.length }}
              </b-tag>
            </template>

            <template #tab1>
              {{ $t('Wishlist_OtherItems') }}
              <b-tag rounded class="wit-offset-left--xxs wit-font-weight--700">
                {{ sortedNonWishlistItems.length }}
              </b-tag>
            </template>
          </Tabs>

          <div class="wit-flex">
            <WishlistFilters
              :filters="filters"
              :is-filters-changed="isFiltersChanged"
              :is-sorts-changed="isSortsChanged"
              :sorts="sorts"
              @filtersChanged="onFiltersChange"
              @sortChanged="onSortChange"
              @resetFilter="resetFilter"
              @resetFilters="resetFilters"
              @open="isFiltersVisible = !isFiltersVisible"
            />

            <Dropdown position="bottom-end">
              <template #trigger>
                <b-button type="is-link" class="wit-position--relative wit-more-actions expanded" :class="moreActionsButtonClass">
                  <i class="mdi mdi-20px mdi-cog" />
                </b-button>

                <!--                <b-button type="is-primary" class="wit-position&#45;&#45;relative wit-more-action01s">-->
                <!--                  <div class="wit-flex wit-flex&#45;&#45;align-center">-->
                <!--                    <i class="mdi mdi-16px mdi-cog wit-offset-right&#45;&#45;xs" />-->
                <!--                    {{ $t('MainMenu_Settings') }}-->
                <!--                  </div>-->
                <!--                </b-button>-->
              </template>

              <template #items>
                <DropdownItem @click="openMassPriceEditor">
                  Set price
                </DropdownItem>

                <DropdownItem
                  v-if="hasSelectedEntities"
                  @click="clearSelectedEntities"
                >
                  Clear selection
                </DropdownItem>

                <DropdownItem @click="deleteAllOffers">
                  <span class="wit-color--danger">Remove selected offers</span>
                </DropdownItem>
              </template>
            </Dropdown>
          </div>
        </div>

        <ItemsListView v-if="isMyWishlistMode" :items="sortedOfferModels" class="wit-wishlist__content1">
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

        <ItemsListView v-else :items="sortedNonWishlistItems" class="wit-wishlist__content1">
          <template #default="{ items }">
            <ItemView
              v-for="(item, index) in items"
              :key="item.id"
              :item="item"
              :is-selected="isItemSelected(item)"
              add-title
              add-border
              @clicked="toggleNonWishlistItem"
              @shiftClick="onItemsRangeToggle(index)"
            >
              <div class="wit-offer-controls">
                <IconButton
                  icon="plus-thick"
                  type="primary"
                  circle
                  :size="24"
                  :disabled="isItemSelected(item)"
                  @click="addOffer(item)"
                />
              </div>
            </ItemView>
          </template>
        </ItemsListView>
      </div>
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
        CharacterSelector
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
            'selectedEntities'
        ]),

        moreActionsButtonClass () {
            return {
                collapsed: !this.isSticky
            }
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

    data: () => ({
        isSticky: false,
        isFiltersVisible: false
    }),

    created () {
        this.saveOffers(this.offers)
    },

    mounted () {
        document.addEventListener('scroll', this.onScroll, { passive: true })
    },

    beforeDestroy () {
        document.removeEventListener('scroll', this.onScroll)
    },

    methods: {
        onScroll () {
            this.isSticky = this.$refs.filters.getBoundingClientRect().top === 0
        },

        update () {},
        reset () {},

        ...mapActions(StoreModules.WISHLIST, {
            saveOffers: 'saveOffers',
            toggleMode: 'toggleMode',
            fetchWishlist: 'fetchWishlist',
            updateFilters: 'updateFilters',
            updateSorts: 'updateSorts',
            resetFilter: 'resetFilter',
            resetFilters: 'resetFilters',
            toggleOffer: 'toggleOffer',
            toggleNonWishlistItem: 'toggleNonWishlistItem',
            clearSelectedEntities: 'clearSelectedEntities',
            removeOffers: 'removeOffers',
            createOffers: 'createOffers',
            setMassPrices: 'setMassPrices'
        }),

        onFiltersChange (filters) {
            if (!isEqual(this.filters, filters)) {
                this.updateFilters(filters)
            }
        },

        onSortChange (sorts) {
            if (!isEqual(this.sorts, sorts)) {
                this.updateSorts(sorts)
            }
        },

        updateRoute () {
            this.$router.replace({
                path: this.$route.path,
                query: {
                    ...this.changedSorts,
                    ...this.changedFilters
                }
            })
        },

        isOfferSelected (offer) {
            return this.selectedOffers.includes(offer)
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

        addOffer (item) {
            this.$vfm.show(PopupNames.MANAGE_OFFER, { offer: Offer.fromItem(item) })
        },

        openMassPriceEditor () {
            const offers = this.hasSelectedEntities ? this.selectedOffers : this.sortedOfferModels
            const nonWishlistItems = this.hasSelectedEntities ? this.selectedNonWishlistItems : this.sortedNonWishlistItems

            this.$vfm.show(PopupNames.MANAGE_PRICES, {
                entities: this.isMyWishlistMode ? offers : nonWishlistItems,
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
    .wit-wishlist1 {
        padding: 0 var(--offset-sm);
    }

    .wit-wishlist__background {
        //background-color: var(--content-bg);
        min-height: 100vh;
        margin: var(--offset-sm); // var(--offset-md) 0;
        position: relative;
    }

    .ababa {
        border-radius: 4px;
        width: 250px;
        background-color: var(--content-bg);
        margin-right: var(--offset-sm);
        position: sticky;
        top: 16px;
        height: 700px;
        padding: 16px;
    }

    .wit-wishlist__header {
        position: sticky;
        top: 0;
        padding: var(--offset-sm);
        background-color: inherit;
        z-index: 4;
        border-radius: var(--offset-xxs) var(--offset-xxs) 0 0;
    }

    .wit-wishlist__page-header {
        padding: var(--offset-md);
    }

    .wit-wishlist__content {
        height: 100%;
        flex: 1;
        background-color: var(--content-bg);
        border-radius: var(--offset-xxs);
    }

    .wit-wishlist__content1 {
        padding: 0 var(--offset-sm) var(--offset-sm);
    }

    .wit-more-actions {
        width: 36px;
        height: 36px;
        padding: 0; // var(--offset-xs);
        background-color: var(--primary);
        border: none; // var(--default-border);
        color: var(--body-color);
        transition: width 0.3s ease, margin-right 0.3s ease;
        will-change: width, margin-left;
        overflow: hidden;
        margin-left: var(--offset-xs);

        &.collapsed {
            width: 0;
            margin-left: 0;
        }
    }

    .wit-wishlist-editor__items-list {
        padding: 0 var(--offset-xs);
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
