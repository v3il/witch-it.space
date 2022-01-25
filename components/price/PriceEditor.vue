<template>
  <div class="wit-price-editor wit-flex wit-flex--align-center wit-flex--column1">
    <PriceTypeSelector class="wit-offset-right--md wit-offset-bottom--xs1 wit-flex__item--grow" />

    <!--    <div class="wit-flex wit-flex&#45;&#45;align-center">-->
    <div class="wit-flex wit-flex--align-center">
      <!--        <p class="wit-offset-right&#45;&#45;xs">-->
      <!--          (-->
      <!--        </p>-->

      <PricePart />
      <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
      <NumericInput :value="4" />
      <!--        <p class="wit-offset-left&#45;&#45;xs">-->
      <!--          )-->
      <!--        </p>-->
    </div>

    <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">+</span>

    <div class="wit-flex wit-flex--align-center">
      <!--        <p class="wit-offset-right&#45;&#45;xs">-->
      <!--          (-->
      <!--        </p>-->
      <PricePart />
      <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
      <NumericInput :value="4" />

      <!--        <p class="wit-offset-left&#45;&#45;xs">-->
      <!--          )-->
      <!--        </p>-->
    </div>
    <!--    </div>-->
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
