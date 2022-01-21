<template>
  <div class="wit-padding-left--xs wit-padding-right--xs">
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
    padding-bottom: var(--offset-xs);

    &:not(:first-child) {
        padding-top: var(--offset-xs);
    }

    &:not(:last-child) {
        border-bottom: var(--default-border);
    }
}
</style>
