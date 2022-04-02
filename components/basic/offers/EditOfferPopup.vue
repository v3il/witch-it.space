<template>
  <Popup ref="popup" :popup-title="popupTitle" @popupClosed="$emit('cancelChanges')">
    <WishlistOfferEditor v-if="offer" :offer="offer" />

    <template #controlsLeft>
      <b-button v-if="hasRemoveButton" type="is-danger" @click="onOfferRemove">
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

    computed: {
        popupTitle () {
            return this.offer?.isNew ? 'Add Offer' : 'Edit Offer'
        },

        hasRemoveButton () {
            return !this.offer?.isNew
        }
    },

    methods: {
        open () {
            this.$refs.popup.show()
        },

        close () {
            this.$refs.popup.hide()
        },

        onOfferRemove () {
            this.close()
            this.$emit('deleteOffer', this.offer)
        }
    }
}
</script>
