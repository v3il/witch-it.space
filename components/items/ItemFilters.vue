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
        scrollable
        :max-height="250"
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
        scrollable
        :max-height="250"
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

      <b-dropdown
        :value="filtersData.slots"
        multiple
        aria-role="list"
        scrollable
        :max-height="250"
        @input="onSlotsChange"
      >
        <template #trigger>
          <b-button
            type="is-primary"
            icon-right="menu-down"
          >
            {{ filtersData.slots }}
          </b-button>
        </template>

        <b-dropdown-item v-for="slot in $options.slots" :key="slot.value" :value="slot.value">
          <span>{{ slot.label }}</span>
        </b-dropdown-item>
      </b-dropdown>

      <b-switch :value="filtersData.isOnlyTradeable" @input="onIsOnlyTradeableChange">
        Only tradeable
      </b-switch>

      <b-switch :value="filtersData.isOnlyOwned" @input="onIsOnlyOwnedChange">
        Only owned
      </b-switch>
    </div>
  </Card>
</template>

<script>
import { eventsManager, raritiesManager, slotsManager } from '@/shared'

export default {
    name: 'ProfilesFilter',

    rarities: raritiesManager.getAll(),
    events: eventsManager.getAll(),
    slots: slotsManager.getAll(),

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

        onSlotsChange (slots) {
            this.updateFilters({ slots })
        },

        onIsOnlyTradeableChange (isOnlyTradeable) {
            this.updateFilters({ isOnlyTradeable })
        },

        onIsOnlyOwnedChange (isOnlyOwned) {
            this.updateFilters({ isOnlyOwned })
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
