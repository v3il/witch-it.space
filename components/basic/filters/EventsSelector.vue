<template>
  <div>
    <div class="wit-offset-bottom--xxs wit-flex wit-flex--align-center wit-flex--justify-between">
      <div class="wit-flex wit-flex--align-baseline">
        <h3>
          {{ $t('Items_Filters_Events') }}
        </h3>

        <p v-if="!isAllEventsSelected" class="wit-color--muted wit-offset-left--xs">
          ({{ selectedEventsLength }}/{{ $options.events.length }})
        </p>
      </div>

      <div class="wit-flex wit-flex--align-center">
        <Dropdown
          :mobile-modal="false"
          :hide-on-item-click="false"
          multiple
          scrollable
          :max-height="250"
        >
          <template #trigger>
            <b-button type="is-ghost" size="is-small">
              <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="filter" />
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

        <b-button type="is-ghost" size="is-small" @click="$emit('reset')">
          <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
        </b-button>
      </div>
    </div>

    <b-taglist>
      <b-tag v-if="isAllEventsSelected" type="is-primary">
        {{ $t('Items_Filters_AnyEvent') }}
      </b-tag>

      <template v-else>
        <b-tag
          v-for="event in selectedEventsData"
          :key="event.value"
          closable
          type="is-primary"
          class="wit-background--primary"
          @close.stop="toggleEvent(event)"
        >
          {{ event.label }}
        </b-tag>
      </template>
    </b-taglist>
  </div>
</template>

<script>
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
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

        selectedEventsData () {
            return this.selectedEvents.map(eventId => eventsManager.find(eventId))
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
