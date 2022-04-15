<template>
  <div class="wit-wishlist">
    <div class="wit-background--content">
      <div class="wit-flex wit-flex--wrap-reverse wit-flex--justify-between wit-wishlist__header">
        <Tabs :modes="$options.modes" :selected-mode="mode" class="wit-tabs-switcher" @switch="toggleMode">
          <template #tab0>
            {{ $t('Wishlist_MyWishlist') }}
            <b-tag rounded class="wit-offset-left--xxs wit-font-weight--700">
              {{ sortedOfferModels.length }}
            </b-tag>
          </template>

          <template #tab1>
            {{ $t('Wishlist_AllItems') }}
            <b-tag rounded class="wit-offset-left--xxs wit-font-weight--700">
              {{ sortedNonWishlistItems.length }}
            </b-tag>
          </template>
        </Tabs>

        <div class="wit-flex wit-flex--align-start wit-padding-right--xs1">
          <WishlistFilters
            :filters="filters"
            :is-filters-changed="isFiltersChanged"
            :is-sorts-changed="isSortsChanged"
            :sorts="sorts"
            class="wit-wishlist-editor__items-filter wit-offset-right--xs"
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

      <template v-if="isMyWishlistMode">
        <!--            <VirtualScrollBar :items="sortedOfferModels" />-->

        <div class="wit-flex wit-flex--wrap wit-items__item-grid wit-wishlist__content">
          <ItemView
            v-for="(offer) in slicedItems"
            :key="offer.id"
            :item="offer.item"
            :is-selected="isOfferSelected(offer)"
            @clicked="toggleOffer(offer)"
            @shiftClick="onRangeToggle(index)"
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
        </div>

      <!--            <ItemsListView v-if="1" :items="sortedOfferModels" class="wit-wishlist-editor__items-list wit-flex__item&#45;&#45;grow">-->
      <!--              <template #default="{ items: offers }">-->
      <!--                <ItemView-->
      <!--                              v-for="(offer, index) in offers"-->
      <!--                              :key="offer.id"-->
      <!--                              :item="offer.item"-->
      <!--                              :is-selected="isOfferSelected(offer)"-->
      <!--                              @clicked="toggleOffer(offer)"-->
      <!--                              @shiftClick="onRangeToggle(index)"-->
      <!--                >-->
      <!--                              <div class="wit-offer-controls">-->
      <!--                                <IconButton-->
      <!--                                  icon="pencil-ruler"-->
      <!--                                  type="primary"-->
      <!--                                  circle-->
      <!--                                  :size="24"-->
      <!--                                  :disabled="isOfferSelected(offer)"-->
      <!--                                  @click="editOffer(offer)"-->
      <!--                                />-->
      <!--                              </div>-->

      <!--                              <div class="wit-offer-controls wit-offer-controls&#45;&#45;remove">-->
      <!--                                <IconButton-->
      <!--                                  icon="close"-->
      <!--                                  type="danger"-->
      <!--                                  circle-->
      <!--                                  :size="24"-->
      <!--                                  :disabled="isOfferSelected(offer)"-->
      <!--                                  @click="deleteOffer(offer)"-->
      <!--                                />-->
      <!--                              </div>-->
      <!--                  &lt;!&ndash;                  <ItemPriceList :prices="offer.prices" />&ndash;&gt;-->
      <!--                </ItemView>-->
      <!--              </template>-->
      <!--            </ItemsListView>-->
      </template>

      <template v-if="isNonWishlistItemsMode">
        <ItemsListView :items="sortedNonWishlistItems" class="wit-wishlist-editor__items-list wit-flex__item--grow">
          <template #default="{ items }">
            <ItemView
              v-for="(item, index) in items"
              :key="item.id"
              :item="item"
              :is-selected="isItemSelected(item)"
              @clicked="toggleNonWishlistItem"
              @shiftClick="onRangeToggle(index)"
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
      </template>

      <SetMassPricePopup />
      <EditOfferPopup />
    </div>

    <div class="wit-profile wit-flex">
      <div class="wit-flex wit-paddings--sm1 wit-flex__item--grow">
        <div class="wit-wishlist-editor__items-container wit-background--content wit-flex wit-flex--column">
          <!--          <div class="wit-flex wit-flex&#45;&#45;wrap-reverse wit-flex&#45;&#45;justify-between">-->
          <!--            <Tabs :modes="$options.modes" :selected-mode="mode" class="wit-tabs-switcher" @switch="toggleMode">-->
          <!--              <template #tab0>-->
          <!--                {{ $t('Wishlist_MyWishlist') }}-->
          <!--                <b-tag rounded class="wit-offset-left&#45;&#45;xxs wit-font-weight&#45;&#45;700">-->
          <!--                  {{ sortedOfferModels.length }}-->
          <!--                </b-tag>-->
          <!--              </template>-->

          <!--              <template #tab1>-->
          <!--                {{ $t('Wishlist_AllItems') }}-->
          <!--                <b-tag rounded class="wit-offset-left&#45;&#45;xxs wit-font-weight&#45;&#45;700">-->
          <!--                  {{ sortedNonWishlistItems.length }}-->
          <!--                </b-tag>-->
          <!--              </template>-->
          <!--            </Tabs>-->

          <!--            <div class="wit-flex wit-flex&#45;&#45;align-start wit-padding-right&#45;&#45;xs">-->
          <!--              <WishlistFilters-->
          <!--                :filters="filters"-->
          <!--                :is-filters-changed="isFiltersChanged"-->
          <!--                :is-sorts-changed="isSortsChanged"-->
          <!--                :sorts="sorts"-->
          <!--                class="wit-wishlist-editor__items-filter wit-offset-bottom&#45;&#45;xs"-->
          <!--                @filtersChanged="onFiltersChange"-->
          <!--                @sortChanged="onSortChange"-->
          <!--                @resetFilter="resetFilter"-->
          <!--                @resetFilters="resetFilters"-->
          <!--              />-->

          <!--              <Dropdown position="bottom-end">-->
          <!--                <template #trigger>-->
          <!--                  <b-button type="is-link" class="wit-position&#45;&#45;relative wit-more-actions">-->
          <!--                    <i class="mdi mdi-24px mdi-dots-grid" />-->
          <!--                  </b-button>-->
          <!--                </template>-->

          <!--                <template #items>-->
          <!--                  <DropdownItem @click="openMassPriceEditor">-->
          <!--                    Set price-->
          <!--                  </DropdownItem>-->

          <!--                  <DropdownItem-->
          <!--                    v-if="hasSelectedEntities"-->
          <!--                    @click="clearSelectedEntities"-->
          <!--                  >-->
          <!--                    Clear selection-->
          <!--                  </DropdownItem>-->

          <!--                  <DropdownItem @click="deleteAllOffers">-->
          <!--                    <span class="wit-color&#45;&#45;danger">Remove selected offers</span>-->
          <!--                  </DropdownItem>-->
          <!--                </template>-->
          <!--              </Dropdown>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { isEqual } from 'lodash'
import { $vfm } from 'vue-final-modal'
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
        VirtualScrollBar
    },

    async asyncData ({ store, route, $wishlistService }) {
        await store.dispatch(`${StoreModules.WISHLIST}/getInitialFilters`, route)
        await store.dispatch(`${StoreModules.WISHLIST}/getInitialSorts`, route)

        return $wishlistService.fetch(route.params.id)
    },

    data: () => ({
        page: 2

        // existingOffers: [],
        // newOffers: [],
        // editingOffer: null,
        // show: false
        // selectedExistingOffers: [],
        // selectedNewOffers: []
    }),

    mounted () {
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500) {
                this.page++
            }
        })
    },

    computed: {
        slicedItems () {
            return this.sortedOfferModels.slice(0, this.page * 50)
        },

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

    created () {
        this.saveOffers(this.offers)
    },

    methods: {
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

        // massAction (prices) {
        //     // this.addItemsToWishlist(prices)
        //     this.isMyWishlistMode ? this.setMassPrices2(prices) : this.addItemsToWishlist(prices)
        // },

        // async addItemsToWishlist (prices) {
        //     const items = this.selectedNonWishlistItems.length ? this.selectedNonWishlistItems : this.sortedNonWishlistItems
        //     const { created, error } = await this.createOffers({ items, prices })
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     this.$refs.massPriceEditorPopup.close()
        //     this.$showSuccess(`Created ${created} offer`)
        // },
        //
        // async setMassPrices2 (prices) {
        //     const offers = this.selectedOffers.length ? this.selectedOffers : this.sortedOfferModels
        //     const { created, error } = await this.setMassPrices({ offers, prices })
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     this.$refs.massPriceEditorPopup.close()
        //     this.$showSuccess(`Updated ${created} offer`)
        // },

        // async saveOffer () {
        //     if (this.editingOffer.isNew) {
        //         const items = this.editingOffer.item
        //         const prices = this.editingOffer.prices
        //         const { created, error } = await this.createOffers({ items, prices })
        //
        //         if (error) {
        //             return this.$showError(error)
        //         }
        //
        //         this.$refs.massPriceEditorPopup.close()
        //         this.$showSuccess(`Created ${created} offer`)
        //     }
        //
        //     return this.editingOffer.isNew ? this.addOffer() : this.saveEditingOffer()
        // },

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

        // =============================

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

        // async removeFromWishlist () {
        //     const { error, entityIds, removed } = await this.$wishlistService.removeFromWishlist(this.sortedExistingOffers)
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     const removedOffers = this.existingOffers.filter(offerModel => entityIds.includes(offerModel.id))
        //     const newOffers = removedOffers.map(offer => this.$wishlistService.createNewWishlistItem(offer.item))
        //
        //     this.newOffers.push(...newOffers)
        //     this.existingOffers = this.existingOffers.filter(offer => !removedOffers.includes(offer))
        //
        //     this.$showSuccess(`Removed ${removed} items`)
        // },

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
            const offers = this.isNonWishlistItemsMode ? this.sortedNewOffers : this.sortedExistingOffers

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
            const offers = this.isNonWishlistItemsMode ? this.sortedNewOffers : this.sortedExistingOffers

            for (let index = from; index <= to; index++) {
                this.addToEditing(offers[index])
            }
        }

        // async deleteOffer (offer) {
        //     const { error, removed } = await this.$wishlistService.removeFromWishlist([offer])
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     const newOffer = this.$wishlistService.createNewWishlistItem(offer.item)
        //
        //     this.newOffers.push(newOffer)
        //     this.existingOffers = this.existingOffers.filter(o => o !== offer)
        //
        //     this.$showSuccess(`Removed ${removed} items`)
        //
        //     this.editingOffer = null
        //     this.$refs.editOfferPopup.close()
        // },

        // cancelEditing () {
        //     // this.editingOffer.cancelChanges()
        //     this.editingOffer = null
        // },

        // async saveEditingOffer () {
        //     const { updated, error } = await this.$wishlistService.saveWishlist([this.editingOffer])
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     this.$wishlistService.updateWishlistItem(this.editingOffer, updated[0])
        //
        //     this.editingOffer = null
        //     this.$refs.editOfferPopup.close()
        //
        //     this.$showSuccess(`Updated ${updated.length} offer`)
        // }

        // async saveNewOffer () {
        //     const { created, error } = await this.$wishlistService.saveWishlist([this.editingOffer])
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     const offerModel = this.$wishlistService.createWishlistItem({ wishlistItem: created[0] })
        //     this.existingOffers.push(offerModel)
        //
        //     this.newOffers = this.newOffers.filter(offer => offer !== this.editingOffer)
        //
        //     this.editingOffer = null
        //     this.$refs.editOfferPopup.close()
        //
        //     this.$showSuccess(`Created ${created.length} offer`)
        // },

        // saveOffer () {
        //     return this.editingOffer.isNew ? this.saveNewOffer() : this.saveEditingOffer()
        // },

        // massAction (prices) {
        //     this.isMyWishlistMode ? this.setMassPrices(prices) : this.massCreate(prices)
        // },

        // async setMassPrices (prices) {
        //     const { updated, error } = await this.$wishlistService.setMassPrice(this.selectedOffers, prices)
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     updated.forEach((updatedOffer) => {
        //         const offer = this.existingOffers.find(existingOffer => updatedOffer.id === existingOffer.id)
        //
        //         if (offer) {
        //             this.$wishlistService.updateWishlistItem(offer, updatedOffer)
        //         }
        //     })
        //
        //     console.log(updated)
        //
        //     // this.selectedOffers.forEach((offer, index) => {
        //     //     const upd = updated[index] || created[index]
        //     //
        //     //     this.$wishlistService.updateWishlistItem(offer, upd)
        //     // })
        //
        //     // this.editingOffer = null
        //     this.$refs.massPriceEditorPopup.close()
        //
        //     this.$showSuccess(`Updated ${updated.length} offers`)
        // },

        // async massCreate (prices) {
        //     console.log(this.selectedOffers)
        //
        //     const copies = this.selectedOffers.map((offer) => {
        //         const clone = offer.clone()
        //         const priceClones = prices.map(price => price.clone())
        //         clone.setPrices(priceClones)
        //
        //         return clone
        //     })
        //
        //     const { offers, error } = await this.$wishlistService.massCreate(copies)
        //
        //     if (error) {
        //         return this.$showError(error)
        //     }
        //
        //     const newOffers = offers.map(offer => this.$wishlistService.createWishlistItem({ wishlistItem: offer }))
        //
        //     // const offerModel = this.$wishlistService.createWishlistItem({ wishlistItem: created[0] })
        //     this.existingOffers.push(...newOffers)
        //
        //     this.newOffers = this.newOffers.filter(offer => !this.selectedOffers.includes(offer))
        //
        //     this.selectedNewOffers = []
        //     this.$refs.massPriceEditorPopup.close()
        //
        //     this.$showSuccess(`Created ${newOffers.length} offer`)
        // }
    }
}
</script>

<style scoped lang="scss">
.wit-wishlist {
    //height: calc(100vh - var(--header-height));
    //max-height: calc(100vh - var(--header-height));
    padding-left: var(--offset-sm);
    padding-right: var(--offset-sm);
}

.wit-wishlist__header {
    position: sticky;
    top: 0;
    padding: var(--offset-sm);
    background-color: inherit;
    z-index: 10000;
}

.wit-wishlist__content {
    padding: 0 var(--offset-sm);
}

.wit-wishlist-editor__items-container {
    flex: 1;
    border-radius: var(--offset-xxs);
    padding: var(--offset-sm) var(--offset-xs);
}

.wit-wishlist-editor__items-filter1,
.wit-tabs-switcher1,
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

// -----

.wit-items__item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-column-gap: 16px;
    justify-items: center;
    grid-row-gap: 16px;

    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
}
</style>
