<template>
  <b-select expanded :value="price.priceType" class="wit-price-type-selector" @input="onPriceTypeChange">
    <option :value="$options.PriceType.ANY">
      {{ $t('PriceType_Any') }}
    </option>

    <option :value="$options.PriceType.FIXED">
      {{ $t('PriceType_Fixed') }}
    </option>

    <option :value="$options.PriceType.WISHLIST">
      {{ $t('PriceType_Wishlist') }}
    </option>
  </b-select>
</template>

<script>
import { PriceType } from '@/shared/items'

export default {
    name: 'PriceTypeSelector',

    PriceType,

    props: {
        price: {
            type: Object,
            required: true
        }
    },

    methods: {
        onPriceTypeChange (priceType) {
            this.price.setPriceType(priceType)
        }
    }
}
</script>

<style scoped>
.wit-price-type-selector {
    height: 40px;
}
</style>
