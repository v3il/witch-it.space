<template>
  <div class="wit-flex">
    <ItemView :item="wishlistItem.item" :is-title-shown="false" style="max-width: 75px;" class="wit-offset-right--xs" />
    <div>
      <p class="wit-offset-bottom--xs wit-font-size--sm">
        {{ wishlistItem.item.name }}
      </p>
      <ItemTags :item="wishlistItem.item" only-primary class="wit-offset-bottom--xs" />
      <!--      <ItemPriceEditor :wishlist-item="wishlistItem" />-->

      <ItemPrice :price="wishlistItem.prices[0]" class="wit-offset-bottom--xs" />
      <ItemPrice :price="wishlistItem.prices[1]" class="wit-offset-bottom--xs" />
    </div>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'
import ItemTags from '@/components/items/ItemTags.vue'
import ItemPriceEditor from '@/components/items/ItemPriceEditor.vue'
import ItemPrice from '@/components/items/ItemPrice.vue'

export default {
    name: 'WishlistSelectedItem',

    components: {
        ItemView,
        ItemTags,
        // ItemPriceEditor,
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

<style scoped>

</style>
