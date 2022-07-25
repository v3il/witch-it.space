<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <!--    <TopNavBar class="layout__header">-->
    <!--      &lt;!&ndash;      <template #brand>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <h1 class="wit-font-size&#45;&#45;sm wit-flex wit-flex&#45;&#45;align-center">&ndash;&gt;-->
    <!--      &lt;!&ndash;          <span v-if="profile">{{ profile.displayName }} - {{ $t('MainMenu_MyWishlist') }}</span>&ndash;&gt;-->
    <!--      &lt;!&ndash;          <span v-else>{{ $t('Error') }}</span>&ndash;&gt;-->
    <!--      &lt;!&ndash;        </h1>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </template>&ndash;&gt;-->
    <!--    </TopNavBar>-->

    <UserHeader :mode="$options.selectedTab" />

    <transition name="fade150">
      <UserHeader v-if="isStickyHeaderVisible" :mode="$options.selectedTab" compact />
    </transition>

    <div class="wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-block--full-width wit-padding-top--md">
      <OfferTabs class="wit-offset-bottom--md" :selected-tab="$options.selectedTab" />
    </div>

    <div class="wit-wishlist wit-flex wit-flex__item--grow wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-block--full-width">
      <template v-if="profile">
        <div class="wit-flex wit-flex__item--grow wit-flex--wrap">
          <!--          <SidebarPanel :is-visible="isFiltersVisible" class="wit-flex&#45;&#45;align-self-start wit-offset-right&#45;&#45;sm" @close="isFiltersVisible = false">-->
          <!--            <UserView :profile="profile" :mode="'wishlist'" />-->
          <!--          </SidebarPanel>-->

          <div class="wit-wishlist__content1 wit-flex__item--grow" style="flex-basis: 500px;">
            <!--            <div class="wit-offset-bottom&#45;&#45;sm wit-wishlist__content wit-paddings&#45;&#45;sm">-->
            <!--              <CompactUserView :profile="profile" mode="wishlist" />-->
            <!--            </div>-->

            <div class="wit-wishlist__content">
              <Search
                :search-query="filters.query"
                @open="isFiltersVisible = true"
                @search="mergeFilters({ query: $event })"
                @reset="resetFilterParam('query')"
              />

              <!--              <div class="wit-flex wit-flex&#45;&#45;justify-between wit-wishlist__header">-->
              <!--                <Tabs :modes="$options.tabs" :selected-mode="selectedTab">-->
              <!--                  <template #tab0>-->
              <!--                    <NuxtLink :to="marketURL" class="wit-flex wit-flex&#45;&#45;align-center wis-color&#45;&#45;inherit">-->
              <!--                      <span class="wis-tabs__label">{{ $t('Market') }}</span>-->
              <!--                      <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-heart" /></span>-->
              <!--                      <b-tag rounded class="wit-offset-left&#45;&#45;xs wit-font-weight&#45;&#45;700">-->
              <!--                        {{ marketSize }}-->
              <!--                      </b-tag>-->
              <!--                    </NuxtLink>-->
              <!--                  </template>-->

              <!--                  <template #tab1>-->
              <!--                    <div class="wit-flex wit-flex&#45;&#45;align-center">-->
              <!--                      <span class="wis-tabs__label">{{ $t('Wishlist') }}</span>-->
              <!--                      <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-grid" /></span>-->
              <!--                      <b-tag rounded class="wit-offset-left&#45;&#45;xs wit-font-weight&#45;&#45;700">-->
              <!--                        {{ wishlistSize }}-->
              <!--                      </b-tag>-->
              <!--                    </div>-->
              <!--                  </template>-->
              <!--                </Tabs>-->

              <!--                <div class="wit-flex">-->
              <!--                  <SearchInput-->
              <!--                    :placeholder="$t('Items_SearchByItemName')"-->
              <!--                    :query="filters.query"-->
              <!--                    @update="mergeFilters({ query: $event })"-->
              <!--                    @reset="resetFilterParam"-->
              <!--                    @toggle="isFiltersVisible = !isFiltersVisible"-->
              <!--                  />-->

              <!--                  <b-button-->
              <!--                    v-if="isMyProfile"-->
              <!--                    type="is-primary"-->
              <!--                    tag="nuxt-link"-->
              <!--                    :to="manageWishlistURL"-->
              <!--                    class="wit-offset-left&#45;&#45;xs wit-paddings&#45;&#45;xs"-->
              <!--                  >-->
              <!--                    Manage-->
              <!--                  &lt;!&ndash;                <i class="mdi mdi-20px mdi-pencil" />&ndash;&gt;-->
              <!--                  </b-button>-->
              <!--                </div>-->
              <!--              </div>-->

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

        <SidebarPanel :is-visible="isFiltersVisible" @close="isFiltersVisible = false">
          <WishlistFilters @reset="isFiltersVisible = false" />
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
import { onDeactivated, onMounted, ref } from '@nuxtjs/composition-api'
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
import { UserHeader, OfferTabs, Search } from '@/components/offers'
import { OfferTabModes } from '@/domain'

export default {
    tabs: WishlistListTabs.values,
    sidebarTabs: WishlistListSidebarTabs.values,

    selectedTab: OfferTabModes.WISHLIST,

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
        OfferTabs,
        Search
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
