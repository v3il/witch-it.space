<template>
  <div class="wit-wishlist-editor wit-flex wit-flex--column">
    <div class="wit-wishlist-editor__header">
      <div class="wit-flex wit-flex--align-center wit-block--full-height">
        <b-button type="is-primary is-light" class="wit-transition wit-offset-right--xs" @click="$emit('close')">
          {{ $t('Close') }}
        </b-button>
      </div>
    </div>

    <div class="wit-flex wit-wishlist-editor__container wit-flex__item--grow">
      <div class="wit-wishlist-editor__items-container wit-offset-right--sm wit-paddings--sm wit-background--content wit-flex wit-flex--column">
        <Filters
          :default-filters="$options.defaultFilters"
          :filters="filters"
          :default-sort="$options.defaultSort"
          :sort="sort"
          query-input-placeholder="Search item"
          :sorts="$options.sorts"
          :store-in-url="false"
          class="wit-offset-bottom--xs"
          @filtersChanged="onFiltersChange"
          @sortChanged="onSortChange"
        >
          <template #default="{ filterParams, update, reset }">
            <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
              <b-dropdown
                :value="filterParams.rarities"
                :mobile-modal="false"
                multiple
                aria-role="list"
                @input="update({ rarities: $event })"
              >
                <template #trigger>
                  <b-button
                    type="is-primary"
                    icon-right="menu-down"
                  >
                    <div v-if="filterParams.rarities.length" class="wit-flex wit-flex--align-center">
                      <p class="wit-offset-right--xs wit-font-size--xxs">
                        {{ $t('Items_Filters_Rarity') }}:
                      </p>
                      <div v-for="rarity in filterParams.rarities" :key="rarity" class="wit-rarity-indicator wit-offset-right--xxs" :class="`wit-rarity-indicator--${rarity}`" />
                    </div>

                    <span v-else>
                      {{ $t('Items_Filters_AnyRarity') }}
                    </span>
                  </b-button>
                </template>

                <b-dropdown-item v-for="rarity in $options.rarities" :key="rarity.value" :value="rarity.value">
                  <div class="wit-flex wit-flex--align-center">
                    <div class="wit-rarity-indicator wit-offset-right--xs" :class="`wit-rarity-indicator--${rarity.value}`" />
                    <span>{{ rarity.label }}</span>
                  </div>
                </b-dropdown-item>
              </b-dropdown>

              <b-button type="is-ghost" size="is-small" @click="reset('rarities')">
                <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
              </b-button>
            </div>

            <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
              <b-dropdown
                :value="filterParams.events"
                :mobile-modal="false"
                multiple
                aria-role="list"
                scrollable
                :max-height="250"
                @input="update({ events: $event })"
              >
                <template #trigger>
                  <b-button
                    type="is-primary"
                    icon-right="menu-down"
                  >
                    <div v-if="filterParams.events.length" class="wit-flex wit-flex--align-center">
                      <p class="wit-offset-right--xs wit-font-size--xxs">
                        {{ $t('Items_Filters_EventsSelected', [filterParams.events.length]) }}
                      </p>
                    </div>

                    <span v-else>
                      {{ $t('Items_Filters_AnyEvent') }}
                    </span>
                  </b-button>
                </template>

                <b-dropdown-item v-for="event in $options.events" :key="event.value" :value="event.value">
                  <span>{{ event.label }}</span>
                </b-dropdown-item>
              </b-dropdown>

              <b-button type="is-ghost" size="is-small" @click="reset('events')">
                <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
              </b-button>
            </div>

            <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
              <b-dropdown
                :value="filterParams.slots"
                :mobile-modal="false"
                multiple
                aria-role="list"
                scrollable
                :max-height="250"
                @input="update({ slots: $event })"
              >
                <template #trigger>
                  <b-button
                    type="is-primary"
                    icon-right="menu-down"
                  >
                    <div v-if="filterParams.slots.length" class="wit-flex wit-flex--align-center">
                      <p class="wit-offset-right--xs wit-font-size--xxs">
                        {{ $t('Items_Filters_SlotsSelected', [filterParams.slots.length]) }}
                      </p>
                    </div>

                    <span v-else>
                      {{ $t('Items_Filters_AnySlot') }}
                    </span>
                  </b-button>
                </template>

                <b-dropdown-item v-for="slot in $options.slots" :key="slot.value" :value="slot.value">
                  <span>{{ slot.label }}</span>
                </b-dropdown-item>
              </b-dropdown>

              <b-button type="is-ghost" size="is-small" @click="reset('slots')">
                <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
              </b-button>
            </div>

            <div class="wit-flex wit-flex--wrap">
              <!--              <b-switch :value="filterParams.onlyTradeable" class="wit-offset-right&#45;&#45;sm wit-offset-bottom&#45;&#45;xs" @input="update('onlyTradeable', $event)">-->
              <!--                {{ $t('Items_Filters_OnlyTradeable') }}-->
              <!--              </b-switch>-->

              <b-switch :value="filterParams.onlyOwned" class=" wit-offset-bottom--xs" @input="update('onlyOwned', $event)">
                {{ $t('Items_Filters_OnlyOwned') }}
              </b-switch>
            </div>
          </template>
        </Filters>

        <ItemsList :items="sortedItems" class="wit-wishlist-editor__items wit-flex__item--grow" />
      </div>

      <Card class="wit-wishlist-editor__editor">
        1
      </Card>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'
import Card from '@/components/basic/Card.vue'
import Filters from '@/components/basic/Filters.vue'
import { eventsManager, raritiesManager, slotsManager } from '@/shared/index.js'

const DEFAULT_FILTERS = {
    query: '',
    rarities: [],
    onlyTradeable: false,
    onlyOwned: false,
    slots: [],
    events: []
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
        Filters
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
.wit-wishlist-editor {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: calc(var(--zindex-fixed) + 1);
    background-color: var(--body-bg);
}

.wit-wishlist-editor__header {
    background-color: var(--header-bg);
    flex: 0 0 50px;
    position: sticky;
    top: 0;
    padding: 0 var(--offset-sm);
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
