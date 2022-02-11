<template>
  <div class="wit-flex wit-flex--center any-price wiz-border--items">
    <i class="mdi mdi-20px mdi-cloud-question wit-color--Y400" />
  </div>
</template>

<script>
export default {
    name: 'AnyPriceView',

    props: {
        price: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
$size: #{var(--offset-lg)};

.any-price {
    width: $size;
    height: $size;
    margin: 0 auto;
}
</style>
