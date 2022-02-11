<template>
  <div class="wit-flex wit-flex--center">
    any
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

//.wit-price__counter {
//    font-size: 11px;
//    line-height: $size;
//    font-weight: 500;
//    min-width: 13px;
//}
//
//.wit-price__item {
//    width: $size;
//    height: $size;
//}
//
//.wit-price__plus {
//    margin: 0 var(--offset-xxs);
//}
</style>
