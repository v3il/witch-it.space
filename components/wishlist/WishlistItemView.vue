<template>
  <div>
    <ItemView :item="item" :item-max-width="50">
      <template #sidebar>
        <div class="wit-paddings--xs">
          <ItemPrice v-for="price in wishlistItem.prices" :key="price.id" :price="price" class="wit-offset-bottom--xs" />
        </div>
      </template>
    </ItemView>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'
import ItemPrice from '@/components/items/ItemPrice'

export default {
    name: 'WishlistItemView',

    components: {
        ItemView,
        ItemPrice
    },

    props: {
        wishlistItem: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        item: {}
    }),

    created () {
        this.item = this.$itemsService.getById(this.wishlistItem.itemId)

        console.log(this.item)
    }
}
</script>

<style scoped>

</style>
