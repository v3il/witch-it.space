<template>
  <div>
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
    padding: var(--offset-xxs);
    background-color: var(--price-bg);

    &:not(:last-child) {
        margin-bottom: 2px;
    }

    &:nth-child(2) {
        border-radius: 0 0 var(--offset-xxs) var(--offset-xxs);
    }
}
</style>
