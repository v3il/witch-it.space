<template>
  <div style="background-color: #2a3042;">
    <ItemView :item="item" :item-max-width="50">
      <template #sidebar>
        <div class="wit-aaa">
          <ItemPrice v-for="price in wishlistItem.prices" :key="price.id" :price="price" class="wit-offset-bottom--xs1 pv wit-paddings--xs" />
        </div>
      </template>
    </ItemView>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'
import ItemPrice from '@/components/items/ItemPrice'
// import Card from '@/components/Card'

export default {
    name: 'WishlistItemView',

    components: {
        ItemView,
        ItemPrice
        // Card
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
    .pv:not(:last-child) {
        border-bottom: 1px solid #36394c;
    }

    .wit-aaa {
        padding: 0 8px;
    }
</style>
