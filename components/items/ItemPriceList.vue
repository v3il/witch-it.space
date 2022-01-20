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
.wit-item-price:not(:last-child) {
    margin-bottom: var(--offset-xs);
}
</style>
