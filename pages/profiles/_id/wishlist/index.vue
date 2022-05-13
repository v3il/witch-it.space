<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <h1 class="wit-font-size--sm wit-flex wit-flex--align-center">
          <BackButton to="/profiles" class="wit-offset-right--xs" />
          <span v-if="profile">{{ profile.displayName }} - {{ $t('MainMenu_MyWishlist') }}</span>
          <span v-else>{{ $t('MainMenu_MyWishlist') }}</span>
        </h1>
      </template>
    </TopNavBar>

    <div class="wit-profile wit-flex">
      <template v-if="profile">
        <div class="wit-wishlist__content wit-flex__item--grow">
          <div class="wit-flex wit-flex--justify-between wit-wishlist__header">
            <Tabs :modes="$options.tabs" :selected-mode="selectedTab">
              <template #tab0>
                <NuxtLink to="/profiles/139" class="wit-flex wit-flex--align-center wis-color--inherit">
                  <span class="wis-tabs__label">{{ $t('Market') }}</span>
                  <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-heart" /></span>
                  <b-tag rounded class="wit-offset-left--xs wit-font-weight--700">
                    {{ marketSize }}
                  </b-tag>
                </NuxtLink>
              </template>

              <template #tab1>
                <NuxtLink to="/profiles/139/wishlist" class="wit-flex wit-flex--align-center wis-color--inherit">
                  <span class="wis-tabs__label">{{ $t('Wishlist') }}</span>
                  <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-grid" /></span>
                  <b-tag rounded class="wit-offset-left--xs wit-font-weight--700">
                    {{ wishlistSize }}
                  </b-tag>
                </NuxtLink>
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

              <b-button v-if="isMyProfile" type="is-primary" tag="nuxt-link" :to="$route.fullPath + '/manage'" class="wit-offset-left--xs">
                {{ $t('Edit') }}
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

        <SidebarPanel :is-visible="isFiltersVisible" @close="isFiltersVisible = false">
          <Tabs
            :modes="$options.sidebarTabs"
            :selected-mode="sidebarSelectedTab"
            expanded1
            class="wit-offset-bottom--sm"
            @switch="sidebarSelectedTab = $event"
          >
            <template #tab0>
              <div class="wit-flex wit-flex--align-center">
                <i class="mdi mdi-20px mdi-chevron-left wit-offset-right--xxs wis-tabs__icon2" />
                <span class="wis-tabs__label">{{ $t('Profile') }}</span>
              </div>
            </template>

            <template #tab1>
              <div class="wit-flex wit-flex--align-center">
                <span class="wis-tabs__label">{{ $t('Filters') }}</span>
                <i class="mdi mdi-20px mdi-chevron-right wit-offset-left--xxs wis-tabs__icon2" />
              </div>
            </template>
          </Tabs>

          <UserView v-if="isProfileTabSelected" :profile="profile" :mode="'wishlist'" hide-stat-buttons1 />
          <WishlistFilters v-else />
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
import BackButton from '@/components/basic/BackButton.vue'
import SidebarPanel from '@/components/basic/SidebarPanel.vue'
import { WishlistListSidebarTabs, WishlistListTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'
import IconButton from '@/components/basic/IconButton.vue'

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
        BackButton,
        SidebarPanel,
        IconButton
    },

    async asyncData ({ route, $wishlistService, store }) {
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
        ...mapGetters(StoreModules.WISHLIST, [
            'sortedOfferModels'
        ]),

        ...mapState(User.PATH, [
            User.State.USER
        ]),

        isMyProfile () {
            return this.user.id === this.profile?.id
        },

        marketSize () {
            return this.profile?.userStat.marketSize ?? 0
        },

        wishlistSize () {
            return this.profile?.userStat.wishlistSize ?? 0
        },

        isProfileTabSelected () {
            return this.sidebarSelectedTab === WishlistListSidebarTabs.PROFILE
        }
    },

    created () {
        console.log(this.profile, this.offers)

        if (!this.profile) {
            return
        }

        this.storeOffers({
            existingOffers: this.offers.map(offer => Offer.create(offer)),
            availableOffers: []
        })
    },

    // mounted () {
    //     if (!this.profile) {
    //         this.$showError(this.error)
    //     }
    // },

    methods: {
        ...mapActions(StoreModules.FILTERS, {
            mergeFilters: 'mergeFilters',
            resetFilterParam: 'resetFilterParam'
        }),

        ...mapActions(StoreModules.WISHLIST, {
            storeOffers: 'storeOffers'
        })
    }
}
</script>

<style scoped lang="scss">
.wit-profile {
    padding: var(--offset-sm);
}

.wit-profile__user {
    flex: 0 0 300px;
    position: sticky;
    top: 0;
}

.wit-wishlist__background {
    min-height: calc(100vh - var(--header-height));
    margin: var(--offset-sm) var(--offset-sm) 0;
    position: relative;
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
    margin-bottom: var(--offset-sm);
}

.wit-wishlist__items-list {
    padding: 0 var(--offset-sm) var(--offset-sm);
}

.wit-more-actions {
    width: 36px;
    height: 36px;
    padding: 0;
    transition: width 0.3s ease, margin-right 0.3s ease;
    will-change: width, margin-left;
    overflow: hidden;
    margin-left: var(--offset-xs);
    background: #2e3648;
    border: var(--default-border);
    color: var(--muted-text-color);
}

.wit-offer-controls {
    position: absolute;
    top: 16px;
    left: -16px;
    padding: var(--offset-xxs) var(--offset-xxs) var(--offset-xxs) 0;
    background: var(--body-bg);
    z-index: 3;
    border-radius: 0 50% 50% 0;
}

.wit-offer-controls--remove {
    top: 48px;
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
