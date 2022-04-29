<template>
  <div class="wis-wishlist-filters">
    <div class="wis-wishlist-filters__content">
      <QueryEditor
        :query="filters.query"
        class="wis-wishlist-filters__search wit-offset-bottom--sm"
        @update="update({ query: $event })"
        @reset="reset('query')"
      />

      <RaritiesSelector
        :selected-rarities="filters.rarities"
        class="wit-offset-bottom--sm"
        @update="update({ rarities: $event })"
        @reset="reset('rarities')"
      />

      <CharacterSelector
        :selected-character="filters.character"
        class="wit-offset-bottom--sm"
        @update="update({ character: $event })"
        @reset="reset('character')"
      />

      <EventsSelector
        :selected-events="filters.events"
        class="wit-offset-bottom--sm"
        @update="update({ events: $event })"
        @reset="reset('events')"
      />

      <SlotsSelector
        :selected-slots="filters.slots"
        class="wit-offset-bottom--sm"
        @update="update({ slots: $event })"
        @reset="reset('slots')"
      />

      <b-field class="wiz-border--top wit-padding-top--sm wit-padding-bottom--sm wiz-border--bottom">
        <div>
          <div class="wit-offset-bottom--xs wit-flex wit-flex--align-center wit-flex--justify-between">
            <h3>{{ $t('SortedBy') }}</h3>

            <b-button type="is-ghost" size="is-small" @click="$emit('resetSorts')">
              <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
            </b-button>
          </div>

          <div class="wit-flex wit-flex--align-center">
            <b-select
              expanded
              class="wit-flex__item--grow wit-offset-right--xs"
              :value="sorts.sortBy"
              @input="updateOrderBy"
            >
              <option value="rarity">
                {{ $t('Items_Sort_Rarity') }}
              </option>
              <option value="name">
                {{ $t('Items_Sort_Name') }}
              </option>
            </b-select>

            <b-button class="wit-filter__order-button" @click="toggleOrder">
              <div class="wit-color--muted">
                <i v-if="isAscendingOrder" class="mdi mdi-sort-ascending mdi-20px" />
                <i v-else class="mdi mdi-sort-descending mdi-20px" />
              </div>
            </b-button>
          </div>
        </div>
      </b-field>

      <b-button type="is-danger" expanded @click="$emit('reset')">
        {{ $t('Clear') }}
      </b-button>

      <b-button type="is-danger is-light" expanded class="wis-wishlist-filters__close wit-offset-top--xs" @click="$emit('close')">
        {{ $t('Close') }}
      </b-button>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/basic/Filters.vue'
import { eventsManager, raritiesManager, slotsManager } from '@/shared/index.js'
import DropdownItem from '@/components/basic/dropdown/DropdownItem.vue'
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
import RaritiesSelector from '@/components/basic/filters/RaritiesSelector.vue'
import EventsSelector from '@/components/basic/filters/EventsSelector.vue'
import SlotsSelector from '@/components/basic/filters/SlotsSelector.vue'
import CharacterSelector from '@/components/basic/filters/CharacterSelector.vue'
import { SortOrders } from '@/shared/items/index.js'
import QueryEditor from '@/components/basic/filters/QueryEditor.vue'

export default {
    name: 'WishlistFilters',

    rarities: raritiesManager.getTradeable(),
    events: eventsManager.getAll(),
    slots: slotsManager.getAll(),

    components: {
        Filters,
        DropdownItem,
        Dropdown,
        RaritiesSelector,
        EventsSelector,
        SlotsSelector,
        CharacterSelector,
        QueryEditor
    },

    props: {
        filters: {
            required: true,
            type: Object
        },

        sorts: {
            required: true,
            type: Object
        }
    },

    computed: {
        isAscendingOrder () {
            return this.sorts.order === SortOrders.ASC
        },

        sortByTitle () {
            return this.sorts.sortBy === 'rarity' ? this.$t('Items_Sort_Rarity') : this.$t('Items_Sort_Name')
        }
    },

    methods: {
        update (changedFilters) {
            this.$emit('changeFilters', changedFilters)
        },

        reset (propName) {
            this.$emit('resetFilter', propName)
        },

        updateOrderBy (orderBy) {
            this.$emit('updateOrderBy', orderBy)
        },

        toggleOrder () {
            this.$emit('toggleOrder')
        }
    }
}
</script>

<style scoped lang="scss">
.wis-wishlist-filters {
    border-radius: var(--offset-xxs);
    width: 275px;
    background-color: var(--content-bg);
    margin-left: var(--offset-sm);
    position: sticky;
    top: var(--offset-sm);
    height: auto;
    padding: var(--offset-sm);
    align-self: flex-start;
    overflow-y: auto;
    overscroll-behavior: contain;
    max-height: calc(100vh - 60px - 32px);
}

.wis-wishlist-filters__search,
.wis-wishlist-filters__close {
    display: none;
}

@media (max-width: 1100px) {
    .wis-wishlist-filters {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: calc(var(--navbar-z) + 1);
        margin: 0;
        width: auto;
        min-height: 100vh;
        max-height: 100vh;
        padding: var(--offset-sm);
        background-color: rgba(0, 0, 0, 0.7);
    }

    .wis-wishlist-filters__content {
        width: 300px;
        background-color: var(--content-bg);
        padding: var(--offset-sm);
        border-radius: var(--offset-xxs);
        height: 100%;
        margin: 0 auto;
    }

    .wis-wishlist-filters__search,
    .wis-wishlist-filters__close {
        display: flex;
    }
}
</style>
