<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <TopNavBar class="layout__header">
      <template #brand>
        <h1 class="wit-font-size--sm wit-flex wit-flex--align-center">
          <span v-if="profile">{{ profile.displayName }} - {{ $t('MainMenu_MyWishlist') }}</span>
          <span v-else>{{ $t('Error') }}</span>
        </h1>
      </template>
    </TopNavBar>

    <UserHeader />

    <div class="wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-block--full-width wit-padding-top--md">
      <OfferTabs />
    </div>

    <div class="wit-wishlist wit-flex wit-flex__item--grow">
      <template v-if="profile">
        <div class="wit-flex wit-flex__item--grow wit-flex--wrap">
          <!--          <SidebarPanel :is-visible="isFiltersVisible" class="wit-flex&#45;&#45;align-self-start wit-offset-right&#45;&#45;sm" @close="isFiltersVisible = false">-->
          <!--            <UserView :profile="profile" :mode="'wishlist'" />-->
          <!--          </SidebarPanel>-->

          <div class="wit-wishlist__content1 wit-flex__item--grow" style="flex-basis: 500px;">
            <div class="wit-offset-bottom--sm wit-wishlist__content wit-paddings--sm">
              <CompactUserView :profile="profile" mode="wishlist" />
            </div>

            <div class="wit-wishlist__content">
              <div class="wit-flex wit-flex--justify-between wit-wishlist__header">
                <Tabs :modes="$options.tabs" :selected-mode="selectedTab">
                  <template #tab0>
                    <NuxtLink :to="marketURL" class="wit-flex wit-flex--align-center wis-color--inherit">
                      <span class="wis-tabs__label">{{ $t('Market') }}</span>
                      <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-heart" /></span>
                      <b-tag rounded class="wit-offset-left--xs wit-font-weight--700">
                        {{ marketSize }}
                      </b-tag>
                    </NuxtLink>
                  </template>

                  <template #tab1>
                    <div class="wit-flex wit-flex--align-center">
                      <span class="wis-tabs__label">{{ $t('Wishlist') }}</span>
                      <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-grid" /></span>
                      <b-tag rounded class="wit-offset-left--xs wit-font-weight--700">
                        {{ wishlistSize }}
                      </b-tag>
                    </div>
                  </template>
                </Tabs>

                <div class="wit-flex">
                  <SearchInput
                    :placeholder="$t('Items_SearchByItemName')"
                    :query="filters.query"
                    @update="mergeFilters({ query: $event })"
                    @reset="resetFilterParam"
                    @toggle="isFiltersVisible = !isFiltersVisible"
                  />

                  <b-button
                    v-if="isMyProfile"
                    type="is-primary"
                    tag="nuxt-link"
                    :to="manageWishlistURL"
                    class="wit-offset-left--xs wit-paddings--xs"
                  >
                    Manage
                  <!--                <i class="mdi mdi-20px mdi-pencil" />-->
                  </b-button>
                </div>
              </div>

              <ItemsListView :items="sortedOfferModels" class="wit-wishlist__items-list">
                <template #default="{ items: offers }">
                  <ItemView
                    v-for="(offer) in offers"
                    :key="offer.id"
                    :item="offer.item"
                    add-title
                    add-border
                  >
                    <ItemPriceList :prices="offer.prices" />
                  </ItemView>
                </template>
              </ItemsListView>
            </div>
          </div>
        </div>

        <SidebarPanel :is-visible="isFiltersVisible" class="wit-flex--align-self-start wit-offset-left--sm" @close="isFiltersVisible = false">
          <WishlistFilters />
        </SidebarPanel>
      </template>

      <template v-else>
        <EmptyState :text="$t('Profiles_ProfileNotFound')" icon="account-remove" class="wit-padding-top--sm wit-block--full-width">
          <nuxt-link to="/profiles" class="wit-padding-top--xs">
            {{ $t('Profiles_BackToProfilesList') }}
          </nuxt-link>
        </EmptyState>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import UserView from '@/components/user/UserView.vue'
import ItemView from '@/components/items/ItemView'
import TopNavBar from '@/components/header/TopNavBar.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import { StoreModules, User } from '@/store/index.js'
import { Offer } from '@/domain/models/index.js'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import SearchInput from '@/components/basic/filters/SearchInput.vue'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import ItemsListView from '@/components/items/ItemsListView.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'
import Tabs from '@/components/basic/Tabs.vue'
import SidebarPanel from '@/components/basic/SidebarPanel.vue'
import { WishlistListSidebarTabs, WishlistListTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'
import IconButton from '@/components/basic/IconButton.vue'
import { buildUserManageWishlistUrl, buildUserMarketUrl } from '@/utils/index.js'
import { OfferTypes } from '@/shared/index.js'
import CompactUserView from '@/components/user/CompactUserView.vue'
import UserHeader from '@/components/offers/UserHeader.vue'
import OfferTabs from '@/components/offers/OfferTabs.vue'

export default {
    tabs: WishlistListTabs.values,
    sidebarTabs: WishlistListSidebarTabs.values,

    components: {
        UserView,
        TopNavBar,
        EmptyState,
        SearchInput,
        WishlistFilters,
        ItemsListView,
        ItemView,
        ItemPriceList,
        Tabs,
        SidebarPanel,
        IconButton,
        CompactUserView,
        UserHeader,
        OfferTabs
    },

    middleware: ['isAuthorized'],

    async asyncData ({ route, $wishlistService, store }) {
        await store.dispatch('offers/setOffersType', OfferTypes.WISHLIST)

        await store.dispatch(`${StoreModules.FILTERS}/setData`, {
            defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
            defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
            availableSorts: ItemsFiltersScheme.getAvailableSorts()
        })

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

    created () {
        if (!this.profile) {
            return
        }

        this.storeOffers({
            existingOffers: this.offers.map(offer => Offer.create(offer)),
            availableOffers: []
        })
    },

    methods: {
        ...mapActions(StoreModules.FILTERS, {
            mergeFilters: 'mergeFilters',
            resetFilterParam: 'resetFilterParam'
        }),

        ...mapActions(StoreModules.OFFERS, {
            storeOffers: 'storeOffers'
        })
    }
}
</script>

<style scoped lang="scss">
.wit-offers-page {
    min-height: 100vh;
}

.wit-wishlist {
    padding: var(--offset-sm);
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
}

.wit-wishlist__items-list {
    padding: 0 var(--offset-sm) var(--offset-sm);
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
