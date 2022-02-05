<template>
  <div class="wit-padding-left--xxs1 wit-padding-right--xxs1">
    <ItemPrice v-for="price in prices" :key="price.id" :price="price" class="wit-item-price" />
  </div>
</template>

<script>
import ItemPrice from '@/components/items/ItemPrice.vue'

export default {
    name: 'ItemPriceList',

    components: {
        ItemPrice
    },

    props: {
        prices: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.wit-item-price {
    padding: var(--offset-xxs) var(--offset-xxs);
    background-color: #3a445b;
    //border-radius: 4px;
    margin-bottom: 4px;

    //&:not(:first-child) {
    //    padding-top: var(--offset-xs);
    //}

    &:last-child {
        margin-bottom: 0;
        border-radius: 0 0 4px 4px;
    }
}
</style>
