<template>
  <Popup ref="editOfferPopup" popup-title="Edit offer" @popupClosed="$emit('cancelChanges')">
    <WishlistOfferEditor v-if="offer" :offer="offer" />

    <template #controlsLeft>
      <b-button type="is-danger" @click="$emit('deleteOffer', offer)">
        Remove offer
      </b-button>
    </template>

    <template #controlsRight>
      <b-button type="is-primary" class="wit-color--white" @click="$emit('saveChanges')">
        {{ $t('Save') }}
      </b-button>
    </template>
  </Popup>
</template>

<script>
import Popup from '@/components/basic/popup/Popup.vue'
import WishlistOfferEditor from '@/components/wishlist/WishlistOfferEditor.vue'

export default {
    name: 'EditOfferPopup',

    components: {
        Popup,
        WishlistOfferEditor
    },

    props: {
        // eslint-disable-next-line vue/require-prop-types
        offer: {
            validate: prop => typeof prop === 'object' || prop === null,
            required: true
        }
    },

    methods: {
        open () {
            this.$refs.editOfferPopup.show()
        },

        close () {
            this.$refs.editOfferPopup.hide()
        }
    }
}
</script>
