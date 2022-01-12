<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <div class="wit-font-size--sm">
          {{ $t('MainMenu_EditWishlist') }}
        </div>
      </template>

      <template #topMenu>
        <!--        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="onModeChange">-->
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
      <template v-if="error">
        <EmptyState :text="$t('Profiles_ProfileNotFound')" icon="account-remove" class="wit-padding-top--sm wit-block--full-width">
          <nuxt-link to="/profiles" class="wit-padding-top--xs">
            {{ $t('Profiles_BackToProfilesList') }}
          </nuxt-link>
        </EmptyState>
      </template>

      <template v-else>
        <div class="wit-flex wit-wishlist-editor__container wit-flex__item--grow">
          <div class="wit-wishlist-editor__items-container wit-offset-right--sm wit-paddings--sm wit-background--content wit-flex wit-flex--column">
            <WishlistFilters
              :default-filters="$options.defaultFilters"
              :filters="filters"
              :default-sort="$options.defaultSort"
              :sort="sort"
              class="wit-offset-bottom--xs"
              @filtersChanged="onFiltersChange"
              @sortChanged="onSortChange"
            />

            <ItemsList :items="sortedItems" class="wit-wishlist-editor__items wit-flex__item--grow" />
          </div>

          <Card class="wit-wishlist-editor__editor">
            1
          </Card>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'
import Card from '@/components/basic/Card.vue'
import { eventsManager, raritiesManager, slotsManager } from '@/shared/index.js'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import EmptyState from '@/components/basic/EmptyState.vue'

const DEFAULT_FILTERS = {
    query: '',
    rarities: [],
    slots: [],
    events: [],
    hideRecipes: true
}

const DEFAULT_SORT = {
    sortBy: 'rarity',
    order: 'desc'
}

export default {
    name: 'WishlistEditor',

    defaultFilters: { ...DEFAULT_FILTERS },
    defaultSort: { ...DEFAULT_SORT },

    rarities: raritiesManager.getTradeable(),
    events: eventsManager.getAll(),
    slots: slotsManager.getAll(),

    sorts: {
        rarity: 'Items_Sort_Rarity',
        name: 'Items_Sort_Name'
    },

    components: {
        ItemsList,
        Card,
        WishlistFilters,
        // TopTabs,
        TopNavBar,
        EmptyState
    },

    async asyncData ({ app: { $userService, $wishlistService }, route }) {
        const { profile } = await $userService.fetch(route.params.id)
        const { wishlist } = await $wishlistService.fetch(route.params.id)
        return { profile, wishlist, error: null }
    },

    data: () => ({
        filters: { ...DEFAULT_FILTERS },
        sort: { ...DEFAULT_SORT }
    }),

    computed: {
        items () {
            return Object.values(this.$store.state.items.items)/* .slice(0, 100) */.filter(item => item.isTradeable)
        },

        filteredItems () {
            const items = this.items
            const lowerCasedQuery = this.filters.query.toLowerCase()

            return items.filter((item) => {
                const isFilteredByName = lowerCasedQuery ? item.name.toLowerCase().includes(lowerCasedQuery) : true
                const isFilteredByRarity = this.filters.rarities.length ? this.filters.rarities.includes(item.rarity) : true
                const isFilteredByEvent = this.filters.events.length ? this.filters.events.includes(item.event) : true
                const isFilteredBySlot = this.filters.slots.length ? this.filters.slots.includes(item.slot) : true
                const isFilteredByTradeable = this.filters.isOnlyTradeable ? item.isTradeable : true

                return isFilteredByRarity &&
                    isFilteredBySlot &&
                    isFilteredByName &&
                    isFilteredByTradeable &&
                    isFilteredByEvent
            })
        },

        sortedItems () {
            const { sortBy, order } = this.sort
            const isAsc = order === 'asc'

            return Array.from(this.filteredItems).sort((a, b) => {
                const first = isAsc ? a : b
                const second = isAsc ? b : a

                switch (sortBy) {
                case 'rarity':
                    return first.quality - second.quality
                case 'name':
                    return first.name.localeCompare(second.name)
                }

                return 0
            })
        }
    },

    methods: {
        onFiltersChange (filters) {
            this.filters = filters
        },

        onSortChange (sort) {
            this.sort = sort
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profile {
    max-height: calc(100vh - var(--header-height));
}

.wit-wishlist-editor__container {
    max-height: calc(100% - 50px);
    padding: var(--offset-sm);
}

.wit-wishlist-editor__items-container {
    flex: 1;
    border-radius: var(--offset-xxs);
    //overflow-y: scroll;
}

.wit-wishlist-editor__items {
    overflow-y: scroll;
    padding-right: var(--offset-xs);
}

.wit-wishlist-editor__editor {
    flex: 0 0 450px;
}
</style>

<!--<script>-->
<!--import { mapState } from 'vuex'-->
<!--import UserView from '@/components/user/UserView.vue'-->
<!--import ItemView from '@/components/items/ItemView'-->
<!--import ItemFilters from '@/components/items/ItemFilters'-->
<!--import { buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'-->
<!--import ItemTags from '@/components/items/ItemTags'-->
<!--import WishlistItemView from '@/components/wishlist/WishlistItemView'-->
<!--import Card from '@/components/basic/Card.vue'-->
<!--import TopNavBar from '@/components/header/TopNavBar.vue'-->
<!--import EmptyState from '@/components/basic/EmptyState.vue'-->
<!--import TopTabs from '@/components/header/TopTabs.vue'-->
<!--import { User } from '@/store/index.js'-->

<!--const DEFAULT_FILTERS = {-->
<!--    query: '',-->
<!--    rarities: [],-->
<!--    isOnlyTradeable: false,-->
<!--    isOnlyOwned: false,-->
<!--    slots: [],-->
<!--    events: []-->
<!--}-->

<!--const Modes = {-->
<!--    MARKET: 'market',-->
<!--    WISHLIST: 'wishlist'-->
<!--}-->

<!--export default {-->
<!--    modes: Object.values(Modes),-->

<!--    components: {-->
<!--        UserView,-->
<!--        TopNavBar,-->
<!--        EmptyState,-->
<!--        TopTabs-->
<!--    },-->

<!--    // middleware: ['fetchUser'],-->

<!--    async asyncData ({ app: { $userService, $wishlistService }, route }) {-->
<!--        const { profile } = await $userService.fetch(route.params.id)-->
<!--        const { wishlist } = await $wishlistService.fetch(route.params.id)-->
<!--        return { profile, wishlist, error: null }-->
<!--    },-->

<!--    data: () => ({-->
<!--        mode: Modes.WISHLIST-->
<!--    }),-->

<!--    computed: {-->
<!--        ...mapState(User.PATH, [-->
<!--            User.State.USER-->
<!--        ]),-->

<!--        isMyProfile () {-->
<!--            return this.user.id === this.profile.id-->
<!--        },-->

<!--        userViewMode () {-->
<!--            return this.mode === Modes.MARKET ? 'market' : 'wishlist'-->
<!--        },-->

<!--        marketSize () {-->
<!--            return this.profile?.userStat.marketSize ?? 0-->
<!--        },-->

<!--        wishlistSize () {-->
<!--            return this.profile?.userStat.wishlistSize ?? 0-->
<!--        }-->
<!--    },-->

<!--    watch: {-->
<!--        $route: {-->
<!--            immediate: true,-->

<!--            handler (route) {-->
<!--                this.mode = route.fullPath.includes('wishlist') ? Modes.WISHLIST : Modes.MARKET-->
<!--            }-->
<!--        }-->
<!--    },-->

<!--    async created () {-->
<!--        await this.$itemsService.fetch()-->
<!--    },-->

<!--    methods: {-->
<!--        onModeChange (mode) {-->
<!--            const route = mode === Modes.MARKET ? buildUserMarketUrl(this.profile.id) : buildUserWishlistUrl(this.profile.id)-->
<!--            this.$router.push(route)-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.wit-profile {-->
<!--    padding: var(&#45;&#45;offset-md);-->

<!--    @media screen and (max-width: 1024px) {-->
<!--        padding: var(&#45;&#45;offset-sm);-->
<!--    }-->
<!--}-->

<!--.wit-profile__user {-->
<!--    flex: 0 0 350px;-->
<!--}-->
<!--</style>-->
