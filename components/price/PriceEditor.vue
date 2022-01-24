<template>
  <div class="wit-price-editor wit-flex wit-flex--align-center">
    <PriceTypeSelector class="wit-offset-right--sm" />
    <PricePart />
    <span class="wit-block wit-offset-left--xs wit-offset-right--xs">+</span>
    <PricePart />
  </div>
</template>

<script>
import PriceTypeSelector from '@/components/price/PriceTypeSelector.vue'
import PricePart from '@/components/price/PricePart.vue'

export default {
    name: 'PriceEditor',

    components: {
        PriceTypeSelector,
        PricePart
    },

    props: {
        price: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.wit-price-editor {
    padding: var(--offset-sm) 0;
}
</style>
