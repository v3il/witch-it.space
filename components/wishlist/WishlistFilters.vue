<template>
  <Filters
    :filters="filters"
    :default-filters="defaultFilters"
    :default-sorts="defaultSorts"
    :sorts="sorts"
    :query-input-placeholder="$t('Items_SearchByItemName')"
    @filtersChanged="$emit('filtersChanged', $event)"
    @sortChanged="$emit('sortChanged', $event)"
  >
    <template #default="{ filterParams, update, reset }">
      <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
        <b-dropdown
          :value="filterParams.rarities"
          :mobile-modal="false"
          multiple
          aria-role="list"
          @input="update({ rarities: $event })"
        >
          <template #trigger>
            <b-button
              type="is-primary"
              icon-right="menu-down"
            >
              <div v-if="filterParams.rarities.length" class="wit-flex wit-flex--align-center">
                <p class="wit-offset-right--xs wit-font-size--xxs">
                  {{ $t('Items_Filters_Rarity') }}:
                </p>
                <div v-for="rarity in filterParams.rarities" :key="rarity" class="wit-rarity-indicator wit-offset-right--xxs" :class="`wit-rarity-indicator--${rarity}`" />
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

        <b-button type="is-ghost" size="is-small" @click="reset('rarities')">
          <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
        </b-button>
      </div>

      <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
        <b-dropdown
          :value="filterParams.events"
          :mobile-modal="false"
          multiple
          aria-role="list"
          scrollable
          :max-height="250"
          @input="update({ events: $event })"
        >
          <template #trigger>
            <b-button
              type="is-primary"
              icon-right="menu-down"
            >
              <div v-if="filterParams.events.length" class="wit-flex wit-flex--align-center">
                <p class="wit-offset-right--xs wit-font-size--xxs">
                  {{ $t('Items_Filters_EventsSelected', [filterParams.events.length]) }}
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

        <b-button type="is-ghost" size="is-small" @click="reset('events')">
          <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
        </b-button>
      </div>

      <div class="wit-flex wit-flex--align-center wit-offset-right--sm wit-offset-bottom--xs">
        <b-dropdown
          :value="filterParams.slots"
          :mobile-modal="false"
          multiple
          aria-role="list"
          scrollable
          :max-height="250"
          @input="update({ slots: $event })"
        >
          <template #trigger>
            <b-button
              type="is-primary"
              icon-right="menu-down"
            >
              <div v-if="filterParams.slots.length" class="wit-flex wit-flex--align-center">
                <p class="wit-offset-right--xs wit-font-size--xxs">
                  {{ $t('Items_Filters_SlotsSelected', [filterParams.slots.length]) }}
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

        <b-button type="is-ghost" size="is-small" @click="reset('slots')">
          <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
        </b-button>
      </div>

      <div>
        <b-switch :value="filterParams.hideRecipes" @input="update({ hideRecipes: $event })">
          {{ $t('Items_Filters_HideRecipes') }}
        </b-switch>
      </div>
    </template>
  </Filters>
</template>

<script>
import Filters from '@/components/basic/Filters.vue'
import { eventsManager, raritiesManager, slotsManager } from '@/shared/index.js'

export default {
    name: 'WishlistFilters',

    rarities: raritiesManager.getTradeable(),
    events: eventsManager.getAll(),
    slots: slotsManager.getAll(),

    components: {
        Filters
    },

    props: {
        filters: {
            required: true,
            type: Object
        },

        defaultFilters: {
            required: true,
            type: Object
        },

        sorts: {
            required: true,
            type: Object
        },

        defaultSorts: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped lang="scss">
//.wit-profiles-filter {
//    //max-width: 800px;
//}
//
//.wit-profiles-filter__input-container {
//    max-width: 350px;
//    margin-right: var(--offset-md);
//}
//
//@media screen and (max-width: 850px) {
//    .wit-profiles-filter__container {
//        flex-direction: column;
//    }
//
//    .wit-profiles-filter__input-container {
//        max-width: none;
//        margin-bottom: var(--offset-sm);
//        margin-right: 0;
//    }
//}

</style>
