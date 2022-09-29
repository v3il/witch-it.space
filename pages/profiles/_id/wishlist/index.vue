<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <UserHeader :mode="offersType" />
    <UserHeader v-if="isStickyHeaderVisible" :mode="offersType" compact />

    <div class="wit-offers-page__content">
      <OfferTabs class="wit-offset-bottom--md" :selected-tab="offersType" />

      <div class="wit-offers-page__offers wis-block--max-width">
        <Search store-module="offers" class="wit-offset-bottom--md" />
        <OffersList :sorted-offers="sortedOffers" />
      </div>
    </div>

    <ItemsFilters store-module-name="offers" />
  </div>
</template>

<script>
import { ItemsFilters, Search } from '@/components/basic'
import { OffersList, OfferTabs, UserHeader } from '@/components/offers'
import { useOffersPage } from '@/composables'
import { OfferTypes, Routes } from '@/shared/index.js'
import { StoreModules } from '@/store/index.js'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import { Offer } from '@/domain/models/index.js'

export default {
    components: {
        UserHeader,
        OfferTabs,
        Search,
        OffersList,
        ItemsFilters
    },

    setup () {
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

        await store.dispatch(`${StoreModules.OFFERS}/setProfile`, profile)
        await store.dispatch(`${StoreModules.OFFERS}/storeOffers`, {
            existingOffers: offers.map(offer => Offer.create(offer)),
            availableOffers: []
        })
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
