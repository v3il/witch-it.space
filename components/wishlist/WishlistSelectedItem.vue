<template>
  <div class="wit-flex wit-flex--column wit-flex--align-start wit-block--full-width">
    <div>
      <div class="wit-flex">
        <ItemView :item="wishlistItem.item" :is-title-shown="false" style="max-width: 75px;" class="wit-offset-right--xs" />

        <div class="wit-flex wit-flex--column">
          <p class="wit-offset-bottom--xs wit-font-size--sm">
            {{ wishlistItem.item.name }}
          </p>

          <ItemTags :item="wishlistItem.item" only-primary class="wit-offset-bottom--xs11" />
        </div>
      </div>
    </div>
    <PriceEditor v-for="price in wishlistItem.prices" :key="price.id" :price="price" class="wit-price-editor wit-block--full-width" />
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'
import ItemTags from '@/components/items/ItemTags.vue'
import PriceEditor from '@/components/price/PriceEditor.vue'
import ItemPrice from '@/components/items/ItemPrice.vue'

export default {
    name: 'WishlistSelectedItem',

    components: {
        ItemView,
        ItemTags,
        PriceEditor,
        ItemPrice
    },

    props: {
        wishlistItem: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.wit-price-editor {
    &:not(:last-child) {
        border-bottom: var(--default-border);
    }
}
</style>
