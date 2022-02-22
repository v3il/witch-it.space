<template>
  <div class="wit-flex wit-flex--center">
    <FixedPricePart :count="parts[0].count" :item="parts[0].item" :is-single-part="!hasTwoItems" />

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
            const item1 = this.$itemsService.getById(this.price.item1Id)
            const item2 = this.$itemsService.getById(this.price.item2Id)

            if (item1) {
                parts.push({
                    item: item1,
                    count: this.price.item1Count
                })
            }

            if (item2) {
                parts.push({
                    item: item2,
                    count: this.price.item2Count
                })
            }

            return parts
        }
    }
}
</script>
