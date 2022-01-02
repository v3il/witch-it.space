<template>
  <div class="wit-profiles-filter wit-flex--justify-between wit-flex">
    <div class="wit-flex">
      <b-input
        class="wit-offset-right--xs wit-profiles-filter__input"
        :value="filters.query"
        maxlength="20"
        :placeholder="queryInputPlaceholder"
        custom-class="wit-transition"
        :has-counter="false"
        icon-right="close"
        icon-right-clickable
        @input="update({ query: $event })"
        @icon-right-click="resetFilter('query')"
      />

      <b-dropdown
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs wit-profiles-filter__filter-button"
        position="is-bottom-right"
      >
        <template #trigger>
          <i class="mdi mdi-filter mdi-20px wit-profiles-filter__filter-icon wit-flex wit-flex--center" :class="{ 'with-indicator': hasChanges }" />
        </template>

        <div class="wit-profiles-filter__filter-popup">
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
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs wit-profiles-filter__sort-dropdown wit-offset-right--xs"
        position="is-bottom-left"
      >
        <template #trigger>
          <b-button icon-right="menu-down" class="wit-flex wit-flex--center wit-profiles-filter__sort-button">
            <span class="wit-color--muted">Sort by</span>
          </b-button>
        </template>

        <template v-for="(label, key) in defaultSort">
          <b-dropdown-item :key="key + 'asc'" class="wit-transition--background">
            <div class="wit-flex wit-flex--align-center wit-color--white">
              <b-icon size="is-small" class="is-size-5 wit-offset-right--xs" icon="sort-ascending" />
              <span class="wit-inline-block username">{{ $t(label) }}</span>
            </div>
          </b-dropdown-item>

          <b-dropdown-item :key="key + 'desc'" class="wit-transition--background">
            <div class="wit-flex wit-flex--align-center wit-color--white">
              <b-icon size="is-small" class="is-size-5 wit-offset-right--xs" icon="sort-descending" />
              <span class="wit-inline-block username">{{ $t(label) }}</span>
            </div>
          </b-dropdown-item>
        </template>
      </b-dropdown>

      <b-button
        target="_blank"
        class="wit-profiles-filter__filter-button"
      >
        <div class="wit-fle wit-color--muted">
          <i class="mdi mdi-sort-ascending mdi-20px" />
          <!--          <i class="mdi mdi-sort-descending mdi-20px" />-->
        </div>
      </b-button>
    </div>
  </div>
</template>

<script>
import { isEqual } from 'lodash'
import { getFiltersFromRoute, getObjectsDiff } from '@/utils/index.js'

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
                this.$router.replace({ path: this.$route.path, query: changedFilters })
            }
        },

        $route: {
            deep: true,
            handler () {
                this.$emit('filtersChanged', getFiltersFromRoute(this.$route, this.defaultFilters))
            }
        }
    },

    methods: {
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
.wit-profiles-filter__input {
    flex: 0 1 300px;
}

.wit-profiles-filter__sort-button {
    background-color: rgb(46, 54, 72);
    border: 1px solid rgb(54, 57, 76);
    border-radius: var(--offset-xxs);
    color: var(--body-color);
}

.wit-profiles-filter__filter-button {
    background-color: rgb(46, 54, 72);
    border: 1px solid rgb(54, 57, 76);
    border-radius: var(--offset-xxs);
    cursor: pointer;
}

.wit-profiles-filter__filter-icon {
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

.wit-profiles-filter__filter-popup {
    padding: var(--offset-xs) var(--offset-md);
    min-width: 460px;

    @media (max-width: 850px) {
        min-width: 0;
    }
}
</style>
