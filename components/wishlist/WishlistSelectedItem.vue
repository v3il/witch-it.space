<template>
  <div class="wit-flex">
    <ItemView :item="wishlistItem.item" :is-title-shown="false" style="max-width: 75px;" class="wit-offset-right--xs" />
    <div>
      <p class="wit-offset-bottom--xs">
        {{ wishlistItem.item.name }}
      </p>
      <ItemTags :item="wishlistItem.item" />
    </div>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'
import ItemTags from '@/components/items/ItemTags.vue'

export default {
    name: 'WishlistSelectedItem',

    components: {
        ItemView,
        ItemTags
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
