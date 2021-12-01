<template>
  <div>
    <ItemView :item="item" />
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'

export default {
    name: 'WishlistItemView',

    components: {
        ItemView
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
