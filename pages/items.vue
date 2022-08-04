<template>
  <div class="wit-flex wit-flex--column wit-offers-page">
    <!--    <UserHeader :mode="offersType" />-->
    <!--    <UserHeader v-if="isStickyHeaderVisible" :mode="offersType" compact />-->

    <div class="wit-offers-page__content">
      <div class="wit-offers-page__offers wis-block--max-width">
        <Search />

        <div v-if="sortedItems.length" class="wit-flex wit-flex--wrap wit-items__item-grid">
          <ItemsList :items="sortedItems" />
        </div>

        <OffersEmptyState v-else />
      </div>
    </div>

    <Filters />
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { Filters, Search } from '@/components/basic'
import { OffersEmptyState } from '@/components/offers'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import { ItemsList } from '@/components/items/index.js'

export default {
    components: {
        Search,
        OffersEmptyState,
        ItemsList,
        Filters
    },

    setup () {
        const store = useStore()
        const sortedItems = computed(() => store.getters['items/sortedItems'])

        return { sortedItems }
    },

    // TODO: use Composition API
    async asyncData ({ store }) {
        await store.dispatch('filters/setData', {
            defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
            defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
            availableSorts: ItemsFiltersScheme.getAvailableSorts()
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
</style>

<!--    <div class="wit-items wit-flex">-->
<!--      <div class="wit-flex__item&#45;&#45;grow">-->
<!--        <ItemFilters :filters-data="filters" class="wit-offset-bottom&#45;&#45;sm" @change="onFiltersChange" @reset="resetFilter" />-->

<!--        <div>-->
<!--          <div class="wit-flex wit-flex&#45;&#45;wrap wit-items__item-grid">-->
<!--            <ItemView-->
<!--              v-for="item in slicedItems"-->
<!--              :key="item.id"-->
<!--              :item="item"-->
<!--              @clicked="onItemSelected"-->
<!--            >-->
<!--              <ItemPriceList :prices="$options.prices" />-->
<!--            </ItemView>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div v-if="selectedItem" class="wit-items__sidebar">-->
<!--        <div class="wit-offset-bottom&#45;&#45;sm wit-flex">-->
<!--          <ItemView :item="selectedItem" :is-title-shown="false" class="wit-offset-right&#45;&#45;sm wit-flex__item&#45;&#45;no-shrink wit-items__selected-item-view" />-->

<!--          <div>-->
<!--            <h4 class="wit-offset-bottom&#45;&#45;sm wit-font-size&#45;&#45;sm">-->
<!--              {{ selectedItem.name }}-->
<!--            </h4>-->

<!--            <ItemTags :item="selectedItem" />-->
<!--          </div>-->
<!--        </div>-->

<!--        <p class="wit-offset-bottom&#45;&#45;sm">-->
<!--          In stock: 10-->
<!--        </p>-->

<!--        <b-button type="is-primary" class="wit-transition">-->
<!--          Create offer-->
<!--        </b-button>-->

<!--        <b-button type="is-primary" class="wit-transition">-->
<!--          Wishlist item-->
<!--        </b-button>-->

<!--        <b-button type="is-primary is-light" class="wit-transition" @click="selectedItem = null">-->
<!--          Close-->
<!--        </b-button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { isEqual } from 'lodash'-->
<!--import ItemView from '@/components/items/ItemView'-->
<!--import ItemFilters from '@/components/items/ItemFilters'-->
<!--import { getObjectsDiff } from '@/utils'-->
<!--import ItemTags from '@/components/items/ItemTags'-->
<!--import TopNavBar from '@/components/header/TopNavBar.vue'-->
<!--import { Price } from '@/domain/models/index.js'-->
<!--import ItemPriceList from '@/components/items/ItemPriceList.vue'-->

<!--const DEFAULT_FILTERS = {-->
<!--    query: '',-->
<!--    rarities: [],-->
<!--    isOnlyTradeable: false,-->
<!--    isOnlyOwned: false,-->
<!--    slots: [],-->
<!--    events: []-->
<!--}-->

<!--export default {-->
<!--    components: {-->
<!--        ItemView,-->
<!--        ItemFilters,-->
<!--        ItemTags,-->
<!--        TopNavBar,-->
<!--        ItemPriceList-->
<!--    },-->

<!--    prices: [-->
<!--        Price.create({ item1Id: 900, item1Count: 50, item2Id: 904, item2Count: 50, priceType: 'fixed' }),-->
<!--        Price.create({ item1Id: 900, item1Count: 50, item2Id: 904, item2Count: 50, priceType: 'fixed' })-->
<!--    ],-->

<!--    // middleware: ['isAuthorized'],-->

<!--    data: () => ({-->
<!--        items: [],-->
<!--        page: 2,-->
<!--        selectedItem: null,-->
<!--        filters: { ...DEFAULT_FILTERS }-->
<!--    }),-->

<!--    computed: {-->
<!--        filteredItems () {-->
<!--            const items = this.items-->
<!--            const lowerCasedQuery = this.filters.query.toLowerCase()-->

<!--            return items.filter((item) => {-->
<!--                const isFilteredByName = lowerCasedQuery ? item.name.toLowerCase().includes(lowerCasedQuery) : true-->
<!--                const isFilteredByRarity = this.filters.rarities.length ? this.filters.rarities.includes(item.rarity) : true-->
<!--                const isFilteredByEvent = this.filters.events.length ? this.filters.events.includes(item.event) : true-->
<!--                const isFilteredBySlot = this.filters.slots.length ? this.filters.slots.includes(item.slot) : true-->
<!--                const isFilteredByTradeable = this.filters.isOnlyTradeable ? item.isTradeable : true-->

<!--                return isFilteredByRarity &&-->
<!--                    isFilteredBySlot &&-->
<!--                    isFilteredByName &&-->
<!--                    isFilteredByTradeable &&-->
<!--                    isFilteredByEvent-->
<!--            })-->
<!--        },-->

<!--        slicedItems () {-->
<!--            return this.filteredItems.slice(0, this.page * 50)-->
<!--        }-->
<!--    },-->

<!--    watch: {-->
<!--        filters: {-->
<!--            deep: true,-->
<!--            handler (filters) {-->
<!--                const routeFilters = this.getFiltersFromRoute()-->

<!--                if (isEqual(filters, routeFilters)) {-->
<!--                    return-->
<!--                }-->

<!--                const changedFilters = getObjectsDiff(DEFAULT_FILTERS, filters)-->
<!--                this.$router.replace({ path: this.$route.path, query: changedFilters })-->
<!--            }-->
<!--        },-->

<!--        $route: {-->
<!--            deep: true,-->
<!--            handler () {-->
<!--                this.filters = this.getFiltersFromRoute()-->
<!--            }-->
<!--        }-->
<!--    },-->

<!--    created () {-->
<!--        this.items = this.$itemsService.toList()-->
<!--        this.filters = this.getFiltersFromRoute()-->
<!--    },-->

<!--    mounted () {-->
<!--        window.addEventListener('scroll', () => {-->
<!--            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500) {-->
<!--                this.page++-->
<!--            }-->
<!--        })-->
<!--    },-->

<!--    methods: {-->
<!--        getFiltersFromRoute () {-->
<!--            const { query: params } = this.$route-->
<!--            const filters = {}-->

<!--            const slots = Array.isArray(params.slots) ? params.slots : params.slots ? [params.slots] : DEFAULT_FILTERS.slots-->
<!--            const rarities = Array.isArray(params.rarities) ? params.rarities : params.rarities ? [params.rarities] : DEFAULT_FILTERS.rarities-->
<!--            const events = Array.isArray(params.events) ? params.events : params.events ? [params.events] : DEFAULT_FILTERS.events-->

<!--            filters.query = params.query ?? DEFAULT_FILTERS.query-->
<!--            filters.rarities = rarities-->
<!--            filters.slots = slots-->
<!--            filters.events = events-->
<!--            filters.isOnlyTradeable = params.isOnlyTradeable === 'true' ?? DEFAULT_FILTERS.isOnlyTradeable-->
<!--            filters.isOnlyOwned = params.isOnlyOwned === 'true' ?? DEFAULT_FILTERS.isOnlyOwned-->

<!--            return filters-->
<!--        },-->

<!--        onFiltersChange (filters) {-->
<!--            this.filters = filters-->
<!--            this.page = 1-->
<!--        },-->

<!--        resetFilter (filterProp) {-->
<!--            this.filters[filterProp] = DEFAULT_FILTERS[filterProp]-->
<!--            this.page = 1-->
<!--        },-->

<!--        onItemSelected (selectedItem) {-->
<!--            this.selectedItem = selectedItem-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.wit-items {-->
<!--    padding: var(&#45;&#45;offset-sm);-->
<!--}-->

<!--.wit-items__item-grid {-->
<!--    display: grid;-->
<!--    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));-->
<!--    grid-column-gap: 8px;-->
<!--    justify-items: center;-->
<!--    grid-row-gap: 16px;-->

<!--    @media screen and (max-width: 768px) {-->
<!--        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));-->
<!--    }-->
<!--}-->

<!--.wit-items__sidebar {-->
<!--    flex-basis: 450px;-->
<!--    padding: 0 24px;-->
<!--    position: sticky;-->
<!--    top: 94px;-->
<!--    max-height: calc(100vh - 94px);-->
<!--}-->

<!--.wit-items__selected-item-view {-->
<!--    width: 100%;-->
<!--    max-width: 100px;-->
<!--}-->

<!--.wit-item-image__image {-->
<!--    border-radius: 8px;-->
<!--    display: block;-->
<!--}-->
<!--</style>-->
