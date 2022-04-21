<template>
  <div>
    <div class="wit-offset-bottom--xxs wit-flex wit-flex--align-center wit-flex--justify-between">
      <div class="wit-flex wit-flex--align-baseline">
        <h3 class="wit-font-size--xsplus">
          {{ $t('Items_Filters_Slots') }}
        </h3>

        <p v-if="!isAllSlotsSelected" class="wit-color--muted wit-offset-left--xs">
          ({{ selectedSlotsLength }}/{{ $options.slots.length }})
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
              v-for="slot in $options.slots"
              :key="slot.value"
              :value="slot.value"
              :class="{ active: isSelectedSlot(slot) }"
              @click="toggleSlot(slot)"
            >
              <span>{{ slot.label }}</span>
            </DropdownItem>
          </template>
        </Dropdown>

        <b-button type="is-ghost" size="is-small" @click="$emit('reset')">
          <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
        </b-button>
      </div>
    </div>

    <b-taglist>
      <b-tag v-if="isAllSlotsSelected" type="is-primary">
        {{ $t('Items_Filters_AnySlot') }}
      </b-tag>

      <template v-else>
        <b-tag
          v-for="slot in selectedSlotsData"
          :key="slot.value"
          closable
          type="is-primary"
          class="wit-background--primary"
          @close.stop="toggleSlot(slot)"
        >
          {{ slot.label }}
        </b-tag>
      </template>
    </b-taglist>
  </div>
</template>

<script>
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import { slotsManager } from '@/shared/index.js'

export default {
    name: 'EventsSelector',

    slots: slotsManager.getAll(),

    components: {
        Dropdown,
        DropdownItem
    },

    props: {
        selectedSlots: {
            required: true,
            type: Array
        }
    },

    computed: {
        selectedSlotsLength () {
            return this.selectedSlots.length > 0 ? this.selectedSlots.length : this.$options.slots.length
        },

        isAllSlotsSelected () {
            return this.selectedSlotsLength === this.$options.slots.length
        },

        selectedSlotsData () {
            return this.selectedSlots.map(slotId => slotsManager.find(slotId))
        }
    },

    methods: {
        isSelectedSlot (slot) {
            return this.selectedSlots.includes(slot.value)
        },

        toggleSlot (slot) {
            if (!this.isSelectedSlot(slot)) {
                return this.$emit('update', [...this.selectedSlots, slot.value])
            }

            this.$emit('update', this.selectedSlots.filter(slotValue => slotValue !== slot.value))
        }
    }
}
</script>
