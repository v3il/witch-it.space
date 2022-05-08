<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <h1 class="wit-font-size--sm wit-flex wit-flex--align-center">
          <BackButton to="/profiles" class="wit-offset-right--xs" />
          {{ profile.displayName }} - {{ $t('MainMenu_MyWishlist') }}
        </h1>
      </template>

      <template #topMenu>
        <!--        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="toggleMode">-->
        <!--          <template #tab0>-->
        <!--            {{ $t('Wishlist_TopTabs_Orders') }}-->
        <!--            <span class="wit-top-tabs__counter wit-offset-left&#45;&#45;xxs">{{ marketSize }}</span>-->
        <!--          </template>-->

        <!--          <template #tab1>-->
        <!--            {{ $t('Wishlist_TopTabs_Wishlist') }}-->
        <!--            <span class="wit-top-tabs__counter wit-offset-left&#45;&#45;xxs">{{ wishlistSize }}</span>-->
        <!--          </template>-->
        <!--        </TopTabs>-->
      </template>
    </TopNavBar>

    <div class="wit-profile wit-flex">
      <!--      <template v-if="error">-->
      <!--        <EmptyState :text="$t('Profiles_ProfileNotFound')" icon="account-remove" class="wit-padding-top&#45;&#45;sm wit-block&#45;&#45;full-width">-->
      <!--          <nuxt-link to="/profiles" class="wit-padding-top&#45;&#45;xs">-->
      <!--            {{ $t('Profiles_BackToProfilesList') }}-->
      <!--          </nuxt-link>-->
      <!--        </EmptyState>-->
      <!--      </template>-->

      <template>
        <div class="wit-wishlist__content wit-flex__item--grow">
          <div class="wit-flex wit-flex--justify-between wit-wishlist__header">
            <Tabs :modes="$options.sidebarTabs" :selected-mode="sidebarSelectedTab" @switch="() => {}">
              <template #tab0>
                <div class="wit-flex wit-flex--align-center">
                  <span class="wis-tabs__label">{{ $t('Wishlist_MyWishlist') }}</span>
                  <span class="wis-tabs__icon"><i class="mdi mdi-20px mdi-heart" /></span>
                  <b-tag rounded class="wit-offset-left--xs wit-font-weight--700">
                    {{ marketSize }}
                  </b-tag>
                </div>
              </template>

              <template #tab1>
                <div class="wit-flex wit-flex--align-center">
                  <span class="wis-tabs__label">{{ $t('Wishlist_OtherItems') }}</span>
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

              <b-button v-if="isMyProfile" type="is-success" tag="nuxt-link" :to="$route.fullPath + '/manage'">
                Manage
              </b-button>

              <!--              <Dropdown position="bottom-end">-->
              <!--                <template #trigger>-->
              <!--                  <b-button type="is-link" class="wit-position&#45;&#45;relative wit-more-actions">-->
              <!--                    <i class="mdi mdi-20px mdi-cog" />-->
              <!--                  </b-button>-->
              <!--                </template>-->

              <!--                <template #items>-->
              <!--                  <DropdownItem-->
              <!--                    v-if="hasSelectedEntities"-->
              <!--                    @click="clearSelectedEntities"-->
              <!--                  >-->
              <!--                    {{ $t('Wishlist_Manage_Deselect') }}-->
              <!--                  </DropdownItem>-->

              <!--                  <DropdownItem @click="openMassPriceEditor">-->
              <!--                    <span class="wit-color&#45;&#45;success">-->
              <!--                      {{ isMyWishlistMode ? $t('Wishlist_Manage_ChangePrices') : $t('Wishlist_Manage_AddToWishlist') }}-->
              <!--                    </span>-->
              <!--                  </DropdownItem>-->

              <!--                  <DropdownItem v-if="isMyWishlistMode" @click="deleteAllOffers">-->
              <!--                    <span class="wit-color&#45;&#45;danger">{{ $t('Wishlist_Manage_RemoveOffers') }}</span>-->
              <!--                  </DropdownItem>-->
              <!--                </template>-->
              <!--              </Dropdown>-->
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
            expanded
            class="wit-offset-bottom--xs"
            @switch="sidebarSelectedTab = $event"
          >
            <template #tab0>
              <div class="wit-flex wit-flex--align-center">
                <i class="mdi mdi-16px mdi-account wit-offset-right--xs" />
                <span class="wis-tabs__label">{{ $t('Profile') }}</span>
              </div>
            </template>

            <template #tab1>
              <div class="wit-flex wit-flex--align-center">
                <i class="mdi mdi-16px mdi-filter wit-offset-right--xs" />
                <span class="wis-tabs__label">{{ $t('Filters') }}</span>
              </div>
            </template>
          </Tabs>

          <UserView v-if="profile && isProfileTabSelected" :profile="profile" :mode="'wishlist'" hide-stat-buttons1 />
          <WishlistFilters v-else />
        </SidebarPanel>

        <!--        <div class="wit-offset-left&#45;&#45;sm wit-profile__user">-->
        <!--          -->
        <!--        </div>-->

        <!--        <WishlistFilters :is-visible="isFiltersVisible" @close="isFiltersVisible = false" />-->

        <!--        <div class="wit-flex__item&#45;&#45;grow">-->
        <!--          <div>-->
        <!--            &lt;!&ndash;    <TopNavBar class="layout__header">&ndash;&gt;-->
        <!--            &lt;!&ndash;      <template #brand>&ndash;&gt;-->
        <!--            &lt;!&ndash;        <nuxt-link to="/profiles">&ndash;&gt;-->
        <!--            &lt;!&ndash;          Profiles&ndash;&gt;-->
        <!--            &lt;!&ndash;        </nuxt-link>&ndash;&gt;-->
        <!--            &lt;!&ndash;      </template>&ndash;&gt;-->

        <!--            &lt;!&ndash;      <template #topMenu>&ndash;&gt;-->
        <!--            &lt;!&ndash;        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="redirectToWishlist">&ndash;&gt;-->
        <!--            &lt;!&ndash;          <template #tab0>&ndash;&gt;-->
        <!--            &lt;!&ndash;            {{ $t('Wishlist_TopTabs_Orders') }}&ndash;&gt;-->
        <!--            &lt;!&ndash;          </template>&ndash;&gt;-->

        <!--            &lt;!&ndash;          <template #tab1>&ndash;&gt;-->
        <!--            &lt;!&ndash;            {{ $t('Wishlist_TopTabs_Wishlist') }}&ndash;&gt;-->
        <!--            &lt;!&ndash;            <span class="wit-top-tabs__counter wit-offset-left&#45;&#45;xxs">{{ wishlist.length }}</span>&ndash;&gt;-->
        <!--            &lt;!&ndash;          </template>&ndash;&gt;-->
        <!--            &lt;!&ndash;        </TopTabs>&ndash;&gt;-->
        <!--            &lt;!&ndash;      </template>&ndash;&gt;-->
        <!--            &lt;!&ndash;    </TopNavBar>&ndash;&gt;-->

        <!--            &lt;!&ndash;            <div class="wit-items wit-flex">&ndash;&gt;-->
        <!--            &lt;!&ndash;              wishlist&ndash;&gt;-->

        <!--                                  <b-button v-if="isMyProfile" type="is-success" tag="nuxt-link" :to="$route.fullPath + '/manage'">-->
        <!--                                    Manage-->
        <!--                                  </b-button>-->

        <!--            &lt;!&ndash;              &lt;!&ndash;      <div style="flex-basis: 350px;" class="wit-offset-right&#45;&#45;md">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;        <UserView v-if="user" :profile="user">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;          &lt;!&ndash; todo &ndash;&gt;&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;          <template #note>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;            <h5 class="wit-font-weight&#45;&#45;700 wit-font-size&#45;&#45;sm wit-offset-bottom&#45;&#45;xs">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;              {{ $t('UserView_NoteTitle') }}&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;            </h5>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;            <p class="wit-line-height&#45;&#45;md wit-color&#45;&#45;muted">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;              {{ user.wishlistNote }}&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;            </p>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;          </template>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;        </UserView>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;      </div>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;              <div class="wit-flex__item&#45;&#45;grow">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                <div class="wit-flex wit-offset-bottom&#45;&#45;md wit-flex&#45;&#45;justify-center">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  <div style="flex-basis: 500px; padding-left: 16px; padding-right: 16px;" class="wit-padding-le">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                    <div class="wit-offset-bottom&#45;&#45;xs">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="() => {}">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                        Add items&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      </b-button>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                      <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="() => {}">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                        Manage&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      </b-button>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                    </div>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                    <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="areFiltersVisible = !areFiltersVisible">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      Filters&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                    </b-button>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  </div>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                </div>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                <ItemFilters v-if="areFiltersVisible" :filters-data="filters" class="wit-flex__item&#45;&#45;grow wit-offset-bottom&#45;&#45;md" @change="() => {}" @reset="() => {}" />&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                <Card>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  <div class="wit-flex wit-flex&#45;&#45;wrap wit-items__item-grid">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                    <WishlistItemView&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      v-for="item in wishlist"&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      :key="item.id"&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      :wishlist-item="item"&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      @clicked.stop&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                    />&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  </div>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                </Card>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;              </div>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;              <div v-if="selectedItem" class="wit-items__sidebar">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                <div class="wit-offset-bottom&#45;&#45;sm wit-flex">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  <ItemView :item="selectedItem" :is-title-shown="false" class="wit-offset-right&#45;&#45;sm wit-flex__item&#45;&#45;no-shrink wit-items__selected-item-view" />&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                  <div>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                    <h4 class="wit-offset-bottom&#45;&#45;sm wit-font-size&#45;&#45;sm">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                      {{ selectedItem.name }}&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                    </h4>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                    <ItemTags :item="selectedItem" />&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  </div>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                </div>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                <p class="wit-offset-bottom&#45;&#45;sm">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  In stock: 10&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                </p>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                <b-button type="is-primary" class="wit-transition">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  Create offer&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                </b-button>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                <b-button type="is-primary" class="wit-transition">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  Wishlist item&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                </b-button>&ndash;&gt;&ndash;&gt;-->

        <!--            &lt;!&ndash;              &lt;!&ndash;                <b-button type="is-primary is-light" class="wit-transition" @click="selectedItem = null">&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                  Close&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                </b-button>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;              </div>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;            </div>&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
        <!--          </div>-->
        <!--        </div>-->
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import UserView from '@/components/user/UserView.vue'
import ItemView from '@/components/items/ItemView'
import ItemFilters from '@/components/items/ItemFilters'
import { buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import ItemTags from '@/components/items/ItemTags'
import WishlistItemView from '@/components/wishlist/WishlistItemView'
import Card from '@/components/basic/Card.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import TopTabs from '@/components/header/TopTabs.vue'
import { StoreModules, User } from '@/store/index.js'
import { Offer } from '@/domain/models/index.js'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import SearchInput from '@/components/basic/filters/SearchInput.vue'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import ItemsListView from '@/components/items/ItemsListView.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'
import DropdownItem from '@/components/basic/dropdown/DropdownItem.vue'
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
// import { WishlistTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'
import Tabs from '@/components/basic/Tabs.vue'
import BackButton from '@/components/basic/BackButton.vue'
import SidebarPanel from '@/components/basic/SidebarPanel.vue'
import { WishlistListSidebarTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'

const DEFAULT_FILTERS = {
    query: '',
    rarities: [],
    isOnlyTradeable: false,
    isOnlyOwned: false,
    slots: [],
    events: []
}

const Modes = {
    MARKET: 'market',
    WISHLIST: 'wishlist'
}

export default {
    // modes: WishlistTabs.values,
    sidebarTabs: WishlistListSidebarTabs.values,

    components: {
        UserView,
        TopNavBar,
        EmptyState,
        TopTabs,
        SearchInput,
        WishlistFilters,
        ItemsListView,
        ItemView,
        ItemPriceList,
        DropdownItem,
        Dropdown,
        Tabs,
        BackButton,
        SidebarPanel
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
        sidebarSelectedTab: WishlistListSidebarTabs.PROFILE
    }),

    // watch: {
    //     filters: {
    //         deep: true,
    //         handler: 'updateRoute'
    //     },
    //
    //     sorts: {
    //         deep: true,
    //         handler: 'updateRoute'
    //     }
    // },

    computed: {
        ...mapState(StoreModules.FILTERS, ['filters']),
        ...mapGetters(StoreModules.WISHLIST, [
            'sortedOfferModels'
        ]),

        ...mapState(User.PATH, [
            User.State.USER
        ]),

        isMyProfile () {
            return this.user.id === this.profile?.id || 1
        },

        userViewMode () {
            return this.mode === Modes.MARKET ? 'market' : 'wishlist'
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
        if (this.error) {
            return
        }

        this.storeOffers({
            existingOffers: this.offers.map(offer => Offer.create(offer)),
            availableOffers: []
        })
    },

    mounted () {
        if (this.error) {
            this.$showError(this.error)
        }
    },

    // watch: {
    //     $route: {
    //         immediate: true,
    //
    //         handler (route) {
    //             this.mode = route.fullPath.includes('wishlist') ? Modes.WISHLIST : Modes.MARKET
    //         }
    //     }
    // },

    // async created () {
    //     await this.$itemsService.fetch()
    // },

    methods: {
        ...mapActions(StoreModules.FILTERS, {
            mergeFilters: 'mergeFilters',
            resetFilterParam: 'resetFilterParam'
        }),

        ...mapActions(StoreModules.WISHLIST, {
            storeOffers: 'storeOffers'
            // toggleMode: 'toggleMode',
            // updateFilters: 'updateFilters',
            // updateSorts: 'updateSorts',
            // resetFilter: 'resetFilter',
            // resetSorts: 'resetSorts',
            // resetSortsFilters: 'resetSortsFilters',
            // toggleOffer: 'toggleOffer',
            // clearSelectedEntities: 'clearSelectedEntities',
            // removeOffers: 'removeOffers',
            // toggleOrder: 'toggleOrder',
            // updateOrderBy: 'updateOrderBy',
            // selectOffers: 'selectOffers'
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
</style>

<style scoped lang="scss">
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
    right: -10px;
    padding: var(--offset-xxs) 0 var(--offset-xxs) var(--offset-xxs);
    background: var(--card-bg-color);
    z-index: 3;
    border-radius: 50% 0 0 50%;
}

.wit-offer-controls--remove {
    top: 48px;
}

.wis-tabs__icon {
    display: none;
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
