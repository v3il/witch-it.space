<template>
  <Popup ref="popup" :popup-title="popupTitle" :popup-id="$options.popupId" @beforeOpen="beforeOpen">
    <p class="wit-offset-bottom--xs">
      {{ $t('PriceWillBeAppliedTo', [entities.length]) }}
    </p>

    <PriceEditor
      v-for="price in prices"
      :key="price.id"
      :price="price"
      :is-removable="prices.length > 1"
      class="wit-price-editor wit-block--full-width"
      @priceRemoved="removePrice"
      @priceAdded="addPrice"
    />

    <template #controlsRight>
      <b-button type="is-primary" class="wit-color--white" @click="onSave">
        {{ $t('Save') }}
      </b-button>
    </template>
  </Popup>
</template>

<script>
import { mapActions } from 'vuex'
import Popup from '@/components/basic/popup/Popup.vue'
import PriceEditor from '@/components/price/PriceEditor.vue'
import { Price } from '@/domain/models/Price'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'
import { StoreModules } from '@/store/index.js'

export default {
    name: 'EditOfferPopup',

    popupId: PopupNames.MANAGE_PRICES,

    components: {
        Popup,
        PriceEditor
    },

    data () {
        return {
            prices: [],
            entities: [],
            existingItems: true
        }
    },

    computed: {
        popupTitle () {
            return this.existingItems ? this.$t('EditOffers') : this.$t('AddOffers')
        }
    },

    methods: {
        ...mapActions(StoreModules.WISHLIST, {
            createOffers: 'createOffers',
            setMassPrices: 'setMassPrices'
        }),

        beforeOpen ({ entities, existingItems }) {
            this.entities = entities
            this.existingItems = existingItems
            this.prices = [Price.getDefault()]
        },

        close () {
            this.$refs.popup.hide()
        },

        addPrice () {
            this.prices.push(Price.getDefault())
        },

        removePrice (priceToRemove) {
            this.prices = this.prices.filter(price => price !== priceToRemove)
        },

        onSave () {
            this.existingItems ? this.saveExistingOffer() : this.saveNewOffer()
        },

        async saveNewOffer () {
            const { created, error } = await this.createOffers({ items: this.entities, prices: this.prices })

            if (error) {
                return this.$showError(error)
            }

            this.close()
            this.$showSuccess(this.$t('OffersCreated', [created]))
        },

        async saveExistingOffer () {
            const { created, error } = await this.setMassPrices({
                offers: this.entities,
                prices: this.prices
            })

            if (error) {
                return this.$showError(error)
            }

            this.close()
            this.$showSuccess(this.$t('OffersUpdated', [created]))
        }
    }
}
</script>
