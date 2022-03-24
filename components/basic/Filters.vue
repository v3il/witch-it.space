<template>
  <div class="wit-flex--justify-between1 wit-flex wit-flex--justify-end1 wit-flex--wrap">
    <div class="wit-flex wit-filter__filter wit-offset-bottom--xs wit-offset-right--xs">
      <b-input
        class="wit-flex__item--grow"
        :value="filters.query"
        maxlength="20"
        :placeholder="queryInputPlaceholder"
        custom-class="wit-transition wit-split-part--left"
        :has-counter="false"
        icon-right="close"
        icon-right-clickable
        @input="update({ query: $event })"
        @icon-right-click="resetFilter('query')"
      />

      <Dropdown ref="filterDropdown" position="end">
        <template #trigger>
          <b-button class="wit-flex wit-flex--center wit-filter__filter-button wit-split-part--right" :class="{ 'wit-indicator': isFiltersChanged }">
            <i class="mdi mdi-20px mdi-filter wit-color--muted" />
          </b-button>
        </template>

        <div class="wit-filter__filter-popup">
          <div class="wit-offset-bottom--md">
            <slot :filterParams="filters" :update="update" :reset="resetFilter" />
          </div>

          <div class="wit-padding-top--sm wit-flex wit-flex--justify-end wiz-border--top">
            <b-button type="is-danger" @click="resetFilters">
              {{ $t('Clear') }}
            </b-button>
          </div>
        </div>
      </Dropdown>
    </div>

    <div class="wit-flex wit-offset-bottom--xs wit-position--relative" :class="{ 'wit-indicator': isSortsChanged }">
      <Dropdown position="end">
        <template #trigger>
          <b-button icon-right="menu-down" class="wit-flex wit-flex--center wit-filter__sort-button wit-split-part--left">
            <span class="wit-color--muted wit-inline-block1 wit-offset-right--xxs">{{ $t('SortedBy') }}:</span>
            <span class="wit-color--white">{{ $t(sorts[sorts.sortBy]) }}</span>
          </b-button>
        </template>

        <template #items>
          <li v-for="(label, key) in sorts" :key="key" class="wit-transition--background">
            <b-button type="is-ghost" class="wit-color--white wit-flex--justify-start" expanded @click="updateSort({ sortBy: key })">
              {{ $t(label) }}
            </b-button>
          </li>
        </template>
      </Dropdown>

      <b-button class="wit-filter__order-button wit-split-part--right" @click="toggleOrder">
        <div class="wit-color--muted">
          <i v-if="isAscendingOrder" class="mdi mdi-sort-ascending mdi-20px" />
          <i v-else class="mdi mdi-sort-descending mdi-20px" />
        </div>
      </b-button>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
import { SortOrders } from '@/shared/items/index.js'

export default {
    name: 'Filters',

    components: {
        Dropdown
    },

    props: {
        filters: {
            required: true,
            type: Object
        },

        isFiltersChanged: {
            required: true,
            type: Boolean
        },

        sorts: {
            required: true,
            type: Object
        },

        isSortsChanged: {
            required: true,
            type: Boolean
        },

        queryInputPlaceholder: {
            required: true,
            type: String
        }
    },

    computed: {
        isAscendingOrder () {
            return this.sorts.order === SortOrders.ASC
        }
    },

    created () {
        this.update = debounce(this.update, 200)
    },

    methods: {
        updateSort (updatedSort) {
            this.$emit('sortChanged', {
                ...this.sorts,
                ...updatedSort
            })
        },

        update (updatedFilters) {
            this.$emit('filtersChanged', {
                ...this.filters,
                ...updatedFilters
            })
        },

        resetFilter (propName) {
            this.$emit('resetFilter', propName)
        },

        resetFilters () {
            this.$emit('resetFilters')
            this.$refs.filterDropdown.hide()
        },

        toggleOrder () {
            this.updateSort({ order: this.isAscendingOrder ? SortOrders.DESC : SortOrders.ASC })
        }
    }
}
</script>

<style scoped lang="scss">
.wit-filter__filter {
    flex: 0 1 250px;
    //margin-right: var(--offset-xs);

    @media (max-width: 600px) {
        flex: 0 1 100%;
        margin-right: 0;
        margin-bottom: var(--offset-xs);
    }
}

.wit-filter__order-button,
.wit-filter__sort-button,
.wit-filter__filter-button {
    background-color: rgb(46, 54, 72);
    border: var(--default-border);
    color: var(--body-color);
}

.wit-filter__filter-button,
.wit-filter__order-button {
    padding: 0 var(--offset-xs);
    //border-radius: 0 var(--offset-xxs) var(--offset-xxs) 0;
}

//.wit-filter__input,
//.wit-filter__sort-button {
//    border-radius: var(--offset-xxs) 0 0 var(--offset-xxs);
//}

.wit-filter__filter-popup {
    padding: var(--offset-sm) var(--offset-sm) var(--offset-xs);
    min-width: 400px;

    @media (max-width: 850px) {
        min-width: 0;
    }
}
</style>
