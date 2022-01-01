<template>
  <div class="wit-profiles-filter wit-flex--justify-between wit-flex">
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

    <div class="wit-flex">
      <b-dropdown
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs wit-profiles-filter__sort-dropdown"
        position="is-bottom-left"
      >
        <template #trigger>
          <b-button icon-right="menu-down" class="wit-flex wit-flex--center wit-profiles-filter__sort-button">
            <span class="wit-color--muted">Sort by</span>
          </b-button>
        </template>

        <b-dropdown-item class="wit-transition--background">
          <nuxt-link to="/settings" class="wit-flex wit-flex--align-center wit-color--white">
            <b-icon size="is-small" class="is-size-5 wit-offset-right--xs" icon="cog-sync" />
            <span class="wit-inline-block username">{{ $t('Settings') }}</span>
          </nuxt-link>
        </b-dropdown-item>

        <b-dropdown-item class="wit-transition--background">
          <div class="wit-flex wit-flex--align-center wit-color--danger">
            <b-icon size="is-small" class="is-size-5 wit-offset-right--xs" icon="logout-variant" />
            <span class="wit-inline-block">{{ $t('Logout') }}</span>
          </div>
        </b-dropdown-item>
      </b-dropdown>

      <b-dropdown
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs wit-profiles-filter__filter-button"
        position="is-bottom-left"
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
                this.$emit('change', getFiltersFromRoute(this.$route, this.defaultFilters))
            }
        }
    },

    methods: {
        update (updatedFilters) {
            this.$emit('change', {
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
    flex: 0 1 350px;
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
