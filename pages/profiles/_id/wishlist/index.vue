<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <UserHeader :mode="$options.selectedTab" />
    <UserHeader v-if="isStickyHeaderVisible" :mode="$options.selectedTab" compact />

    <div class="wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-block--full-width wit-padding-top--md">
      <OfferTabs class="wit-offset-bottom--md" :selected-tab="$options.selectedTab" />
    </div>

    <div class="wit-wishlist wit-flex wit-flex__item--grow wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-block--full-width">
      <!--      <template v-if="profile">-->
      <div class="wit-flex wit-flex__item--grow wit-flex--wrap">
        <!--          <SidebarPanel :is-visible="isFiltersVisible" class="wit-flex&#45;&#45;align-self-start wit-offset-right&#45;&#45;sm" @close="isFiltersVisible = false">-->
        <!--            <UserView :profile="profile" :mode="'wishlist'" />-->
        <!--          </SidebarPanel>-->

        <div class="wit-wishlist__content1 wit-flex__item--grow" style="flex-basis: 500px;">
          <div class="wit-wishlist__content">
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
      </div>

      <SidebarPanel :is-visible="isFiltersVisible" @close="isFiltersVisible = false">
        <OffersFilter @reset="isFiltersVisible = false" />
      </SidebarPanel>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { onDeactivated, onMounted, ref } from '@nuxtjs/composition-api'
import { StoreModules, User } from '@/store/index.js'
import { Offer } from '@/domain/models/index.js'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import SidebarPanel from '@/components/basic/SidebarPanel.vue'
import { WishlistListSidebarTabs, WishlistListTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'
import { buildUserManageWishlistUrl, buildUserMarketUrl } from '@/utils/index.js'
import { OfferTypes } from '@/shared/index.js'
import { OffersEmptyState, OffersFilter, OffersList, OfferTabs, Search, UserHeader } from '@/components/offers'
import { OfferTabModes } from '@/domain'

export default {
    tabs: WishlistListTabs.values,
    sidebarTabs: WishlistListSidebarTabs.values,

    selectedTab: OfferTabModes.WISHLIST,

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

    async asyncData ({ route, $wishlistService, store, error }) {
        await store.dispatch('offers/setOffersType', OfferTypes.WISHLIST)

        await store.dispatch(`${StoreModules.FILTERS}/setData`, {
            defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
            defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
            availableSorts: ItemsFiltersScheme.getAvailableSorts()
        })

        // return error({ statusCode: 404, linkTitle: 'Back to Profiles', linkUrl: '/profiles' })

        return $wishlistService.fetch(route.params.id)
    },

    data: () => ({
        isFiltersVisible: false,
        selectedTab: WishlistListTabs.WISHLIST,
        sidebarSelectedTab: WishlistListSidebarTabs.PROFILE
    }),

    computed: {
        ...mapState(StoreModules.FILTERS, ['filters']),
        ...mapGetters(StoreModules.OFFERS, [
            'sortedOfferModels'
        ]),

        ...mapState(User.PATH, [
            User.State.USER
        ]),

        isMyProfile () {
            return this.user.id === this.profile.id
        },

        marketSize () {
            return this.profile.marketSize ?? 0
        },

        wishlistSize () {
            return this.profile.wishlistSize ?? 0
        },

        isProfileTabSelected () {
            return this.sidebarSelectedTab === WishlistListSidebarTabs.PROFILE
        },

        manageWishlistURL () {
            return buildUserManageWishlistUrl(this.profile.id)
        },

        marketURL () {
            return buildUserMarketUrl(this.profile.id)
        }
    },

    async created () {
        if (!this.profile) {
            return
        }

        await this.setProfile(this.profile)

        this.storeOffers({
            existingOffers: this.offers.map(offer => Offer.create(offer)),
            availableOffers: []
        })
    },

    setup () {
        const isStickyHeaderVisible = ref(false)

        const scrollHandler = () => isStickyHeaderVisible.value = window.scrollY > 600 && window.innerWidth > 770

        onMounted(() => {
            window.addEventListener('scroll', scrollHandler, { passive: true })
        })

        onDeactivated(() => {
            window.removeEventListener('scroll', scrollHandler)
        })

        return { isStickyHeaderVisible }
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

.wit-wishlist {
    //padding: 0 var(--offset-md) 0;
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
    background-color: var(--card-bg-color);
    border-radius: var(--offset-sm);
}

.wit-wishlist__items-list {
    padding: 0 var(--offset-md) var(--offset-md);
}

.wis-tabs__icon {
    display: none;
}

.wis-tabs__icon2 {
    align-self: flex-end;
}

.wis-tabs__label {
    height: var(--offset-md);
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
