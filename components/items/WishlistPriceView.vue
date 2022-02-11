<template>
  <div class="wit-flex wit-flex--center wishlist-price">
    <i class="mdi mdi-24px mdi-heart wit-color--danger" />
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
$size: #{var(--offset-lg)};

.wishlist-price {
    width: $size;
    height: $size;
    z-index: 0;
    position: relative;
    margin: 0 auto;

    &::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 1px;
        border-radius: 4px;
        background: linear-gradient(to right, var(--item-whimsical), var(--item-rare), /*var(--item-uncommon), var(--item-common),*/ var(--item-very-rare));
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
}

//.white-grad {
//    color: #313149;
//    padding: 10px;
//    display: inline-block;
//    margin: 75px 0;
//    position:relative;
//    z-index:0;
//}
//.white-grad:before {
//
//}

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
