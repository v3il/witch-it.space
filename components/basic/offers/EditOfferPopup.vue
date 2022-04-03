<template>
  <Popup ref="popup" :popup-title="popupTitle" :popup-id="$options.popupId" @beforeOpen="beforeOpen">
    <WishlistOfferEditor v-if="offer" :offer="offer" />

    <template #controlsLeft>
      <b-button v-if="!isNewOffer" type="is-danger" @click="onOfferRemove">
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
import { mapActions } from 'vuex'
import Popup from '@/components/basic/popup/Popup.vue'
import WishlistOfferEditor from '@/components/wishlist/WishlistOfferEditor.vue'
import { StoreModules } from '@/store/index.js'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'

export default {
    name: 'EditOfferPopup',

    popupId: PopupNames.MANAGE_OFFER,

    components: {
        Popup,
        WishlistOfferEditor
    },

    data: () => ({
        offer: null
    }),

    computed: {
        isNewOffer () {
            return this.offer?.isNew
        },

        popupTitle () {
            return this.isNewOffer ? 'Add Offer' : 'Edit Offer'
        }
    },

    methods: {
        beforeOpen ({ offer }) {
            this.offer = offer
        },

        ...mapActions(StoreModules.WISHLIST, [
            'removeOffers',
            'createOffers',
            'setMassPrices'
        ]),

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
