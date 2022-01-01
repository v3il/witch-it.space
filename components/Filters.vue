<template>
  <div class="wit-profiles-filter wit-flex--justify-between wit-flex">
    <b-input
      class="wit-offset-right--xs wit-profiles-filter__input"
      :value="filters.query"
      maxlength="20"
      :placeholder="$t('Profiles_SearchByUsername')"
      custom-class="wit-transition"
      :has-counter="false"
      icon-right="close"
      icon-right-clickable
      @input="update({ query: $event })"
      @icon-right-click="clearQuery"
    />

    {{ filters }}
    {{ defaultFilters }}

    <div>
      <b-dropdown
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs wit-profiles-filter__sort-dropdown"
        position="is-bottom-left"
      >
        <template #trigger>
          <b-button icon-right="menu-down" class="wit-flex wit-flex--center wit-profiles-filter__sort-button">
            Sort by
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

        <slot :filters="filters" :update="update" />
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { isEqual } from 'lodash'
import { getObjectsDiff } from '@/utils/index.js'

export default {
    name: 'Filters',

    props: {
        // filtersData: {
        //     required: true,
        //     type: Object
        // },
        //
        // hasChanges: {
        //     required: true,
        //     type: Boolean
        // },

        filters: {
            required: true,
            type: Object
        }
    },

    data () {
        return {
            // defaultFilters: {...this.filters}
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
                const routeFilters = this.getFiltersFromRoute()

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
                // eslint-disable-next-line vue/no-mutating-props
                this.filters = this.getFiltersFromRoute()
            }
        }
    },

    created () {
        this.defaultFilters = { ...this.filters }
        // eslint-disable-next-line vue/no-mutating-props
        this.filters = this.getFiltersFromRoute()
    },

    methods: {
        // onQueryChange (query) {
        //     this.update({ query })
        // },
        //
        // onIsSteamGuardedChange (isSteamGuarded) {
        //     this.update({ isSteamGuarded })
        // },

        // clearQuery () {
        //     this.update({ query: '' })
        // },

        update (updatedFilters) {
            this.$emit('change', {
                ...this.filtersData,
                ...updatedFilters
            })
        },

        getFiltersFromRoute () {
            const { query: params } = this.$route

            return {
                query: params.query ?? this.defaultFilters.query,
                isSteamGuarded: params.isSteamGuarded === 'true' ?? this.defaultFilters.isSteamGuarded
            }
        },

        resetFilter (filterProp) {
            // eslint-disable-next-line vue/no-mutating-props
            this.filters[filterProp] = this.defaultFilters[filterProp]
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
