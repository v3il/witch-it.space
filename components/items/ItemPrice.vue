<template>
  <div>
    {{ price }}
    <AnyPriceView v-if="price.isAnyPrice" :price="price" />
    <FixedPriceView v-if="price.isFixedPrice" :price="price" />
    <WishlistPriceView v-if="price.isWishlistPrice" :price="price" />
  </div>
</template>

<script>
import AnyPriceView from '@/components/items/AnyPriceView.vue'
import FixedPriceView from '@/components/items/FixedPriceView.vue'
import WishlistPriceView from '@/components/items/WishlistPriceView.vue'

export default {
    name: 'ItemPrice',

    components: {
        AnyPriceView,
        FixedPriceView,
        WishlistPriceView
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
$size: #{var(--offset-lg)};

.wit-price__counter {
    font-size: 11px;
    line-height: $size;
    font-weight: 500;
    min-width: 13px;
}

.wit-price__item {
    width: $size;
    height: $size;
}

.wit-price__plus {
    margin: 0 var(--offset-xxs);
}
</style>
