<template>
  <ItemView
    :item="offerModel.item"
    @clicked="$emit('click', offerModel)"
    @shiftClick="$emit('shiftClick')"
  >
    <SelectedItemOverlay v-if="isEditing" />
    <slot />
  </ItemView>
</template>

<script>
import ItemView from '@/components/items/ItemView'
import SelectedItemOverlay from '@/components/items/SelectedItemOverlay.vue'

export default {
    name: 'WishlistOfferView',

    components: {
        ItemView,
        SelectedItemOverlay
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
