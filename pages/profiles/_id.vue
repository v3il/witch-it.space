<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <nuxt-link to="/profiles">
          Profiles
        </nuxt-link>
      </template>

      <template #topMenu>
        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="onModeChange">
          <template #tab0>
            {{ $t('Wishlist_TopTabs_Orders') }}
            <span class="wit-top-tabs__counter wit-offset-left--xxs">{{ profile.userStat.marketSize }}</span>
          </template>

          <template #tab1>
            {{ $t('Wishlist_TopTabs_Wishlist') }}
            <span class="wit-top-tabs__counter wit-offset-left--xxs">{{ profile.userStat.wishlistSize }}</span>
          </template>
        </TopTabs>
      </template>
    </TopNavBar>

    <div class="wit-items wit-flex">
      <template v-if="error">
        No user
      </template>

      <template v-else>
        <div style="flex-basis: 350px;" class="wit-offset-right--md">
          <UserView v-if="profile" :profile="profile" :mode="userViewMode" hide-stat-buttons />
        </div>

        <div class="wit-flex__item--grow">
          {{ isMyProfile }}
          <pre>{{ user }}</pre>
          <pre>{{ profile }}</pre>
          <nuxt-child />
        </div>
      </template>

      <!--                <div class="wit-flex wit-offset-bottom&#45;&#45;md wit-flex&#45;&#45;justify-center">-->
      <!--                    <div style="flex-basis: 500px; padding-left: 16px; padding-right: 16px;" class="wit-padding-le">-->
      <!--                        <div class="wit-offset-bottom&#45;&#45;xs">-->
      <!--                            <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="() => {}">-->
      <!--                                Add items-->
      <!--                            </b-button>-->

      <!--                            <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="() => {}">-->
      <!--                                Manage-->
      <!--                            </b-button>-->
      <!--                        </div>-->

      <!--                        <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="areFiltersVisible = !areFiltersVisible">-->
      <!--                            Filters-->
      <!--                        </b-button>-->
      <!--                    </div>-->
      <!--                </div>-->

      <!--                <ItemFilters v-if="areFiltersVisible" :filters-data="filters" class="wit-flex__item&#45;&#45;grow wit-offset-bottom&#45;&#45;md" @change="() => {}" @reset="() => {}" />-->

      <!--                <Card>-->
      <!--                    <div class="wit-flex wit-flex&#45;&#45;wrap wit-items__item-grid">-->
      <!--                        <WishlistItemView-->
      <!--                            v-for="item in wishlist"-->
      <!--                            :key="item.id"-->
      <!--                            :wishlist-item="item"-->
      <!--                            @clicked.stop-->
      <!--                        />-->
      <!--                    </div>-->
      <!--                </Card>-->
      <!--            </div>-->

      <!--            <div v-if="selectedItem" class="wit-items__sidebar">-->
      <!--                <div class="wit-offset-bottom&#45;&#45;sm wit-flex">-->
      <!--                    <ItemView :item="selectedItem" :is-title-shown="false" class="wit-offset-right&#45;&#45;sm wit-flex__item&#45;&#45;no-shrink wit-items__selected-item-view" />-->

      <!--                    <div>-->
      <!--                        <h4 class="wit-offset-bottom&#45;&#45;sm wit-font-size&#45;&#45;sm">-->
      <!--                            {{ selectedItem.name }}-->
      <!--                        </h4>-->

      <!--                        <ItemTags :item="selectedItem" />-->
      <!--                    </div>-->
      <!--                </div>-->

      <!--                <p class="wit-offset-bottom&#45;&#45;sm">-->
      <!--                    In stock: 10-->
      <!--                </p>-->

      <!--                <b-button type="is-primary" class="wit-transition">-->
      <!--                    Create offer-->
      <!--                </b-button>-->

      <!--                <b-button type="is-primary" class="wit-transition">-->
      <!--                    Wishlist item-->
      <!--                </b-button>-->

      <!--                <b-button type="is-primary is-light" class="wit-transition" @click="selectedItem = null">-->
      <!--                    Close-->
      <!--                </b-button>-->
      <!--            </div>-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserView from '@/components/UserView'
import ItemView from '@/components/items/ItemView'
import ItemFilters from '@/components/items/ItemFilters'
import { buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import ItemTags from '@/components/items/ItemTags'
import WishlistItemView from '@/components/wishlist/WishlistItemView'
import Card from '@/components/Card'
import TopNavBar from '@/components/TopNavBar'
import { Routes } from '@/shared'
import { User } from '@/store'

const Modes = {
    MARKET: 'market',
    WISHLIST: 'wishlist'
}

const DEFAULT_FILTERS = {
    query: '',
    rarities: [],
    isOnlyTradeable: false,
    isOnlyOwned: false,
    slots: [],
    events: []
}

export default {
    modes: Object.values(Modes),

    components: {
        // ItemView,
        // WishlistItemView,
        // ItemTags,
        // ItemFilters,
        UserView,
        // Card,
        TopNavBar
    },

    middleware: ['fetchUser'],

    data: () => ({
        wishlist: [],
        // profile: null,
        // error: null,
        marketSize: 0,
        wishlistSize: 0,
        page: 1,
        selectedItem: null,
        filters: { ...DEFAULT_FILTERS },
        areFiltersVisible: false,
        mode: Modes.MARKET
    }),

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        isMyProfile () {
            return this.user.id === this.profile.id
        },

        isMarket () {
            return this.mode === Modes.MARKET
        },

        userViewMode () {
            return this.isMarket ? 'market' : 'wishlist'
        }
    },

    watch: {
        $route: {
            immediate: true,

            handler (route) {
                this.mode = route.fullPath.includes('wishlist') ? Modes.WISHLIST : Modes.MARKET
            }
        }
    },

    async asyncData ({ app: { $userService }, route }) {
        const { error, profile } = await $userService.fetch(route.params.id)
        return { error, profile }
    },

    async created () {
        await this.$itemsService.fetch()
        // const { error, profile, marketSize, wishlistSize } = await this.$userService.fetch(this.$route.params.id)

        // console.log(profile)

        // this.error = error

        // console.log(marketSize, wishlistSize)

        if (this.error) {
            this.$showError(this.error)
        }

        // else {
        //     this.profile = profile
        //     this.marketSize = marketSize
        //     this.wishlistSize = wishlistSize
        // }
    },

    methods: {
        onModeChange (mode) {
            const route = mode === Modes.MARKET ? buildUserMarketUrl(this.profile.id) : buildUserWishlistUrl(this.profile.id)
            this.$router.push(route)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-items {
    padding: var(--offset-md);

    @media screen and (max-width: 1024px) {
        padding-left: 0;
        padding-right: 0;
    }
}

.wit-items__item-grid {
    //display: grid;
    //grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 16px;
    //justify-items: center;
    grid-row-gap: 16px;

    //@media screen and (max-width: 768px) {
    //    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    //}

    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
}

.wit-items__sidebar {
    flex-basis: 450px;
    padding: 0 24px;
    position: sticky;
    top: 94px;
    max-height: calc(100vh - 94px);
}

.wit-items__selected-item-view {
    width: 100%;
    max-width: 100px;
}

.wit-item-image__image {
    border-radius: 8px;
    display: block;
}
</style>
