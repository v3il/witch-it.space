<template>
  <ItemView
    :item="offerModel.item"
    :is-selected="isEditing"
    @clicked="$emit('click', offerModel)"
    @shiftClick="$emit('shiftClick')"
  >
    <slot />
  </ItemView>
</template>

<script>
import ItemView from '@/components/items/ItemView'

export default {
    name: 'WishlistOfferView',

    components: {
        ItemView
    },

    props: {
        offerModel: {
            type: Object,
            required: true
        },

        isEditing: {
            type: Boolean,
            required: true
        }
    }
}
</script>
