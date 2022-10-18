<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <UserHeader
      :mode="offersType"
      @deselect="clearSelectedEntities"
      @manage="openMassPriceEditor"
      @remove="deleteAllOffers"
    />

    <UserHeader
      v-if="isStickyHeaderVisible"
      :mode="offersType"
      compact
      @deselect="clearSelectedEntities"
      @manage="openMassPriceEditor"
      @remove="deleteAllOffers"
    />

    <div class="wit-offers-page__content">
      <OfferTabs class="wit-offset-bottom--md" />

      <div class="wit-offers-page__offers wis-block--max-width">
        <Search store-module="manage" class="wit-offset-bottom--md" />

        <OffersList
          v-show="isOffersMode"
          :sorted-offers="sortedOffers"
          @edit="editOffer"
          @remove="deleteOffer"
          @toggle="toggleOffer"
          @toggleRange="onOffersRangeToggle"
        />

        <AvailableItemsList
          v-show="!isOffersMode"
          :sorted-offers="sortedAvailableItems"
          @add="addOffer"
          @toggle="toggleOffer"
          @toggleRange="onOffersRangeToggle"
        />
      </div>
    </div>

    <ItemsFilters store-module-name="manage" />

    <SetMassPricePopup />
    <EditOfferPopup />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { computed, useStore } from '@nuxtjs/composition-api'
import EditOfferPopup from '@/components/basic/offers/EditOfferPopup.vue'
import SetMassPricePopup from '@/components/basic/offers/SetMassPricePopup.vue'
import { ManagePageTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import { OfferTypes, Routes } from '@/shared/index.js'
import { useOffersPage } from '@/composables/index.js'
import { ItemsFilters, Search } from '@/components/basic/index.js'
import { AvailableItemsList, OffersList, OfferTabs, UserHeader } from '@/components/manage'

export default {
    name: 'Manage',

    modes: ManagePageTabs.values,

    components: {
        EditOfferPopup,
        SetMassPricePopup,
        UserHeader,
        OfferTabs,
        OffersList,
        AvailableItemsList,
        ItemsFilters,
        Search
    },

    computed: {
        ...mapState('manage', ['mode']),
        ...mapGetters('manage', [
            'isOffersMode',
            'sortedOfferModels',
            'sortedNonWishlistItems',
            'hasSelectedEntities',
            'selectedExistingOffers',
            'selectedAvailableOffers'
        ])
    },

    middleware: ['isAuthorized'],

    setup () {
        const store = useStore()

        store.commit('manage/MAP_OFFERS')

        const { offersType, isStickyHeaderVisible } = useOffersPage(OfferTypes.WISHLIST)

        const sortedOffers = computed(() => store.getters['manage/sortedOfferModels'])
        const sortedAvailableItems = computed(() => store.getters['manage/sortedNonWishlistItems'])
        const isOffersMode = computed(() => store.getters['manage/isOffersMode'])

        return { isOffersMode, offersType, isStickyHeaderVisible, sortedOffers, sortedAvailableItems }
    },

    // TODO: use Composition API
    async asyncData ({ store, route, $wishlistService, $itemsService, error, $t }) {
        await store.dispatch('manage/setOffersType', OfferTypes.WISHLIST)

        await store.dispatch('manage/setData', {
            defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
            defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
            availableSorts: ItemsFiltersScheme.getAvailableSorts()
        })

        const { offers, profile } = await $wishlistService.fetch(route.params.id)

        if (!profile) {
            return error({ statusCode: 404, linkTitle: $t('Profiles_BackToProfilesList'), linkUrl: Routes.PROFILES })
        }

        await store.dispatch('manage/setProfile', profile)

        const tradableItems = $itemsService.getTradableItems()
        const itemsInWishlistIds = offers.map(offer => offer.itemId)
        const nonWishlistItems = tradableItems.filter(item => !itemsInWishlistIds.includes(item.id))

        await store.dispatch('manage/storeOffers', {
            existingOffers: offers,
            availableItems: nonWishlistItems
        })
    },

    methods: {
        ...mapActions('manage', {
            storeOffers: 'storeOffers',
            toggleMode: 'toggleMode',
            toggleOffer: 'toggleOffer',
            clearSelectedEntities: 'clearSelectedEntities',
            removeOffers: 'removeOffers',
            selectOffers: 'selectOffers'
        }),

        async deleteOffer (offer) {
            const isConfirmed = await this.$showConfirm({
                content: this.$t('Wishlist_ConfirmDelete', [1]),
                popupTitle: this.$t('ConfirmAction')
            })

            if (isConfirmed) {
                this._deleteOffers([offer])
            }
        },

        async deleteAllOffers () {
            const offers = this.selectedExistingOffers.length ? this.selectedExistingOffers : this.sortedOfferModels
            const isConfirmed = await this.$showConfirm({
                content: this.$t('Wishlist_ConfirmDelete', [offers.length]),
                popupTitle: this.$t('ConfirmAction')
            })

            if (isConfirmed) {
                this._deleteOffers(offers)
            }
        },

        _deleteOffers (offers) {
            this.removeOffers(offers)
                .then(({ removedOffersCount }) => {
                    this.$showSuccess(this.$t('OffersRemoved', [removedOffersCount]))
                })
                .catch(this.$showError)
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
            const entities = this.isOffersMode ? offers : nonWishlistItems

            if (entities.length === 1) {
                return this.isOffersMode ? this.editOffer(entities[0]) : this.addOffer(entities[0])
            }

            this.$vfm.show(PopupNames.MANAGE_PRICES, {
                entities: entities.map(offer => offer.clone()),
                existingItems: this.isOffersMode
            })
        },

        onOffersRangeToggle (clickedItemIndex) {
            const offers = this.isOffersMode ? this.sortedOfferModels : this.sortedNonWishlistItems

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
