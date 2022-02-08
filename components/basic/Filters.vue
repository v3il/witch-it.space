<template>
  <div class="wit-flex--justify-between wit-flex wit-flex--justify-end wit-flex--wrap">
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

      <!--      <VPopover ref="filterDropdown" placement="bottom-start">-->
      <!--        <b-button icon-right="menu-down" class="wit-flex wit-flex&#45;&#45;center wit-filter__filter-button" :class="{ 'wit-indicator': hasFilterChanges }">-->
      <!--          <span class="wit-color&#45;&#45;muted wit-inline-block wit-offset-right&#45;&#45;xxs">{{ $t('Filter') }}</span>-->
      <!--        </b-button>-->

      <!--        <template slot="popover">-->
      <!--          <div class="wit-filter__filter-popup">-->
      <!--            <div class="wit-offset-bottom&#45;&#45;md">-->
      <!--              <slot :filterParams="filters" :update="update" :reset="resetFilter" />-->
      <!--            </div>-->

      <!--            <div class="wit-padding-top&#45;&#45;sm wit-flex wit-flex&#45;&#45;justify-end wiz-border&#45;&#45;top">-->
      <!--              <b-button type="is-danger" @click="resetFilters">-->
      <!--                {{ $t('Clear') }}-->
      <!--              </b-button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </VPopover>-->

      <b-dropdown
        ref="filterDropdown"
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xxs"
        position="is-bottom-right"
      >
        <template #trigger>
          <b-button class="wit-flex wit-flex--center wit-filter__filter-button wit-split-part--right" :class="{ 'wit-indicator': hasFilterChanges }">
            <i class="mdi mdi-20px mdi-filter wit-color--muted" />
            <!--            <span class="wit-color&#45;&#45;muted wit-inline-block wit-offset-right&#45;&#45;xxs">{{ $t('Filter') }}</span>-->
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
      </b-dropdown>
    </div>

    <div class="wit-flex wit-offset-bottom--xs wit-position--relative" :class="{ 'wit-indicator': hasSortChanges }">
      <!--      <VPopover ref="filterDropdown" placement="bottom-start">-->
      <!--        <b-button icon-right="menu-down" class="wit-flex wit-flex&#45;&#45;center wit-filter__sort-button">-->
      <!--          <span class="wit-color&#45;&#45;muted wit-inline-block wit-offset-right&#45;&#45;xxs">{{ $t('SortedBy') }}:</span>-->
      <!--          <span class="wit-color&#45;&#45;white">{{ $t(sorts[sort.sortBy]) }}</span>-->
      <!--        </b-button>-->

      <!--        <template slot="popover">-->
      <!--          <ul>-->
      <!--            <li v-for="(label, key) in sorts" :key="key" class="wit-transition&#45;&#45;background" @click="updateSort({ sortBy: key })">-->
      <!--              <div class="wit-flex wit-flex&#45;&#45;align-center wit-color&#45;&#45;white">-->
      <!--                {{ $t(label) }}-->
      <!--              </div>-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </template>-->
      <!--      </VPopover>-->

      <b-dropdown
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xxs"
        position="is-bottom-left"
      >
        <template #trigger>
          <b-button icon-right="menu-down" class="wit-flex wit-flex--center wit-filter__sort-button wit-split-part--left">
            <span class="wit-color--muted wit-inline-block wit-offset-right--xxs">{{ $t('SortedBy') }}:</span>
            <span class="wit-color--white">{{ $t(sorts[sort.sortBy]) }}</span>
          </b-button>
        </template>

        <b-dropdown-item v-for="(label, key) in sorts" :key="key" class="wit-transition--background" @click="updateSort({ sortBy: key })">
          <div class="wit-flex wit-flex--align-center wit-color--white">
            {{ $t(label) }}
          </div>
        </b-dropdown-item>
      </b-dropdown>

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
import { debounce, isEqual } from 'lodash'
import { getFiltersFromRoute, getObjectsDiff, getSortFromRoute } from '@/utils/index.js'

export default {
    name: 'Filters',

    props: {
        filters: {
            required: true,
            type: Object
        },

        defaultFilters: {
            required: true,
            type: Object
        },

        sort: {
            required: true,
            type: Object
        },

        defaultSort: {
            required: true,
            type: Object
        },

        queryInputPlaceholder: {
            required: true,
            type: String
        },

        sorts: {
            required: true,
            type: Object
        },

        storeInUrl: {
            required: false,
            type: Boolean,
            default: true
        }
    },

    computed: {
        hasFilterChanges () {
            const { query, ...otherProps } = this.filters
            const { query: originalQuery, ...otherPropsOriginal } = this.defaultFilters

            return !isEqual(otherPropsOriginal, otherProps)
        },

        hasSortChanges () {
            return !isEqual(this.sort, this.defaultSort)
        },

        isAscendingOrder () {
            return this.sort.order === 'asc'
        }
    },

    created () {
        this.update = debounce(this.update, 300)

        if (this.storeInUrl) {
            this.$watch('filters', this.updateUrl, { deep: true })
            this.$watch('sort', this.updateUrl, { deep: true })
            this.$watch('$route', () => {
                this.$emit('filtersChanged', getFiltersFromRoute(this.$route, this.defaultFilters))
                this.$emit('sortChanged', getSortFromRoute(this.$route, this.defaultSort, this.sorts))
            }, { deep: true })
        }
    },

    methods: {
        updateUrl () {
            const routeFilters = getFiltersFromRoute(this.$route, this.defaultFilters)
            const routeSort = getSortFromRoute(this.$route, this.defaultSort, this.sorts)

            if (isEqual(this.filters, routeFilters) && isEqual(this.sort, routeSort)) {
                return
            }

            const changedFilters = getObjectsDiff(this.defaultFilters, this.filters)
            const changedSort = getObjectsDiff(this.defaultSort, this.sort)

            this.$router.replace({
                path: this.$route.path,
                query: {
                    ...changedSort,
                    ...changedFilters
                }
            })
        },

        updateSort (updatedSort) {
            this.$emit('sortChanged', {
                ...this.sort,
                ...updatedSort
            })
        },

        update (updatedFilters) {
            console.log()

            this.$emit('filtersChanged', {
                ...this.filters,
                ...updatedFilters
            })
        },

        resetFilter (prop) {
            this.update({ [prop]: this.defaultFilters[prop] })
        },

        resetFilters () {
            this.update(this.defaultFilters)
            this.$refs.filterDropdown.hide()
        },

        toggleOrder () {
            this.updateSort({ order: this.isAscendingOrder ? 'desc' : 'asc' })
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
