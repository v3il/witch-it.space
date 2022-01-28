<template>
  <b-select expanded style="height: 36px;" :value="price.priceType" class="" @input="$emit('change', $event)">
    <option value="any">
      {{ $t('PriceType_Any') }}
    </option>

    <option value="specific">
      {{ $t('PriceType_Specific') }}
    </option>

    <option value="wishlist">
      {{ $t('PriceType_Wishlist') }}
    </option>
  </b-select>
</template>

<script>

export default {
    name: 'PriceTypeSelector',

    props: {
        price: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
