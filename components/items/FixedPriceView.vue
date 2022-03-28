<template>
  <div class="wit-flex wit-flex--center">
    <template v-if="parts[0]">
      <FixedPricePart :count="parts[0].count" :item="parts[0].item" :is-single-part="!hasTwoItems" />
    </template>

    <template v-if="hasTwoItems">
      <span class="wit-offset-right--xxs wit-offset-left--xxs">+</span>
      <FixedPricePart :count="parts[1].count" :item="parts[1].item" :is-single-part="!hasTwoItems" reversed />
    </template>
  </div>
</template>

<script>
import FixedPricePart from '@/components/items/FixedPricePart.vue'

export default {
    name: 'FixedPriceView',

    components: {
        FixedPricePart
    },

    props: {
        price: {
            type: Object,
            required: true
        }
    },

    computed: {
        hasTwoItems () {
            return this.parts.length === 2
        },

        parts () {
            const parts = []
            const item1 = this.$itemsService.getById(this.price.itemId)
            const item2 = this.$itemsService.getById(this.price.itemId2)

            if (item1) {
                parts.push({
                    item: item1,
                    count: this.price.itemCount
                })
            }

            if (item2) {
                parts.push({
                    item: item2,
                    count: this.price.itemCount2
                })
            }

            return parts
        }
    }
}
</script>
