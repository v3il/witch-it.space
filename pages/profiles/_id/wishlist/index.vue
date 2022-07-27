<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <UserHeader :mode="$options.selectedTab" />
    <UserHeader v-if="isStickyHeaderVisible" :mode="$options.selectedTab" compact />

    <div class="wit-offers-page__content">
      <OfferTabs class="wit-offset-bottom--md" :selected-tab="$options.selectedTab" />

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

    <!--    <div class="wit-wishlist wit-flex wit-flex__item&#45;&#45;grow wis-block&#45;&#45;max-width wit-offset-left&#45;&#45;auto wit-offset-right&#45;&#45;auto wit-block&#45;&#45;full-width">-->
    <!--      &lt;!&ndash;      <template v-if="profile">&ndash;&gt;-->
    <!--      <div class="wit-flex wit-flex__item&#45;&#45;grow wit-flex&#45;&#45;wrap">-->
    <!--        &lt;!&ndash;          <SidebarPanel :is-visible="isFiltersVisible" class="wit-flex&#45;&#45;align-self-start wit-offset-right&#45;&#45;sm" @close="isFiltersVisible = false">&ndash;&gt;-->
    <!--        &lt;!&ndash;            <UserView :profile="profile" :mode="'wishlist'" />&ndash;&gt;-->
    <!--        &lt;!&ndash;          </SidebarPanel>&ndash;&gt;-->

    <!--        <div class="wit-wishlist__content1 wit-flex__item&#45;&#45;grow" style="flex-basis: 500px;">-->
    <!--          <div class="wit-wishlist__content">-->
    <!--            <template v-if="sortedOfferModels.length">-->
    <!--              <Search-->
    <!--                :search-query="filters.query"-->
    <!--                @open="isFiltersVisible = true"-->
    <!--                @search="mergeFilters({ query: $event })"-->
    <!--                @reset="resetFilterParam('query')"-->
    <!--              />-->

    <!--              <OffersList :sorted-offers="sortedOfferModels" />-->
    <!--            </template>-->

    <!--            <OffersEmptyState v-else />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      <SidebarPanel :is-visible="isFiltersVisible" @close="isFiltersVisible = false">-->
    <!--        <OffersFilter @reset="isFiltersVisible = false" />-->
    <!--      </SidebarPanel>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { onDeactivated, onMounted, ref, useAsync, useContext, useFetch, useStore } from '@nuxtjs/composition-api'
import { StoreModules, User } from '@/store/index.js'
import { Offer } from '@/domain/models/index.js'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import SidebarPanel from '@/components/basic/SidebarPanel.vue'
import { WishlistListSidebarTabs, WishlistListTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'
import { buildUserManageWishlistUrl, buildUserMarketUrl } from '@/utils/index.js'
import { OfferTypes } from '@/shared/index.js'
import { OffersEmptyState, OffersFilter, OffersList, OfferTabs, Search, UserHeader } from '@/components/offers'
import { OfferTabModes } from '@/domain'
import { useStickyUserHeader } from '@/composables'

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

    // async asyncData ({ route, $wishlistService, store, error }) {
    //     await store.dispatch('offers/setOffersType', OfferTypes.WISHLIST)
    //
    //     await store.dispatch(`${StoreModules.FILTERS}/setData`, {
    //         defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
    //         defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
    //         availableSorts: ItemsFiltersScheme.getAvailableSorts()
    //     })
    //
    //     console.error(1)
    //
    //     // return error({ statusCode: 404, linkTitle: 'Back to Profiles', linkUrl: '/profiles' })
    //
    //     return $wishlistService.fetch(route.params.id)
    // },

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
        ])

        // isMyProfile () {
        //     return this.user.id === this.profile.id
        // },

        // marketSize () {
        //     return this.profile.marketSize ?? 0
        // },

        // wishlistSize () {
        //     return this.profile.wishlistSize ?? 0
        // },

        // isProfileTabSelected () {
        //     return this.sidebarSelectedTab === WishlistListSidebarTabs.PROFILE
        // },

        // manageWishlistURL () {
        //     return buildUserManageWishlistUrl(this.profile.id)
        // },

        // marketURL () {
        //     return buildUserMarketUrl(this.profile.id)
        // }
    },

    // async created () {
    //     if (!this.profile) {
    //         return
    //     }
    //
    //     await this.setProfile(this.profile)
    //
    //     this.storeOffers({
    //         existingOffers: this.offers.map(offer => Offer.create(offer)),
    //         availableOffers: []
    //     })
    // },

    setup () {
        const store = useStore()
        const c = useContext()
        const { $wishlistService } = useContext()

        // console.log(c)

        const name = ref('')

        const { fetch, fetchState } = useFetch(async () => {
            await store.dispatch('offers/setOffersType', OfferTypes.WISHLIST)

            await store.dispatch(`${StoreModules.FILTERS}/setData`, {
                defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
                defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
                availableSorts: ItemsFiltersScheme.getAvailableSorts()
            })

            const { offers, profile } = await $wishlistService.fetch(22)

            await store.dispatch('offers/setProfile', profile)
            await store.dispatch('offers/storeOffers', {
                existingOffers: offers.map(offer => Offer.create(offer)),
                availableOffers: []
            })

            // console.error(profile)
        })

        // fetch()

        // const d = useAsync(() => {
        //     return Promise.all([
        //         store.dispatch('offers/setOffersType', OfferTypes.WISHLIST),
        //         store.dispatch(`${StoreModules.FILTERS}/setData`, {
        //             defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
        //             defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
        //             availableSorts: ItemsFiltersScheme.getAvailableSorts()
        //         }),
        //         $wishlistService.fetch(22)
        //     ])
        //
        //     // await store.dispatch('offers/setOffersType', OfferTypes.WISHLIST)
        //     //
        //     // await store.dispatch(`${StoreModules.FILTERS}/setData`, {
        //     //     defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
        //     //     defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
        //     //     availableSorts: ItemsFiltersScheme.getAvailableSorts()
        //     // })
        //     //
        //     // const { offers, profile } = $wishlistService.fetch(22)
        //     //
        //     // return { offers, profile }
        //
        //     // const { offers, profile } = { profile: { displayName: 'test' } }
        //     //
        //     // return { offers, profile }
        // }, 'offers')

        // console.error(d.value)

        // console.error(333, profile)

        const { isStickyHeaderVisible } = useStickyUserHeader()

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

//.wit-wishlist {
//    //padding: 0 var(--offset-md) 0;
//}
//
//.wit-wishlist__header {
//    position: sticky;
//    top: 0;
//    padding: var(--offset-sm);
//    background-color: inherit;
//    z-index: 4;
//    border-radius: var(--offset-xxs) var(--offset-xxs) 0 0;
//}
//
//.wit-wishlist__content {
//    flex: 1;
//    background-color: var(--card-bg-color);
//    border-radius: var(--offset-sm);
//}
//
//.wit-wishlist__items-list {
//    padding: 0 var(--offset-md) var(--offset-md);
//}
//
//.wis-tabs__icon {
//    display: none;
//}
//
//.wis-tabs__icon2 {
//    align-self: flex-end;
//}
//
//.wis-tabs__label {
//    height: var(--offset-md);
//}
//
//@media (max-width: 767.98px) {
//    .wis-tabs__icon {
//        display: block;
//    }
//
//    .wis-tabs__label {
//        display: none;
//    }
//}
</style>
