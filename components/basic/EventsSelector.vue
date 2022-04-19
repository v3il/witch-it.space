<template>
  <div>
    <h3 class="wit-offset-bottom--xs wit-flex wit-flex--align-baseline">
      {{ $t('Items_Filters_Events') }}

      <p class="wit-color--muted wit-offset-left--xxs">
        ({{ selectedEventsLength }}/{{ $options.events.length }})
      </p>

      <b-button type="is-ghost" size="is-small" @click="$emit('reset')">
        <b-icon size="is-small" class="is-size-5" icon="undo-variant" />
      </b-button>
    </h3>

    <div class="wit-flex wit-flex--align-center">
      <Dropdown
        :mobile-modal="false"
        :hide-on-item-click="false"
        multiple
        position="is-bottom-left"
        scrollable
        :max-height="250"
        expanded
      >
        <template #trigger>
          <b-button type="is-primary" icon-right="menu-down" class="wit-events-button">
            <span v-if="isAllEventsSelected">
              {{ $t('Items_Filters_AnyEvent') }}
            </span>

            <span v-else>
              {{ selectedEventsLabels }}
            </span>
          </b-button>
        </template>

        <template #items>
          <DropdownItem
            v-for="event in $options.events"
            :key="event.value"
            :value="event.value"
            :class="{ active: isSelectedEvent(event) }"
            @click="toggleEvent(event)"
          >
            <span>{{ event.label }}</span>
          </DropdownItem>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from './dropdown/Dropdown.vue'
import DropdownItem from './dropdown/DropdownItem.vue'
import { eventsManager } from '@/shared/index.js'

export default {
    name: 'EventsSelector',

    events: eventsManager.getAll(),

    components: {
        Dropdown,
        DropdownItem
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
        },

        selectedEventsLabels () {
            return this.selectedEvents.map(eventId => eventsManager.find(eventId).label).join(', ')
        }
    },

    methods: {
        isSelectedEvent (event) {
            return this.selectedEvents.includes(event.value)
        },

        toggleEvent (event) {
            if (!this.isSelectedEvent(event)) {
                return this.$emit('update', [...this.selectedEvents, event.value])
            }

            this.$emit('update', this.selectedEvents.filter(eventValue => eventValue !== event.value))
        }
    }
}
</script>

<style scoped lang="scss">
.wit-events-button {
    max-width: 300px;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
}
</style>
