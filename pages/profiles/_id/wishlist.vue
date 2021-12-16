<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        {{ $t('MainMenu_Wishlist', [user ? user.displayName : '']) }}
      </template>

      <template #topMenu>
        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="redirectToOrders">
          <template #tab0>
            {{ $t('Wishlist_TopTabs_Orders') }}
          </template>

          <template #tab1>
            {{ $t('Wishlist_TopTabs_Wishlist') }}
          </template>
        </TopTabs>
      </template>
    </TopNavBar>

    <div class="wit-items wit-flex">
      <UserView v-if="user" :profile="user" style="flex-basis: 350px;" class="wit-offset-right--md" />

      <div class="wit-flex__item--grow">
        <div class="wit-flex wit-offset-bottom--md wit-flex--justify-center">
          <div style="flex-basis: 500px; padding-left: 16px; padding-right: 16px;" class="wit-padding-le">
            <div class="wit-offset-bottom--xs">
              <b-button type="is-success" class="wit-transition wit-offset-right--xxs" @click="() => {}">
                Add items
              </b-button>

              <b-button type="is-success" class="wit-transition wit-offset-right--xxs" @click="() => {}">
                Manage
              </b-button>
            </div>

            <b-button type="is-success" class="wit-transition wit-offset-right--xxs" @click="areFiltersVisible = !areFiltersVisible">
              Filters
            </b-button>
          </div>
        </div>

        <ItemFilters v-if="areFiltersVisible" :filters-data="filters" class="wit-flex__item--grow wit-offset-bottom--md" @change="() => {}" @reset="() => {}" />

        <Card>
          <div class="wit-flex wit-flex--wrap wit-items__item-grid">
            <WishlistItemView
              v-for="item in wishlist"
              :key="item.id"
              :wishlist-item="item"
              @clicked.stop
            />
          </div>
        </Card>
      </div>

      <div v-if="selectedItem" class="wit-items__sidebar">
        <div class="wit-offset-bottom--sm wit-flex">
          <ItemView :item="selectedItem" :is-title-shown="false" class="wit-offset-right--sm wit-flex__item--no-shrink wit-items__selected-item-view" />

          <div>
            <h4 class="wit-offset-bottom--sm wit-font-size--sm">
              {{ selectedItem.name }}
            </h4>

            <ItemTags :item="selectedItem" />
          </div>
        </div>

        <p class="wit-offset-bottom--sm">
          In stock: 10
        </p>

        <b-button type="is-primary" class="wit-transition">
          Create offer
        </b-button>

        <b-button type="is-primary" class="wit-transition">
          Wishlist item
        </b-button>

        <b-button type="is-primary is-light" class="wit-transition" @click="selectedItem = null">
          Close
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import UserView from '@/components/UserView'
import { Wishlist } from '@/store/Types'
import ItemView from '@/components/items/ItemView'
import ItemFilters from '@/components/items/ItemFilters'
import { buildItemUrl, buildUserMarketUrl, getObjectsDiff } from '@/utils'
import ItemTags from '@/components/items/ItemTags'
import WishlistItemView from '@/components/wishlist/WishlistItemView'
import Card from '@/components/Card'
import TopNavBar from '@/components/TopNavBar'

const modes = {
    ORDERS: 'orders',
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
    modes: Object.values(modes),

    components: {
        ItemView,
        WishlistItemView,
        ItemTags,
        ItemFilters,
        UserView,
        Card,
        TopNavBar
    },

    middleware: ['fetchUser'],

    data: () => ({
        wishlist: [],
        user: null,
        page: 1,
        selectedItem: null,
        filters: { ...DEFAULT_FILTERS },
        areFiltersVisible: false,
        selectedMode: modes.WISHLIST
    }),

    // async fetch ({ app: { $itemsService } }) {
    //     await $itemsService.fetch()
    //     return { items: $itemsService.toList() }
    // },

    async created () {
        await this.$itemsService.fetch()
        const { error, wishlist, user } = await this.$wishlistService.fetch(this.$route.params.id)

        if (error) {
            return this.$showError(error)
        }

        this.wishlist = wishlist
        this.user = user
    },

    methods: {
        redirectToOrders () {
            this.$router.push(buildUserMarketUrl(this.user.id))
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
