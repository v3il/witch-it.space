<template>
  <div>
    <div class="wit-offset-bottom--xs wit-flex wit-flex--align-center wit-flex--justify-between">
      <div class="wit-flex wit-flex--align-baseline">
        <h3>
          {{ $t('Items_Filters_Slots') }}
        </h3>

        <p v-if="!isAllSlotsSelected" class="wit-color--muted wit-offset-left--xs">
          ({{ selectedSlotsLength }}/{{ $options.slots.length }})
        </p>
      </div>

      <b-button type="is-ghost" size="is-small" @click="$emit('reset')">
        <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
      </b-button>
    </div>

    <ToggleList
      :selected-items="selectedSlots"
      :items="$options.slots"
      class="wis-slots-selector__slots-list"
      @update="$emit('update', $event)"
    />
  </div>
</template>

<script>
import { slotsManager } from '@/shared/index.js'
import ToggleList from '@/components/basic/ToggleList.vue'

export default {
    name: 'EventsSelector',

    slots: slotsManager.getAll(),

    components: {
        ToggleList
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
        }
    }
}
</script>

<style lang="scss" scoped>
.wis-slots-selector__slots-list {
    height: 145px;
}
</style>
