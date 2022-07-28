<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <UserHeader :mode="offersType" />
    <UserHeader v-if="isStickyHeaderVisible" :mode="offersType" compact />

    <div class="wit-offers-page__content">
      <OfferTabs class="wit-offset-bottom--md" :selected-tab="offersType" />

      <div class="wit-offers-page__offers wis-block--max-width">
        <template v-if="sortedOfferModels.length">
          <Search
            :search-query="filters.query"
            @open="isFiltersVisible = true"
            @search="mergeFilters({ query: $event })"
            @reset="resetFilterParam('query')"
          />

          <OffersList :sorted-offers="sortedOfferModels" />
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
import { mapActions, mapGetters, mapState } from 'vuex'
import { StoreModules } from '@/store/index.js'
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

    computed: {
        ...mapState(StoreModules.FILTERS, ['filters']),
        ...mapGetters(StoreModules.OFFERS, ['sortedOfferModels'])
    },

    setup () {
        const { offersType, isFiltersVisible, isStickyHeaderVisible } = useOffersPage(OfferTypes.MARKET)

        return { offersType, isFiltersVisible, isStickyHeaderVisible }
    },

    methods: {
        ...mapActions(StoreModules.FILTERS, {
            mergeFilters: 'mergeFilters',
            resetFilterParam: 'resetFilterParam'
        }),

        ...mapActions(StoreModules.OFFERS, {
            storeOffers: 'storeOffers',
            setProfile: 'setProfile'
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
    background-color: var(--card-bg-color);
    border-radius: 16px;
    margin-left: auto;
    margin-right: auto;
}
</style>
