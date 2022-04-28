<template>
  <div>
    <div class="wit-offset-bottom--xs wit-flex wit-flex--align-center wit-flex--justify-between">
      <div class="wit-flex wit-flex--align-baseline">
        <h3>
          {{ $t('Items_Filters_Events') }}
        </h3>

        <p v-if="!isAllEventsSelected" class="wit-color--muted wit-offset-left--xs">
          ({{ selectedEventsLength }}/{{ $options.events.length }})
        </p>
      </div>

      <b-button type="is-ghost" size="is-small" @click="$emit('reset')">
        <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
      </b-button>
    </div>

    <ToggleList
      :selected-items="selectedEvents"
      :items="$options.events"
      class="wis-events-selector__events-list"
      @update="$emit('update', $event)"
    />
  </div>
</template>

<script>
import { eventsManager } from '@/shared/index.js'
import ToggleList from '@/components/basic/ToggleList.vue'

export default {
    name: 'EventsSelector',

    events: eventsManager.getAll(),

    components: {
        ToggleList
    },

    props: {
        selectedEvents: {
            required: true,
            type: Array
        }
    },

    computed: {
        selectedEventsLength () {
            return this.selectedEvents.length > 0 ? this.selectedEvents.length : this.$options.events.length
        },

        isAllEventsSelected () {
            return this.selectedEventsLength === this.$options.events.length
        }
    }
}
</script>

<style lang="scss" scoped>
.wis-events-selector__events-list {
    height: 145px;
}
</style>
