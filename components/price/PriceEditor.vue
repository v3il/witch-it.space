<template>
  <div class="wit-price-editor wit-flex wit-flex--align-center wit-flex--column1">
    <PriceTypeSelector :price="price" class="wit-offset-right--sm wit-offset-bottom--xs1 wit-flex__item--grow" @change="onPriceTypeChange" />

    <template v-if="isSpecificPrice">
      <div class="wit-flex wit-flex--align-center">
        <PricePart />
        <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
        <NumericInput :value="4" />
      </div>

      <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">+</span>

      <div class="wit-flex wit-flex--align-center wit-offset-right--sm">
        <PricePart />
        <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
        <NumericInput :value="4" />
      </div>
    </template>

    <RemoveButton />
  </div>
</template>

<script>
import PriceTypeSelector from '@/components/price/PriceTypeSelector.vue'
import PricePart from '@/components/price/PricePart.vue'
import NumericInput from '@/components/basic/NumericInput.vue'
import RemoveButton from '@/components/basic/RemoveButton.vue'

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
        }
    },

    computed: {
        isSpecificPrice () {
            return this.price.priceType === 'specific'
        }
    },

    methods: {
        onPriceTypeChange (priceType) {
            this.$emit('priceTypeChanged', { price: this.price, priceType })
            console.log(priceType)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-price-editor {
    padding: var(--offset-xs) 0;
}
</style>
