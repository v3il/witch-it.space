<template>
  <div class="wit-profiles-filter wit-flex--justify-between wit-flex">
    <b-input
      class="wit-offset-right--xs wit-profiles-filter__input"
      :value="filtersData.query"
      maxlength="20"
      :placeholder="$t('Profiles_SearchByUsername')"
      custom-class="wit-transition"
      :has-counter="false"
      icon-right="close"
      icon-right-clickable
      @input="onQueryChange"
      @icon-right-click="clearQuery"
    />

    <b-dropdown
      animation="fade150"
      class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs wit-profiles-filter__filter-button"
      position="is-bottom-left"
    >
      <template #trigger>
        <b-icon icon="filter" class="wit-profiles-filter__filter-icon" :class="{'with-indicator': filtersData.isSteamGuarded}" />
      </template>

      <div class="wit-profiles-filter__filter-popup">
        <b-field :label="$t('Profiles_SteamGuardedOnly')">
          <b-switch :value="filtersData.isSteamGuarded" @input="onIsSteamGuardedChange">
            {{ filtersData.isSteamGuarded ? $t('Yes') : $t('No') }}
          </b-switch>
        </b-field>
      </div>
    </b-dropdown>
  </div>
</template>

<script>
export default {
    name: 'ProfilesFilter',

    props: {
        filtersData: {
            required: true,
            type: Object
        }
    },

    methods: {
        onQueryChange (query) {
            this.updateFilters({ query })
        },

        onIsSteamGuardedChange (isSteamGuarded) {
            this.updateFilters({ isSteamGuarded })
        },

        clearQuery () {
            this.updateFilters({ query: '' })
        },

        updateFilters (updatedFilters) {
            this.$emit('change', {
                ...this.filtersData,
                ...updatedFilters
            })
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profiles-filter__input {
    flex: 0 1 300px;
}

.wit-profiles-filter__filter-button {
    background-color: rgb(46, 54, 72);
    border: 1px solid rgb(54, 57, 76);
    border-radius: 4px;
    cursor: pointer;
}

.wit-profiles-filter__filter-icon {
    color: #dbdbdb;
    height: 100%;
    width: 32px;

    &.with-indicator {
        position: relative;

        &::before {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
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
    padding: 8px 24px;
    min-width: 400px;
}
</style>
