<template>
  <div class="wit-profiles-filter wit-flex--justify-end wit-flex">
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
        <i class="mdi mdi-filter mdi-20px wit-profiles-filter__filter-icon wit-flex wit-flex--center" :class="{ 'with-indicator': hasChanges }" />
      </template>

      <div class="wit-profiles-filter__filter-popup">
        <b-field :label="$t('Profiles_SteamGuardedOnly')">
          <b-switch :value="filtersData.isSteamGuarded" @input="onIsSteamGuardedChange">
            {{ filtersData.isSteamGuarded ? $t('Yes') : $t('No') }}
          </b-switch>
        </b-field>

        <div class="wit-padding-top--sm wit-flex wit-flex--justify-end" style="border-top: 1px solid #36394c;">
          <b-button type="is-danger" size="is-small1" class="wis-user-view__stat-button">
            Clear
          </b-button>
        </div>
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
        },

        hasChanges: {
            required: true,
            type: Boolean
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
    flex: 0 1 350px;
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
