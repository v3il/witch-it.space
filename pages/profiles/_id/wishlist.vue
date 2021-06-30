<template>
  <div class="wit-items wit-flex">
    <div class="wit-flex__item--grow">
      <!--      <ItemFilters :filters-data="filters" class="wit-offset-bottom&#45;&#45;sm" @change="onFiltersChange" @reset="resetFilter" />-->

      <div>
        <div class="wit-flex wit-flex--wrap wit-items__item-grid">
          <WishlistItemView
            v-for="item in wishlist"
            :key="item.id"
            :wishlist-item="item"
            @clicked.stop
          />
        </div>
      </div>
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
</template>

<script>
// import UserView from '@/components/UserView'
import { Wishlist } from '@/store/Types'
import ItemView from '@/components/items/ItemView'
import ItemFilters from '@/components/items/ItemFilters'
import { buildItemUrl, getObjectsDiff } from '@/utils'
import ItemTags from '@/components/items/ItemTags'
import WishlistItemView from '@/components/wishlist/WishlistItemView'

export default {

    components: {
        ItemView,
        WishlistItemView,
        ItemTags
    },

    middleware: ['fetchUser'],

    data: () => ({
        wishlist: [],
        page: 1,
        selectedItem: null
        // filters: { ...DEFAULT_FILTERS }
    }),

    // async fetch ({ app: { $itemsService } }) {
    //     await $itemsService.fetch()
    //     return { items: $itemsService.toList() }
    // },

    async created () {
        await this.$itemsService.fetch()
        const { error, wishlist } = await this.$wishlistService.fetch(this.$route.params.id)

        if (error) {
            return this.$showError(error)
        }

        this.wishlist = wishlist
    },

    methods: {

    }
}
</script>

<style scoped lang="scss">
.wit-items {
    padding: var(--offset-md) 0 var(--offset-sm);

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
