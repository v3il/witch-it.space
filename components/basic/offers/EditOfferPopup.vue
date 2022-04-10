<template>
  <EditPopup
    ref="popup"
    :popup-title="popupTitle"
    :popup-id="$options.popupId"
    :is-loading="isLoading"
    :submit-button-title="$t('Save')"
    @beforeOpen="beforeOpen"
    @save="onSave"
  >
    <WishlistOfferEditor v-if="offer" :offer="offer" />

    <template #controlsLeft>
      <b-button v-if="!isNewOffer" type="is-danger" @click="removeOffer">
        {{ $t('Delete') }}
      </b-button>
    </template>
  </EditPopup>
</template>

<script>
import { mapActions } from 'vuex'
import WishlistOfferEditor from '@/components/wishlist/WishlistOfferEditor.vue'
import { StoreModules } from '@/store/index.js'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'
import EditPopup from '@/components/basic/popup/EditPopup.vue'

export default {
    name: 'EditOfferPopup',

    popupId: PopupNames.MANAGE_OFFER,

    components: {
        EditPopup,
        WishlistOfferEditor
    },

    data: () => ({
        offer: null,
        isLoading: false
    }),

    computed: {
        isNewOffer () {
            return this.offer?.isNew
        },

        popupTitle () {
            return this.isNewOffer ? this.$t('AddOffer') : this.$t('EditOffer')
        }
    },

    methods: {
        ...mapActions(StoreModules.WISHLIST, {
            removeOffers: 'removeOffers',
            createOffers: 'createOffers',
            setMassPrices: 'setMassPrices'
        }),

        beforeOpen ({ offer }) {
            this.offer = offer
        },

        onSave () {
            this.isNewOffer ? this.saveNewOffer() : this.saveExistingOffer()
        },

        async saveNewOffer () {
            this.isLoading = true

            const item = this.offer.item
            const prices = this.offer.prices
            const { created, error } = await this.createOffers({ items: [item], prices })

            if (error) {
                this.$showError(error)
            } else {
                this.close()
                this.$showSuccess(this.$t('OffersCreated', [created]))
            }

            this.isLoading = false
        },

        async saveExistingOffer () {
            this.isLoading = true

            const { created, error } = await this.setMassPrices({
                offers: [this.offer],
                prices: this.offer.prices
            })

            if (error) {
                this.$showError(error)
            } else {
                this.close()
                this.$showSuccess(this.$t('OffersUpdated', [created]))
            }

            this.isLoading = false
        },

        async removeOffer () {
            this.isLoading = false

            const { error, removed } = await this.removeOffers(this.offer)

            if (error) {
                this.$showError(error)
            } else {
                this.close()
                this.$showSuccess(this.$t('OffersRemoved', [removed]))
            }

            this.isLoading = false
        },

        close () {
            this.$refs.popup.closePopup()
        }
    }
}
</script>
