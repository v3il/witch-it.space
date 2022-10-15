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
    <p class="wit-offset-bottom--sm">
      {{ $t('PriceWillBeAppliedTo', [entities.length]) }}
    </p>

    <PricesEditor :prices="prices" @update="prices = $event" />
  </EditPopup>
</template>

<script>
import { mapActions } from 'vuex'
import PriceEditor from '@/components/price/PriceEditor.vue'
import { Price } from '@/domain/models/Price'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'
import { StoreModules } from '@/store/index.js'
import EditPopup from '@/components/basic/popup/EditPopup.vue'
import PricesEditor from '@/components/price/PricesEditor.vue'

export default {
    name: 'EditOfferPopup',

    popupId: PopupNames.MANAGE_PRICES,

    components: {
        EditPopup,
        PriceEditor,
        PricesEditor
    },

    data () {
        return {
            prices: [],
            entities: [],
            existingItems: true,
            isLoading: false
        }
    },

    computed: {
        popupTitle () {
            return this.existingItems ? this.$t('EditOffers') : this.$t('AddOffers')
        }
    },

    methods: {
        ...mapActions('manage', {
            createOffers: 'createOffers',
            setMassPrices: 'setMassPrices'
        }),

        beforeOpen ({ entities, existingItems }) {
            this.entities = entities
            this.existingItems = existingItems
            this.prices = [Price.getDefault()]
        },

        close () {
            this.$refs.popup.closePopup()
        },

        onSave () {
            this.existingItems ? this.saveExistingOffer() : this.saveNewOffer()
        },

        saveNewOffer () {
            this.isLoading = true
            this.entities.forEach(offer => offer.setPrices(this.prices))

            this.createOffers({ offers: this.entities })
                .then(({ createdOffersSize }) => {
                    this.close()
                    this.$showSuccess(this.$t('OffersCreated', [createdOffersSize]))
                })
                .catch(this.$showError)
                .finally(() => this.isLoading = false)
        },

        saveExistingOffer () {
            this.isLoading = true

            this.setMassPrices({ offers: this.entities, prices: this.prices })
                .then(({ updatedOffersSize }) => {
                    this.close()
                    this.$showSuccess(this.$t('OffersUpdated', [updatedOffersSize]))
                })
                .catch(this.$showError)
                .finally(() => this.isLoading = false)
        }
    }
}
</script>
