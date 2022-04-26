<template>
  <div class="wit-flex--justify-between1 wit-flex wit-flex--justify-end1 wit-flex--wrap">
    <div class="wit-flex wit-filter__filter wit-offset-bottom--xs1 wit-offset-right--xs1">
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

      <!--      <Dropdown ref="filterDropdown" position="end">-->
      <!--        <template #trigger>-->
      <b-button
        class="wit-flex wit-flex--center wit-filter__filter-button wit-split-part--right"
        :class="{ 'wit-indicator': isFiltersChanged }"
        @click="$emit('open')"
      >
        <i class="mdi mdi-20px mdi-filter wit-color--muted" />
      </b-button>
      <!--        </template>-->

      <!--        <div class="wit-filter__filter-popup">-->
      <!--          <div class="wit-offset-bottom&#45;&#45;xs1">-->
      <!--            <slot :filterParams="filters" :update="update" :reset="resetFilter" />-->
      <!--          </div>-->

      <!--          <div class="wit-padding-top&#45;&#45;sm wit-flex wit-flex&#45;&#45;justify-end wiz-border&#45;&#45;top">-->
      <!--            <b-button type="is-danger" @click="resetFilters">-->
      <!--              {{ $t('Clear') }}-->
      <!--            </b-button>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </Dropdown>-->
    </div>

    <!--    <div class="wit-flex wit-offset-bottom&#45;&#45;xs1 wit-position&#45;&#45;relative" :class="{ 'wit-indicator': isSortsChanged }">-->
    <!--      <slot name="sorting-dropdown" :updateSortBy="updateSortBy" />-->

    <!--      <b-button class="wit-filter__order-button wit-split-part&#45;&#45;right" @click="toggleOrder">-->
    <!--        <div class="wit-color&#45;&#45;muted">-->
    <!--          <i v-if="isAscendingOrder" class="mdi mdi-sort-ascending mdi-20px" />-->
    <!--          <i v-else class="mdi mdi-sort-descending mdi-20px" />-->
    <!--        </div>-->
    <!--      </b-button>-->
    <!--    </div>-->
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
        // this.update = debounce(this.update, 200)
    },

    methods: {
        updateSort (updatedSort) {
            this.$emit('sortChanged', {
                ...this.sorts,
                ...updatedSort
            })
        },

        updateSortBy (sortByValue) {
            this.$emit('sortChanged', {
                ...this.sorts,
                sortBy: sortByValue
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
