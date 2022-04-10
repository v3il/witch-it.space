<template>
  <div class="wit-block--full-width">
    <PriceEditor
      v-for="price in prices"
      :key="price.id"
      :price="price"
      :is-removable="prices.length > 1"
      @priceRemoved="removePrice"
      @priceAdded="addPrice"
    />
  </div>
</template>

<script>
import PriceEditor from '@/components/price/PriceEditor.vue'
import { Price } from '@/domain/models/index.js'

export default {
    name: 'PricesEditor',

    components: {
        PriceEditor
    },

    props: {
        prices: {
            required: true,
            type: Array
        }
    },

    methods: {
        addPrice () {
            this.emitEvent([...this.prices, Price.getDefault()])
        },

        removePrice (priceToRemove) {
            this.emitEvent(this.prices.filter(price => price !== priceToRemove))
        },

        emitEvent (prices) {
            this.$emit('update', prices)
        }
    }
}
</script>
