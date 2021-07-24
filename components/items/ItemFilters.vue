<template>
  <Card class="wit-profiles-filter">
    <div class="wit-flex wit-flex--wrap wit-profiles-filter__container">
      <div class="wit-profiles-filter__input-container wit-block--full-width">
        <b-input
          :value="filtersData.query"
          maxlength="20"
          :placeholder="$t('Profiles_SearchByUsername')"
          custom-class="wit-transition wit-block--full-width"
          :has-counter="false"
          icon-right="close"
          icon-right-clickable
          @input="onQueryChange"
          @icon-right-click="clearQuery"
        />
      </div>

      <b-dropdown
        :value="filtersData.rarities"
        multiple
        aria-role="list"
        @input="onRaritiesChange"
      >
        <template #trigger>
          <b-button
            type="is-primary"
            icon-right="menu-down"
          >
            {{ filtersData.rarities }}
          </b-button>
        </template>

        <b-dropdown-item v-for="rarity in $options.rarities" :key="rarity.value" :value="rarity.value">
          <span>{{ rarity.label }}</span>
        </b-dropdown-item>
      </b-dropdown>

      <b-dropdown
        :value="filtersData.events"
        multiple
        aria-role="list"
        @input="onEventsChange"
      >
        <template #trigger>
          <b-button
            type="is-primary"
            icon-right="menu-down"
          >
            {{ filtersData.events }}
          </b-button>
        </template>

        <b-dropdown-item v-for="event in $options.events" :key="event.value" :value="event.value">
          <span>{{ event.label }}</span>
        </b-dropdown-item>
      </b-dropdown>

      <b-switch :value="filtersData.isSteamGuarded" @input="onIsSteamGuardedChange">
        {{ $t('Profiles_SteamGuardedOnly') }}
      </b-switch>
    </div>
  </Card>
</template>

<script>
import { eventsManager, raritiesManager } from '@/shared'

export default {
    name: 'ProfilesFilter',

    rarities: raritiesManager.getAll(),
    events: eventsManager.getAll(),

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

        onRaritiesChange (rarities) {
            this.updateFilters({ rarities })
        },

        onEventsChange (events) {
            this.updateFilters({ events })
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
.wit-profiles-filter {
    //max-width: 800px;
}

.wit-profiles-filter__input-container {
    max-width: 350px;
    margin-right: var(--offset-md);
}

@media screen and (max-width: 850px) {
    .wit-profiles-filter__container {
        flex-direction: column;
    }

    .wit-profiles-filter__input-container {
        max-width: none;
        margin-bottom: var(--offset-sm);
        margin-right: 0;
    }
}

</style>
