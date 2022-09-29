<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <UserHeader :mode="offersType" />
    <UserHeader v-if="isStickyHeaderVisible" :mode="offersType" compact />

    <div class="wit-offers-page__content">
      <OfferTabs class="wit-offset-bottom--md" :selected-tab="offersType" />

      <div class="wit-offers-page__offers wis-block--max-width">
        manage
        <Search store-module="offers" class="wit-offset-bottom--md" />
        <OffersList :sorted-offers="sortedOffers" />
      </div>
    </div>

    <ItemsFilters store-module-name="offers" />
  </div>

<!--  <div class="wit-wishlist">-->
<!--    <div class="wit-wishlist__background wit-flex">-->
<!--      <div class="wit-wishlist__content">-->
<!--        <div class="wit-flex wit-flex&#45;&#45;justify-between wit-wishlist__header">-->
<!--          <Tabs :modes="$options.modes" :selected-mode="mode" @switch="toggleMode">-->
<!--            <template #tab0>-->
<!--              <div class="wit-flex wit-flex&#45;&#45;align-center">-->
<!--                <span class="wis-tabs__label">{{ $t('Wishlist_MyWishlist') }}</span>-->
<!--                <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-heart" /></span>-->
<!--                <b-tag rounded class="wit-offset-left&#45;&#45;xs wit-font-weight&#45;&#45;700">-->
<!--                  {{ sortedOfferModels.length }}-->
<!--                </b-tag>-->
<!--              </div>-->
<!--            </template>-->

<!--            <template #tab1>-->
<!--              <div class="wit-flex wit-flex&#45;&#45;align-center">-->
<!--                <span class="wis-tabs__label">{{ $t('Wishlist_OtherItems') }}</span>-->
<!--                <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-grid" /></span>-->
<!--                <b-tag rounded class="wit-offset-left&#45;&#45;xs wit-font-weight&#45;&#45;700">-->
<!--                  {{ sortedNonWishlistItems.length }}-->
<!--                </b-tag>-->
<!--              </div>-->
<!--            </template>-->
<!--          </Tabs>-->

<!--          <div class="wit-flex">-->
<!--            <SearchInput-->
<!--              :placeholder="$t('Items_SearchByItemName')"-->
<!--              :query="filters.query"-->
<!--              @update="mergeFilters({ query: $event })"-->
<!--              @reset="resetFilterParam"-->
<!--              @toggle="isFiltersVisible = !isFiltersVisible"-->
<!--            />-->

<!--            <Dropdown position="bottom-end">-->
<!--              <template #trigger>-->
<!--                <b-button type="is-link" class="wit-position&#45;&#45;relative wit-more-actions">-->
<!--                  <i class="mdi mdi-20px mdi-cog" />-->
<!--                </b-button>-->
<!--              </template>-->

<!--              <template #items>-->
<!--                <DropdownItem-->
<!--                  v-if="hasSelectedEntities"-->
<!--                  @click="clearSelectedEntities"-->
<!--                >-->
<!--                  {{ $t('Wishlist_Manage_Deselect') }}-->
<!--                </DropdownItem>-->

<!--                <DropdownItem @click="openMassPriceEditor">-->
<!--                  <span class="wit-color&#45;&#45;success">-->
<!--                    {{ isMyWishlistMode ? $t('Wishlist_Manage_ChangePrices') : $t('Wishlist_Manage_AddToWishlist') }}-->
<!--                  </span>-->
<!--                </DropdownItem>-->

<!--                <DropdownItem v-if="isMyWishlistMode" @click="deleteAllOffers">-->
<!--                  <span class="wit-color&#45;&#45;danger">{{ $t('Wishlist_Manage_RemoveOffers') }}</span>-->
<!--                </DropdownItem>-->
<!--              </template>-->
<!--            </Dropdown>-->
<!--          </div>-->
<!--        </div>-->

<!--        <ItemsListView v-if="isMyWishlistMode" :items="sortedOfferModels" class="wit-wishlist__items-list">-->
<!--          <template #default="{ items: offers }">-->
<!--            <ItemView-->
<!--              v-for="(offer, index) in offers"-->
<!--              :key="offer.id"-->
<!--              :item="offer.item"-->
<!--              :is-selected="offer.isSelected"-->
<!--              add-title-->
<!--              add-border-->
<!--              @clicked="toggleOffer(offer)"-->
<!--              @shiftClick="onOffersRangeToggle(index)"-->
<!--            >-->
<!--              <div class="wit-offer-controls">-->
<!--                <IconButton-->
<!--                  icon="pencil-ruler"-->
<!--                  type="primary"-->
<!--                  circle-->
<!--                  :size="24"-->
<!--                  :disabled="offer.isSelected"-->
<!--                  @click="editOffer(offer)"-->
<!--                />-->
<!--              </div>-->

<!--              <div class="wit-offer-controls wit-offer-controls&#45;&#45;remove">-->
<!--                <IconButton-->
<!--                  icon="close"-->
<!--                  type="danger"-->
<!--                  circle-->
<!--                  :size="24"-->
<!--                  :disabled="offer.isSelected"-->
<!--                  @click="deleteOffer(offer)"-->
<!--                />-->
<!--              </div>-->
<!--              <ItemPriceList :prices="offer.prices" />-->
<!--            </ItemView>-->
<!--          </template>-->
<!--        </ItemsListView>-->

<!--        <ItemsListView v-else :items="sortedNonWishlistItems" class="wit-wishlist__items-list">-->
<!--          <template #default="{ items: offers }">-->
<!--            <ItemView-->
<!--              v-for="(offer, index) in offers"-->
<!--              :key="offer.item.id"-->
<!--              :item="offer.item"-->
<!--              :is-selected="offer.isSelected"-->
<!--              add-title-->
<!--              add-border-->
<!--              @clicked="toggleOffer(offer)"-->
<!--              @shiftClick="onOffersRangeToggle(index)"-->
<!--            >-->
<!--              <div class="wit-offer-controls">-->
<!--                <IconButton-->
<!--                  icon="plus-thick"-->
<!--                  type="primary"-->
<!--                  circle-->
<!--                  :size="24"-->
<!--                  :disabled="offer.isSelected"-->
<!--                  @click="addOffer(offer)"-->
<!--                />-->
<!--              </div>-->
<!--            </ItemView>-->
<!--          </template>-->
<!--        </ItemsListView>-->
<!--      </div>-->

<!--      <SidebarPanel :is-visible="isFiltersVisible" from="right" icon="filter" :title="$t('Filter')" @close="isFiltersVisible = false">-->
<!--        <WishlistFilters />-->
<!--      </SidebarPanel>-->
<!--    </div>-->

<!--    <SetMassPricePopup />-->
<!--    <EditOfferPopup />-->
<!--  </div>-->
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
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
import { ManageWishlistTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'
import { Offer } from '@/domain/models/index.js'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'
import SearchInput from '@/components/basic/filters/SearchInput.vue'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import BackButton from '@/components/basic/BackButton.vue'
import SidebarPanel from '@/components/basic/SidebarPanel.vue'
import { OfferTypes, Routes } from '@/shared/index.js'
import { buildUserWishlistUrl } from '@/utils/index.js'
import { useOffersPage } from '@/composables/index.js'
import { UserHeader, OfferTabs, OffersList } from '@/components/offers/index.js'
import { ItemsFilters, Search } from '@/components/basic/index.js'

export default {
    name: 'Manage',

    modes: ManageWishlistTabs.values,

    components: {
        WishlistFilters,
        TopNavBar,
        Tabs,
        ItemPriceList,
        Dropdown,
        DropdownItem,
        IconButton,
        EditOfferPopup,
        SetMassPricePopup,
        ItemView,
        ItemsListView,
        SearchInput,
        BackButton,
        SidebarPanel,
        UserHeader,
        OfferTabs,
        OffersList,
        ItemsFilters,
        Search
    },

    // async asyncData ({ route, $wishlistService, store }) {
    //     await store.dispatch('offers/setOffersType', OfferTypes.WISHLIST)
    //
    //     await store.dispatch(`${StoreModules.FILTERS}/setData`, {
    //         defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
    //         defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
    //         availableSorts: ItemsFiltersScheme.getAvailableSorts()
    //     })
    //
    //     return $wishlistService.fetch(route.params.id)
    // },

    computed: {
        ...mapState(StoreModules.FILTERS, ['filters']),
        ...mapState(StoreModules.USER, ['user']),
        ...mapState(StoreModules.OFFERS, ['mode']),
        ...mapGetters(StoreModules.OFFERS, [
            'isMyWishlistMode',
            'sortedOfferModels',
            'sortedNonWishlistItems',
            'hasSelectedEntities',
            'selectedExistingOffers',
            'selectedAvailableOffers'
        ]),

        wishlistURL () {
            return buildUserWishlistUrl(this.user.id)
        }
    },

    middleware: ['isAuthorized'],

    setup (props) {
        const { offersType, isStickyHeaderVisible, sortedOffers } = useOffersPage(OfferTypes.WISHLIST)
        return { offersType, isStickyHeaderVisible, sortedOffers }
    },

    // TODO: use Composition API
    async asyncData ({ store, route, $wishlistService, error, $t }) {
        await store.dispatch('offers/setOffersType', OfferTypes.WISHLIST)

        await store.dispatch('offers/setData', {
            defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
            defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
            availableSorts: ItemsFiltersScheme.getAvailableSorts()
        })

        const { offers, profile } = await $wishlistService.fetch(route.params.id)

        if (!profile) {
            return error({ statusCode: 404, linkTitle: $t('Profiles_BackToProfilesList'), linkUrl: Routes.PROFILES })
        }

        await store.dispatch('offers/setProfile', profile)
        await store.dispatch('offers/storeOffers', {
            existingOffers: offers.map(offer => Offer.create(offer)),
            availableOffers: []
        })
    },

    data: () => ({
        isFiltersVisible: false
    }),

    // created () {
    //     if (this.error) {
    //         return
    //     }
    //
    //     const tradableItems = this.$itemsService.getTradableItems()
    //     const itemsInWishlistIds = this.offers.map(offer => offer.itemId)
    //     const nonWishlistItems = tradableItems.filter(item => !itemsInWishlistIds.includes(item.id))
    //
    //     this.storeOffers({
    //         existingOffers: this.offers.map(offer => Offer.create(offer)),
    //         availableOffers: nonWishlistItems.map(item => Offer.fromItem(item))
    //     })
    // },
    //
    // mounted () {
    //     if (this.error) {
    //         this.$showError(this.error)
    //     }
    // },

    methods: {
        ...mapActions(StoreModules.OFFERS, {
            storeOffers: 'storeOffers',
            toggleMode: 'toggleMode',
            toggleOffer: 'toggleOffer',
            clearSelectedEntities: 'clearSelectedEntities',
            removeOffers: 'removeOffers',
            selectOffers: 'selectOffers'
        }),

        ...mapActions(StoreModules.FILTERS, {
            mergeFilters: 'mergeFilters',
            resetFilterParam: 'resetFilterParam'
        }),

        async deleteOffer (offer) {
            const isConfirmed = await this.$showConfirm({
                content: this.$t('Wishlist_ConfirmDelete', [1]),
                popupTitle: this.$t('ConfirmAction')
            })

            if (!isConfirmed) {
                return
            }

            this._deleteOffers([offer])
        },

        async deleteAllOffers () {
            const offers = this.selectedExistingOffers.length ? this.selectedExistingOffers : this.sortedOfferModels
            const isConfirmed = await this.$showConfirm({
                content: this.$t('Wishlist_ConfirmDelete', [offers.length]),
                popupTitle: this.$t('ConfirmAction')
            })

            if (!isConfirmed) {
                return
            }

            this._deleteOffers(offers)
        },

        _deleteOffers (offers) {
            this.removeOffers(offers)
                .then(({ removedOffersCount }) => {
                    this.$showSuccess(this.$t('OffersRemoved', [removedOffersCount]))
                })
                .catch(this.$showError)
        },

        editOffer (offer) {
            console.error(offer.clone())

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
            const offers = this.isMyWishlistMode ? this.sortedOfferModels : this.sortedNonWishlistItems

            for (let i = clickedItemIndex - 1; i >= 0; i--) {
                if (offers[i].isSelected) {
                    return this.selectOffers({ from: i + 1, to: clickedItemIndex })
                }
            }

            for (let i = clickedItemIndex + 1; i < offers.length; i++) {
                if (offers[i].isSelected) {
                    return this.selectOffers({ from: clickedItemIndex, to: i - 1 })
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wit-offers-page {
    min-height: 100vh;
}

.wit-offers-page__content {
    width: 100%;
    padding: 24px;
}

.wit-offers-page__offers {
    margin-left: auto;
    margin-right: auto;
}
</style>

<!--<style scoped lang="scss">-->
<!--    .wit-wishlist__background {-->
<!--        min-height: calc(100vh - var(&#45;&#45;header-height));-->
<!--        margin: var(&#45;&#45;offset-sm) var(&#45;&#45;offset-sm) 0;-->
<!--        position: relative;-->
<!--    }-->

<!--    .wit-wishlist__header {-->
<!--        position: sticky;-->
<!--        top: 0;-->
<!--        padding: var(&#45;&#45;offset-sm);-->
<!--        background-color: inherit;-->
<!--        z-index: 4;-->
<!--        border-radius: var(&#45;&#45;offset-xxs) var(&#45;&#45;offset-xxs) 0 0;-->
<!--    }-->

<!--    .wit-wishlist__content {-->
<!--        flex: 1;-->
<!--        background-color: var(&#45;&#45;content-bg);-->
<!--        border-radius: var(&#45;&#45;offset-xxs);-->
<!--        margin-bottom: var(&#45;&#45;offset-sm);-->
<!--    }-->

<!--    .wit-wishlist__items-list {-->
<!--        padding: 0 var(&#45;&#45;offset-sm) var(&#45;&#45;offset-sm);-->
<!--    }-->

<!--    .wit-more-actions {-->
<!--        width: 36px;-->
<!--        height: 36px;-->
<!--        padding: 0;-->
<!--        transition: width 0.3s ease, margin-right 0.3s ease;-->
<!--        will-change: width, margin-left;-->
<!--        overflow: hidden;-->
<!--        margin-left: var(&#45;&#45;offset-xs);-->
<!--        background: #2e3648;-->
<!--        border: var(&#45;&#45;default-border);-->
<!--        color: var(&#45;&#45;muted-text-color);-->
<!--    }-->

<!--    .wit-offer-controls {-->
<!--        position: absolute;-->
<!--        top: 16px;-->
<!--        right: -10px;-->
<!--        padding: var(&#45;&#45;offset-xxs) 0 var(&#45;&#45;offset-xxs) var(&#45;&#45;offset-xxs);-->
<!--        background: var(&#45;&#45;card-bg-color);-->
<!--        z-index: 3;-->
<!--        border-radius: 50% 0 0 50%;-->
<!--    }-->

<!--    .wit-offer-controls&#45;&#45;remove {-->
<!--        top: 48px;-->
<!--    }-->

<!--    .wis-tabs__icon {-->
<!--        display: none;-->
<!--    }-->

<!--    @media (max-width: 767.98px) {-->
<!--        .wis-tabs__icon {-->
<!--            display: block;-->
<!--        }-->

<!--        .wis-tabs__label {-->
<!--            display: none;-->
<!--        }-->
<!--    }-->
<!--</style>-->
