<template>
  <div>
    <div class="wit-offset-bottom--xs wit-flex wit-flex--align-center wit-flex--justify-between wit-block--full-width">
      <h3>{{ $t('SortedBy') }}</h3>

      <b-button type="is-ghost" size="is-small" @click="$emit('resetSorts')">
        <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
      </b-button>
    </div>

    <div class="wit-flex wit-flex--align-center">
      <b-select
        expanded
        class="wit-flex__item--grow wit-offset-right--xs"
        :value="sorts.sortBy"
        @input="updateOrderBy"
      >
        <option v-for="sort in availableSorts" :key="sort.value" :value="sort.value">
          {{ $t(sort.label) }}
        </option>
      </b-select>

      <b-button class="wit-filter__order-button" @click="toggleOrder">
        <i class="mdi mdi-20px wit-color--muted" :class="iconClass" />
      </b-button>
    </div>
  </div>
</template>

<script>
import { SortOrders } from '@/shared/items/index.js'

export default {
    name: 'SortsSelector',

    props: {
        sorts: {
            required: true,
            type: Object
        },

        availableSorts: {
            required: true,
            type: Array
        }
    },

    computed: {
        isAscendingOrder () {
            return this.sorts.order === SortOrders.ASC
        },

        iconClass () {
            return this.isAscendingOrder ? 'mdi-sort-ascending' : 'mdi-sort-descending'
        }
    },

    methods: {
        updateOrderBy (orderBy) {
            this.$emit('updateOrderBy', orderBy)
        },

        toggleOrder () {
            this.$emit('toggleOrder')
        }
    }
}
</script>
