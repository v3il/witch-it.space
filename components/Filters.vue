<template>
  <div class="wit-filter wit-flex--justify-between wit-flex">
    <div class="wit-flex wit-filter__filter">
      <b-input
        class="wit-filter__input"
        :value="filters.query"
        maxlength="20"
        :placeholder="queryInputPlaceholder"
        custom-class="wit-transition wit-search-input"
        :has-counter="false"
        icon-right="close"
        icon-right-clickable
        @input="update({ query: $event })"
        @icon-right-click="resetFilter('query')"
      />

      <b-dropdown
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs wit-filter__filter-button"
        position="is-bottom-right"
      >
        <template #trigger>
          <i class="mdi mdi-filter mdi-20px wit-filter__filter-icon wit-flex wit-flex--center" :class="{ 'with-indicator': hasChanges }" />
        </template>

        <div class="wit-filter__filter-popup">
          <slot :filterParams="filters" :update="update" />

          <div class="wit-padding-top--sm wit-flex wit-flex--justify-end" style="border-top: 1px solid #36394c;">
            <b-button type="is-danger" class="wis-user-view__stat-button" @click="resetFilters">
              Clear
            </b-button>
          </div>
        </div>
      </b-dropdown>
    </div>

    <div class="wit-flex">
      <b-dropdown
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs1 wit-filter__sort-dropdown"
        position="is-bottom-left"
      >
        <template #trigger>
          <b-button icon-right="menu-down" class="wit-flex wit-flex--center wit-filter__sort-button">
            <span class="wit-color--muted wit-inline-block wit-offset-right--xxs">Sort by</span>
            <span class="wit-color--white">{{ $t(defaultSort[sort.sortBy]) }}</span>
          </b-button>
        </template>

        <b-dropdown-item v-for="(label, key) in defaultSort" :key="key" class="wit-transition--background">
          <div class="wit-flex wit-flex--align-center wit-color--white">
            <b-icon size="is-small" class="is-size-5 wit-offset-right--xs" icon="sort-ascending" />
            <span class="wit-inline-block username">{{ $t(label) }}</span>
          </div>
        </b-dropdown-item>
      </b-dropdown>

      <b-button
        target="_blank"
        class="wit-filter__order-button"
        @click="updateSort({ order: sort.order === 'asc' ? 'desc' : 'asc' })"
      >
        <div class="wit-fle wit-color--muted">
          <i v-if="sort.order === 'asc'" class="mdi mdi-sort-ascending mdi-20px" />
          <i v-else class="mdi mdi-sort-descending mdi-20px" />
        </div>
      </b-button>
    </div>
  </div>
</template>

<script>
import { isEqual } from 'lodash'
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
        }
    },

    computed: {
        hasChanges () {
            const { query, ...otherProps } = this.filters
            const { query: originalQuery, ...otherPropsOriginal } = this.defaultFilters

            return !isEqual(otherPropsOriginal, otherProps)
        }
    },

    watch: {
        filters: {
            deep: true,
            handler (filters) {
                const routeFilters = getFiltersFromRoute(this.$route, this.defaultFilters)

                if (isEqual(filters, routeFilters)) {
                    return
                }

                const changedFilters = getObjectsDiff(this.defaultFilters, filters)
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        ...changedFilters
                    }
                })
            }
        },

        sort: {
            deep: true,
            handler (sort) {
                const routeSort = getSortFromRoute(this.$route, this.defaultSort)

                console.log(routeSort, this.defaultSort)

                if (isEqual(sort, routeSort)) {
                    return
                }

                const changedSort = getObjectsDiff(this.defaultSort, sort)

                console.log(changedSort)

                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        ...changedSort
                    }
                })
            }
        },

        $route: {
            deep: true,
            handler () {
                this.$emit('filtersChanged', getFiltersFromRoute(this.$route, this.defaultFilters))
                this.$emit('sortChanged', getSortFromRoute(this.$route, this.defaultSort))
            }
        }
    },

    methods: {
        updateSort (updatedSort) {
            this.$emit('sortChanged', {
                ...this.sort,
                ...updatedSort
            })
        },

        update (updatedFilters) {
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
        }
    }
}
</script>

<style scoped lang="scss">
.wit-filter__filter {
    flex: 0 1 350px;
}

.wit-filter__order-button,
.wit-filter__sort-button,
.wit-filter__filter-button {
    background-color: rgb(46, 54, 72);
    border: 1px solid rgb(54, 57, 76);
    color: var(--body-color);
}

.wit-filter__order-button {
    padding: 0 var(--offset-xs);
}

.wit-filter__filter-button,
.wit-filter__order-button {
    border-radius: 0 var(--offset-xxs) var(--offset-xxs) 0;
    border-left: 0;
}

.wit-filter__input,
.wit-filter__sort-button {
    border-radius: var(--offset-xxs) 0 0 var(--offset-xxs);
}

.wit-filter__filter-icon {
    color: #dbdbdb;
    width: var(--offset-lg);
    height: var(--offset-lg);

    &.with-indicator {
        position: relative;

        &::after {
            content: "";
            position: absolute;
            width: var(--offset-xs);
            height: var(--offset-xs);
            border-radius: 50%;
            top: -4px;
            right: -4px;
            background-color: var(--danger);
            animation: pulse 5s infinite linear;
            will-change: opacify;
        }
    }
}

.wit-filter__filter-popup {
    padding: var(--offset-xs) var(--offset-md);
    min-width: 460px;

    @media (max-width: 850px) {
        min-width: 0;
    }
}
</style>
