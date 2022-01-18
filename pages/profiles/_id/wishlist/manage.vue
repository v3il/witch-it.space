<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <div class="wit-font-size--sm">
          {{ $t('MainMenu_EditWishlist') }}
        </div>
      </template>

      <template #topMenu>
        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="mode = $event">
          <template #tab0>
            {{ $t('Wishlist_TopTabs_Orders') }}
            <span class="wit-top-tabs__counter wit-offset-left--xxs">{{ wishlist.length }}</span>
          </template>

          <template #tab1>
            {{ $t('Wishlist_TopTabs_Wishlist') }}
            <span class="wit-top-tabs__counter wit-offset-left--xxs">{{ items.length }}</span>
          </template>
        </TopTabs>
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
        <div class="wit-flex wit-paddings--sm wit-flex__item--grow">
          <div class="wit-wishlist-editor__items-container wit-background--content wit-flex wit-flex--column">
            <WishlistFilters
              :default-filters="$options.defaultFilters"
              :filters="filters"
              :default-sort="$options.defaultSort"
              :sort="sort"
              class="wit-wishlist-editor__items-filter wit-offset-bottom--xs"
              @filtersChanged="onFiltersChange"
              @sortChanged="onSortChange"
            />

            <b-tabs v-model="mode" type="is-toggle" :animated="false" class="wit-tabs--no-content wit-offset-bottom--xs" style="padding: 0 8px;">
              <b-tab-item value="wishlist">
                <template #header>
                  <i class="mdi mdi-20px mdi-heart wit-offset-right--xxs" />
                  <!--                  <b-icon icon="heart" size />-->
                  <span class="wit-flex wit-flex--center"> Wishlist <b-tag rounded class="wit-offset-left--xs" style="line-height: 15px;"> {{ wishlist.length }} </b-tag> </span>
                </template>
              </b-tab-item>

              <b-tab-item value="allItems">
                <template #header>
                  <i class="mdi mdi-20px mdi-grid wit-offset-right--xxs" />
                  <span> All items <b-tag rounded class="wit-offset-left--xs" style="line-height: 15px;"> {{ items.length }} </b-tag> </span>
                </template>
              </b-tab-item>
              <!--              <b-tab-item label="All items" icon="google-photos" value="allItems" />-->
            </b-tabs>

            <ItemsList :items="sortedItems" class="wit-wishlist-editor__items-list wit-flex__item--grow">
              <template #default="{ visibleItems }">
                <ItemView
                  v-for="item in visibleItems"
                  :key="item.id"
                  :item="item"
                  :class="{ 'wit-selected-item': isItemSelected(item) }"
                  @clicked="onItemClicked"
                >
                  <div v-if="mode === 'allItems' && isItemInWishlist(item)" class="wit-position--absolute wit-background--content wit-item__icon-container">
                    <i class="mdi mdi-heart mdi-18px wit-color--white wit-item__icon" />
                  </div>

                  <div v-if="mode === 'wishlist'">
                    prices
                  </div>
                </ItemView>
              </template>
            </ItemsList>

            <!--            <ItemsList v-else :items="sortedItems" class="wit-wishlist-editor__items-list wit-flex__item&#45;&#45;grow">-->
            <!--              <template #default="{ visibleItems }">-->
            <!--                <ItemView-->
            <!--                  v-for="item in visibleItems"-->
            <!--                  :key="item.id"-->
            <!--                  :item="item"-->
            <!--                  :class="{ 'wit-selected-item': isItemSelected(item) }"-->
            <!--                  @clicked="onItemClicked"-->
            <!--                >-->
            <!--                  <div v-if="isItemInWishlist(item)" class="wit-position&#45;&#45;absolute wit-background&#45;&#45;content wit-item__icon-container">-->
            <!--                    <i class="mdi mdi-heart mdi-18px wit-color&#45;&#45;white wit-item__icon" />-->
            <!--                  </div>-->
            <!--                </ItemView>-->
            <!--              </template>-->
            <!--            </ItemsList>-->
          </div>

          <div class="wit-wishlist-editor__editor wit-paddings--sm wit-offset-left--sm wit-background--content">
            <div style="overflow-y: scroll;" class="wit-block--full-height">
              <WishlistSelectedItem v-for="wi in selectedItems" :key="wi.prices.length" :wishlist-item="wi" class="wit-offset-bottom--sm" />

              <!--              {{ selectedItems }}-->

              <!--              <p v-for="wi in selectedItems" :key="wi.item.id">-->
              <!--                {{ wi.item.id }}-->
              <!--              </p>-->
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'
import WishlistFilters from '@/components/wishlist/WishlistFilters.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import ItemView from '@/components/items/ItemView.vue'
import { WishlistItem } from '@/models/WishlistItem.js'
import WishlistSelectedItem from '@/components/wishlist/WishlistSelectedItem.vue'
import WishlistItemView from '@/components/wishlist/WishlistItemView.vue'
import TopTabs from '@/components/header/TopTabs.vue'

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

const Modes = {
    WISHLIST: 'wishlist',
    ALL_ITEMS: 'allItems'
}

export default {
    name: 'WishlistEditor',

    modes: Object.values(Modes),
    defaultFilters: { ...DEFAULT_FILTERS },
    defaultSort: { ...DEFAULT_SORT },

    components: {
        ItemsList,
        WishlistFilters,
        TopNavBar,
        EmptyState,
        ItemView,
        WishlistSelectedItem,
        WishlistItemView,
        TopTabs
    },

    async asyncData ({ app: { $userService, $wishlistService }, route, store }) {
        const items = store.state.items.items

        const { profile } = await $userService.fetch(route.params.id)
        const { wishlist } = await $wishlistService.fetch(route.params.id)

        // console.log(wishlist.map((w) => {
        //     return WishlistItem.fromSaved(items[w.itemId], w.prices)
        // }))

        return {
            profile,
            wishlist, /* .map((w) => {                console.error(items[w.itemId])
                return WishlistItem.fromSaved({ id: 0, item: items[w.itemId], prices: w.prices })
            }) */
            error: null
        }
    },

    data: () => ({
        filters: { ...DEFAULT_FILTERS },
        sort: { ...DEFAULT_SORT },
        selectedItems: [],
        mode: Modes.WISHLIST
    }),

    computed: {
        items () {
            return Object.values(this.$store.state.items.items).filter(item => item.isTradeable)
        },

        itemsInWishlist () {
            const items = this.$store.state.items.items

            console.log(this.wishlist)

            console.log(333, this.wishlist.map(wishlistItem => items[wishlistItem.itemId]))

            return this.wishlist.map(wishlistItem => items[wishlistItem.itemId])
        },

        filteredItems () {
            const items = this.mode === Modes.WISHLIST ? this.itemsInWishlist : this.items
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
                case 'wishlistStatus':
                    return this.isItemInWishlist(first) - this.isItemInWishlist(second)
                }

                return 0
            })
        }
    },

    created () {
        // this.selectedItems = [this.wishlist[0]]

        console.log(this.wishlist[0])
        console.log(this.wishlist[0].prices)
    },

    methods: {
        onFiltersChange (filters) {
            this.filters = filters
        },

        onSortChange (sort) {
            this.sort = sort
        },

        onWlClick () {
            console.log(this.wishlist[0])
        },

        onItemClicked (item) {
            const a = this.wishlist.find(wi => wi.item?.id === item?.id)

            if (a) {
                console.log(222, a)
                return this.selectedItems.push(a)
            }

            if (this.isItemSelected(item)) {
                return this.removeFromSelected(item)
            }

            this.selectedItems.push(WishlistItem.fromNew({ item }))
        },

        removeFromSelected (item) {
            this.selectedItems = this.selectedItems.filter(wishlistItem => wishlistItem.item !== item)
        },

        isItemSelected (item) {
            return this.selectedItems.some(wishlistItem => wishlistItem.item === item)
        },

        isItemInWishlist (item) {
            return [903, 902, 904].includes(item.id)

            // return this.wishlist.some(wishlistItem => wishlistItem.itemId === item.id)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profile {
    height: calc(100vh - var(--header-height));
    max-height: calc(100vh - var(--header-height));
}

.wit-wishlist-editor__items-container {
    flex: 1;
    border-radius: var(--offset-xxs);
    padding: var(--offset-sm) var(--offset-xs);
}

.wit-wishlist-editor__items-filter {
    padding: 0 var(--offset-xs);
}

.wit-wishlist-editor__wishlist-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-column-gap: 16px; //var(--offset-sm);
    grid-auto-rows: max-content;
    grid-row-gap: 16px; //var(--offset-sm);
    justify-items: center;
    overflow-y: scroll;
    padding-right: var(--offset-xs);
}

.wit-wishlist-editor__items-list,
.wit-wishlist-editor__wishlist-list {
    padding: var(--offset-xs) var(--offset-xs) 0;
}

.wit-wishlist-editor__editor {
    flex: 0 0 450px;
}

.wit-selected-item,
.ccc {
    box-shadow: 0 0 6px 3px var(--color);
}

.wit-item__icon-container {
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--danger);
}

.wit-item__icon {
    width: 18px;
    height: 18px;
    text-align: center;
}
</style>
