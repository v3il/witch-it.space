<template>
  <div class="wit-price-editor wit-flex wit-flex--align-center1 wit-flex--column">
    <PriceTypeSelector class="wit-offset-right--sm1 wit-offset-bottom--xs wit-flex__item--grow" />

    <div class="wit-flex wit-flex--align-center">
      <div class="wit-flex wit-flex--align-center">
        <!--        <p class="wit-offset-right&#45;&#45;xs">-->
        <!--          (-->
        <!--        </p>-->

        <PricePart />
        <span class="wit-block wit-offset-left--xs wit-offset-right--xs">&times;</span>
        <NumericInput :value="4" style="width: 60px;" />
        <!--        <p class="wit-offset-left&#45;&#45;xs">-->
        <!--          )-->
        <!--        </p>-->
      </div>

      <span class="wit-block wit-offset-left--sm wit-offset-right--sm">+</span>

      <div class="wit-flex wit-flex--align-center">
        <!--        <p class="wit-offset-right&#45;&#45;xs">-->
        <!--          (-->
        <!--        </p>-->
        <PricePart />
        <span class="wit-block wit-offset-left--xs wit-offset-right--xs">&times;</span>
        <NumericInput :value="4" style="width: 60px;" />

        <!--        <p class="wit-offset-left&#45;&#45;xs">-->
        <!--          )-->
        <!--        </p>-->
      </div>
    </div>
  </div>
</template>

<script>
import PriceTypeSelector from '@/components/price/PriceTypeSelector.vue'
import PricePart from '@/components/price/PricePart.vue'
import NumericInput from '@/components/basic/NumericInput.vue'

export default {
    name: 'PriceEditor',

    components: {
        PriceTypeSelector,
        PricePart,
        NumericInput
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
