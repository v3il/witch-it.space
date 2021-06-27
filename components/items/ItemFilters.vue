<template>
  <Card class="wit-profiles-filter">
    <div class="wit-flex wit-flex--wrap wit-profiles-filter__container">
      <div class="wit-profiles-filter__input-container wit-block--full-width wit-offset-bottom--xs">
        <b-input
          :value="filtersData.query"
          maxlength="20"
          :placeholder="$t('Items_Filters_SearchPlaceholder')"
          custom-class="wit-transition wit-block--full-width"
          :has-counter="false"
          icon-right="close"
          icon-right-clickable
          @input="onQueryChange"
          @icon-right-click="clearQuery"
        />
      </div>

      <div class="wit-flex wit-flex--wrap">
        <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
          <b-dropdown
            :value="filtersData.rarities"
            :mobile-modal="false"
            multiple
            aria-role="list"
            @input="onRaritiesChange"
          >
            <template #trigger>
              <b-button
                type="is-primary"
                icon-right="menu-down"
              >
                <div v-if="filtersData.rarities.length" class="wit-flex wit-flex--align-center">
                  <p class="wit-offset-right--xs wit-font-size--xxs">
                    {{ $t('Items_Filters_Rarity') }}:
                  </p>
                  <div v-for="rarity in filtersData.rarities" :key="rarity" class="wit-rarity-indicator wit-offset-right--xxs" :class="`wit-rarity-indicator--${rarity}`" />
                </div>

                <span v-else>
                  {{ $t('Items_Filters_AnyRarity') }}
                </span>
              </b-button>
            </template>

            <b-dropdown-item v-for="rarity in $options.rarities" :key="rarity.value" :value="rarity.value">
              <div class="wit-flex wit-flex--align-center">
                <div class="wit-rarity-indicator wit-offset-right--xs" :class="`wit-rarity-indicator--${rarity.value}`" />
                <span>{{ rarity.label }}</span>
              </div>
            </b-dropdown-item>
          </b-dropdown>

          <b-button type="is-ghost" size="is-small" @click="resetFilter('rarities')">
            <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
          </b-button>
        </div>

        <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
          <b-dropdown
            :value="filtersData.events"
            :mobile-modal="false"
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
                <div v-if="filtersData.events.length" class="wit-flex wit-flex--align-center">
                  <p class="wit-offset-right--xs wit-font-size--xxs">
                    {{ $t('Items_Filters_EventsSelected', [filtersData.events.length]) }}
                  </p>
                </div>

                <span v-else>
                  {{ $t('Items_Filters_AnyEvent') }}
                </span>
              </b-button>
            </template>

            <b-dropdown-item v-for="event in $options.events" :key="event.value" :value="event.value">
              <span>{{ event.label }}</span>
            </b-dropdown-item>
          </b-dropdown>

          <b-button type="is-ghost" size="is-small" @click="resetFilter('events')">
            <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
          </b-button>
        </div>

        <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
          <b-dropdown
            :value="filtersData.slots"
            :mobile-modal="false"
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
                <div v-if="filtersData.slots.length" class="wit-flex wit-flex--align-center">
                  <p class="wit-offset-right--xs wit-font-size--xxs">
                    {{ $t('Items_Filters_SlotsSelected', [filtersData.slots.length]) }}
                  </p>
                </div>

                <span v-else>
                  {{ $t('Items_Filters_AnySlot') }}
                </span>
              </b-button>
            </template>

            <b-dropdown-item v-for="slot in $options.slots" :key="slot.value" :value="slot.value">
              <span>{{ slot.label }}</span>
            </b-dropdown-item>
          </b-dropdown>

          <b-button type="is-ghost" size="is-small" @click="resetFilter('slots')">
            <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
          </b-button>
        </div>
      </div>

      <div class="wit-flex wit-flex--wrap">
        <b-switch :value="filtersData.isOnlyTradeable" class="wit-offset-right--sm wit-offset-bottom--xs" @input="onIsOnlyTradeableChange">
          {{ $t('Items_Filters_OnlyTradeable') }}
        </b-switch>

        <b-switch :value="filtersData.isOnlyOwned" class=" wit-offset-bottom--xs" @input="onIsOnlyOwnedChange">
          {{ $t('Items_Filters_OnlyOwned') }}
        </b-switch>
      </div>
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
        },

        resetFilter (filterProp) {
            this.$emit('reset', filterProp)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profiles-filter {
    //max-width: 800px;
}

.wit-rarity-indicator {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;

    &--whimsical { background-color: var(--item-whimsical); }
    &--veryrare { background-color: var(--item-very-rare); }
    &--rare { background-color: var(--item-rare); }
    &--uncommon { background-color: var(--item-uncommon); }
    &--common { background-color: var(--item-common); }
    &--unlock { background-color: var(--item-unlock); }
    &--promo { background-color: var(--item-promo); }
    &--eventrarity { background-color: var(--item-event); }
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
