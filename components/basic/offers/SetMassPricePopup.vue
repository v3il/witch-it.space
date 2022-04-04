<template>
  <Popup ref="popup" popup-title="Set Prices" :popup-id="$options.popupId" @beforeOpen="beforeOpen">
    <p class="wit-offset-bottom--xs">
      This prices will be applied to {{ entities.length }} offers
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
      <b-button type="is-primary" class="wit-color--white" @click="saveChanges">
        {{ $t('Save') }}
      </b-button>
    </template>
  </Popup>
</template>

<script>
import Popup from '@/components/basic/popup/Popup.vue'
import PriceEditor from '@/components/price/PriceEditor.vue'
import { Price } from '@/domain/models/Price'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'

export default {
    name: 'EditOfferPopup',

    popupId: PopupNames.MANAGE_PRICES,

    components: {
        Popup,
        PriceEditor
    },

    // props: {
    //     offersSize: {
    //         type: Number,
    //         required: true
    //     }
    // },

    data () {
        return {
            prices: [],
            entities: [],
            existingItems: true
        }
    },

    methods: {
        beforeOpen ({ entities, existingItems }) {
            this.entities = entities
            this.existingItems = existingItems
        },

        open () {
            this.prices = [Price.getDefault()]
            this.$refs.popup.show()
        },

        close () {
            this.$refs.popup.hide()
        },

        addPrice () {
            this.prices.push(this.$priceService.createDefaultPrice())
        },

        removePrice (price) {
            this.prices = this.prices.filter(p => p !== price)
        },

        saveChanges () {
            console.error('P', this.prices)
            this.$emit('saveChanges', this.prices)
        }
    }
}
</script>
