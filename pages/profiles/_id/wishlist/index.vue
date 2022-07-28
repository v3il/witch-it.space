<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <UserHeader :mode="offersType" />
    <UserHeader v-if="isStickyHeaderVisible" :mode="offersType" compact />

    <div class="wit-offers-page__content">
      <OfferTabs class="wit-offset-bottom--md" :selected-tab="offersType" />

      <div class="wit-offers-page__offers wis-block--max-width">
        <template v-if="sortedOffers.length">
          <Search :search-query="filters.query" @open="isFiltersVisible = true" />
          <OffersList :sorted-offers="sortedOffers" />
        </template>

        <OffersEmptyState v-else />
      </div>
    </div>

    <SidebarPanel :is-visible="isFiltersVisible" @close="isFiltersVisible = false">
      <OffersFilter @reset="isFiltersVisible = false" />
    </SidebarPanel>
  </div>
</template>

<script>
import { SidebarPanel } from '@/components/basic'
import { OffersEmptyState, OffersFilter, OffersList, OfferTabs, Search, UserHeader } from '@/components/offers'
import { useOffersPage } from '@/composables'
import { OfferTypes } from '@/shared/index.js'

export default {
    components: {
        SidebarPanel,
        UserHeader,
        OfferTabs,
        Search,
        OffersList,
        OffersFilter,
        OffersEmptyState
    },

    middleware: ['isAuthorized'],

    setup () {
        const {
            offersType,
            isFiltersVisible,
            isStickyHeaderVisible,
            filters,
            sortedOffers
        } = useOffersPage(OfferTypes.WISHLIST)

        return { offersType, isFiltersVisible, isStickyHeaderVisible, filters, sortedOffers }
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
    background-color: var(--card-bg-color);
    border-radius: 16px;
    margin-left: auto;
    margin-right: auto;
}
</style>
