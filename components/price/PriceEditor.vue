<template>
  <div class="wit-price-editor wit-flex wit-flex--align-center wit-flex--column1">
    <PriceTypeSelector :price="price" class="wit-offset-bottom--xs1 wit-flex__item--grow" />

    <template v-if="price.isFixedPrice">
      <div class="wit-flex wit-flex--align-center wit-offset-left--sm">
        <PricePart />
        <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
        <NumericInput :value="price.item1Count" />
      </div>

      <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">+</span>

      <div class="wit-flex wit-flex--align-center">
        <PricePart />
        <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
        <NumericInput :value="price.item2Count" />
      </div>
    </template>

    <RemoveButton v-if="isRemoveable" class="wit-offset-left--sm" @click="onPriceRemove" />
  </div>
</template>

<script>
import PriceTypeSelector from '@/components/price/PriceTypeSelector.vue'
import PricePart from '@/components/price/PricePart.vue'
import NumericInput from '@/components/basic/NumericInput.vue'
import RemoveButton from '@/components/basic/RemoveButton.vue'
import { PriceType } from '@/shared/items'

export default {
    name: 'PriceEditor',

    components: {
        PriceTypeSelector,
        PricePart,
        NumericInput,
        RemoveButton
    },

    props: {
        price: {
            type: Object,
            required: true
        },

        isRemoveable: {
            type: Boolean,
            required: true
        }
    },

    computed: {
        isSpecificPrice () {
            return this.price.priceType === PriceType.FIXED
        }
    },

    methods: {
        // onPriceTypeChange (priceType) {
        //     console.log(priceType)
        //
        //     // eslint-disable-next-line vue/no-mutating-props
        //     // this.price.price.priceType = (priceType)
        //     this.price.setPriceType(priceType)
        //     // this.$forceUpdate()
        //
        //     // this.$emit('priceTypeChanged', { price: this.price, priceType })
        // },

        onPriceRemove () {
            this.$emit('priceRemoved', { price: this.price })
        }
    }
}
</script>

<style scoped lang="scss">
.wit-price-editor {
    padding: var(--offset-xs) 0;
}
</style>
