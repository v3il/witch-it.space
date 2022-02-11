<template>
  <div class="wit-flex wit-flex--center wishlist-price wiz-border--items">
    <i class="mdi mdi-20px mdi-heart wit-color--danger" />
  </div>
</template>

<script>
export default {
    name: 'WishlistPriceView',

    props: {
        price: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
$size: 32px;

.wishlist-price {
    width: $size;
    height: $size;
    margin: 0 auto;
}
</style>
