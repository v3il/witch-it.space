<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <div class="wit-font-size--sm">
          {{ $t('MainMenu_MyWishlist') }}
        </div>
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
        <div class="wit-offset-right--md wit-profile__user">
          <!--          <UserView v-if="profile" :profile="profile" :mode="userViewMode" hide-stat-buttons />-->
        </div>

        <div class="wit-flex__item--grow">
          <div>
            <!--    <TopNavBar class="layout__header">-->
            <!--      <template #brand>-->
            <!--        <nuxt-link to="/profiles">-->
            <!--          Profiles-->
            <!--        </nuxt-link>-->
            <!--      </template>-->

            <!--      <template #topMenu>-->
            <!--        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="redirectToWishlist">-->
            <!--          <template #tab0>-->
            <!--            {{ $t('Wishlist_TopTabs_Orders') }}-->
            <!--          </template>-->

            <!--          <template #tab1>-->
            <!--            {{ $t('Wishlist_TopTabs_Wishlist') }}-->
            <!--            <span class="wit-top-tabs__counter wit-offset-left&#45;&#45;xxs">{{ wishlist.length }}</span>-->
            <!--          </template>-->
            <!--        </TopTabs>-->
            <!--      </template>-->
            <!--    </TopNavBar>-->

            <div class="wit-items wit-flex">
              wishlist

              <b-button v-if="isMyProfile" type="is-success" tag="nuxt-link" :to="$route.fullPath + '/manage'">
                Manage
              </b-button>

              <!--      <div style="flex-basis: 350px;" class="wit-offset-right&#45;&#45;md">-->
              <!--        <UserView v-if="user" :profile="user">-->
              <!--          &lt;!&ndash; todo &ndash;&gt;-->
              <!--          <template #note>-->
              <!--            <h5 class="wit-font-weight&#45;&#45;700 wit-font-size&#45;&#45;sm wit-offset-bottom&#45;&#45;xs">-->
              <!--              {{ $t('UserView_NoteTitle') }}-->
              <!--            </h5>-->

              <!--            <p class="wit-line-height&#45;&#45;md wit-color&#45;&#45;muted">-->
              <!--              {{ user.wishlistNote }}-->
              <!--            </p>-->
              <!--          </template>-->
              <!--        </UserView>-->
              <!--      </div>-->

              <!--              <div class="wit-flex__item&#45;&#45;grow">-->
              <!--                <div class="wit-flex wit-offset-bottom&#45;&#45;md wit-flex&#45;&#45;justify-center">-->
              <!--                  <div style="flex-basis: 500px; padding-left: 16px; padding-right: 16px;" class="wit-padding-le">-->
              <!--                    <div class="wit-offset-bottom&#45;&#45;xs">-->
              <!--                      <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="() => {}">-->
              <!--                        Add items-->
              <!--                      </b-button>-->

              <!--                      <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="() => {}">-->
              <!--                        Manage-->
              <!--                      </b-button>-->
              <!--                    </div>-->

              <!--                    <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="areFiltersVisible = !areFiltersVisible">-->
              <!--                      Filters-->
              <!--                    </b-button>-->
              <!--                  </div>-->
              <!--                </div>-->

              <!--                <ItemFilters v-if="areFiltersVisible" :filters-data="filters" class="wit-flex__item&#45;&#45;grow wit-offset-bottom&#45;&#45;md" @change="() => {}" @reset="() => {}" />-->

              <!--                <Card>-->
              <!--                  <div class="wit-flex wit-flex&#45;&#45;wrap wit-items__item-grid">-->
              <!--                    <WishlistItemView-->
              <!--                      v-for="item in wishlist"-->
              <!--                      :key="item.id"-->
              <!--                      :wishlist-item="item"-->
              <!--                      @clicked.stop-->
              <!--                    />-->
              <!--                  </div>-->
              <!--                </Card>-->
              <!--              </div>-->

              <!--              <div v-if="selectedItem" class="wit-items__sidebar">-->
              <!--                <div class="wit-offset-bottom&#45;&#45;sm wit-flex">-->
              <!--                  <ItemView :item="selectedItem" :is-title-shown="false" class="wit-offset-right&#45;&#45;sm wit-flex__item&#45;&#45;no-shrink wit-items__selected-item-view" />-->

              <!--                  <div>-->
              <!--                    <h4 class="wit-offset-bottom&#45;&#45;sm wit-font-size&#45;&#45;sm">-->
              <!--                      {{ selectedItem.name }}-->
              <!--                    </h4>-->

              <!--                    <ItemTags :item="selectedItem" />-->
              <!--                  </div>-->
              <!--                </div>-->

              <!--                <p class="wit-offset-bottom&#45;&#45;sm">-->
              <!--                  In stock: 10-->
              <!--                </p>-->

              <!--                <b-button type="is-primary" class="wit-transition">-->
              <!--                  Create offer-->
              <!--                </b-button>-->

              <!--                <b-button type="is-primary" class="wit-transition">-->
              <!--                  Wishlist item-->
              <!--                </b-button>-->

              <!--                <b-button type="is-primary is-light" class="wit-transition" @click="selectedItem = null">-->
              <!--                  Close-->
              <!--                </b-button>-->
              <!--              </div>-->
              <!--            </div>-->
            </div>
          </div>
        </div>
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
    modes: Object.values(Modes),

    components: {
        UserView,
        TopNavBar,
        EmptyState,
        TopTabs
    },

    /* async */ asyncData ({ store, route, $wishlistService }) {
        // await store.dispatch(`${StoreModules.WISHLIST}/getInitialFilters`, route)
        // await store.dispatch(`${StoreModules.WISHLIST}/getInitialSorts`, route)

        return $wishlistService.fetch(route.params.id)
    },

    data: () => ({
        isFiltersVisible: false
    }),

    watch: {
        filters: {
            deep: true,
            handler: 'updateRoute'
        },

        sorts: {
            deep: true,
            handler: 'updateRoute'
        }
    },

    computed: {
        ...mapState(StoreModules.WISHLIST, [
            // 'mode',
            'filters',
            'sorts'
        ]),

        ...mapGetters(StoreModules.WISHLIST, [
            'isMyWishlistMode',
            'isNonWishlistItemsMode',
            'sortedOfferModels',
            'sortedNonWishlistItems',
            'changedFilters',
            'changedSorts',
            'hasSelectedEntities',
            'selectedExistingOffers',
            'selectedAvailableOffers'
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
        ...mapActions(StoreModules.WISHLIST, {
            storeOffers: 'storeOffers',
            toggleMode: 'toggleMode',
            updateFilters: 'updateFilters',
            updateSorts: 'updateSorts',
            resetFilter: 'resetFilter',
            resetSorts: 'resetSorts',
            resetSortsFilters: 'resetSortsFilters',
            toggleOffer: 'toggleOffer',
            clearSelectedEntities: 'clearSelectedEntities',
            removeOffers: 'removeOffers',
            toggleOrder: 'toggleOrder',
            updateOrderBy: 'updateOrderBy',
            selectOffers: 'selectOffers'
        })
    }
}
</script>

<style scoped lang="scss">
.wit-profile {
    padding: var(--offset-sm);
}

.wit-profile__user {
    flex: 0 0 350px;
}
</style>
