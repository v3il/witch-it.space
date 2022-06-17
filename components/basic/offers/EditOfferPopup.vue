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
    <!--    <WishlistOfferEditor v-if="offer" :offer="offer" />-->

    <div v-if="offer" class="wit-flex wit-flex--column1 wit-flex--align-start wit-block--full-width">
      <ItemView
        add-tooltip
        :item="offer.item"
        style="max-width: 88px;"
        class="wit-overflow--hidden wit-offset-right--sm wit-flex__item--no-shrink"
      />

      <div class="wit-flex__item--grow wit-flex wit-flex--column" style="min-width: 0;">
        <p class="wit-flex__item--grow wit-text--overflow wit-font-size--sm wit-offset-bottom--xs">
          {{ offer.item.name }}
        </p>

        <ItemTags :item="offer.item" class="wit-offset-bottom--sm" />

        <div class="wit-block--full-width">
          <p class="wit-offset-bottom--xs">
            I offer:
          </p>

          <PricesEditor :prices="prices" @update="prices = $event" />
        </div>
      </div>
    </div>

    <!--      <PricesEditor :prices="prices" @update="prices = $event" />-->

    <template #controlsLeft>
      <b-button v-if="!isNewOffer" type="is-danger" @click="removeOffer">
        {{ $t('Delete') }}
      </b-button>
    </template>
  </EditPopup>
</template>

<script>
import { mapActions } from 'vuex'
// import WishlistOfferEditor from '@/components/wishlist/WishlistOfferEditor.vue'
import { StoreModules } from '@/store/index.js'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'
import EditPopup from '@/components/basic/popup/EditPopup.vue'
import ItemView from '@/components/items/ItemView.vue'
import PricesEditor from '@/components/price/PricesEditor.vue'
import ItemTags from '@/components/items/ItemTags.vue'

export default {
    name: 'EditOfferPopup',

    popupId: PopupNames.MANAGE_OFFER,

    components: {
        EditPopup,
        // WishlistOfferEditor,
        ItemView,
        PricesEditor,
        ItemTags
    },

    data: () => ({
        offer: null,
        prices: [],
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
        ...mapActions(StoreModules.OFFERS, {
            removeOffers: 'removeOffers',
            createOffers: 'createOffers',
            setMassPrices: 'setMassPrices'
        }),

        beforeOpen ({ offer }) {
            this.offer = offer
            this.prices = offer.prices
        },

        onSave () {
            this.isNewOffer ? this.saveNewOffer() : this.saveExistingOffer()
        },

        saveNewOffer () {
            this.isLoading = true
            this.offer.setPrices(this.prices)

            this.createOffers({ offers: [this.offer] })
                .then(({ createdOffersSize }) => {
                    this.close()
                    this.$showSuccess(this.$t('OffersCreated', [createdOffersSize]))
                })
                .catch(this.$showError)
                .finally(() => this.isLoading = false)
        },

        saveExistingOffer () {
            this.isLoading = true

            this.setMassPrices({ offers: [this.offer], prices: this.prices })
                .then(({ updatedOffersSize }) => {
                    this.close()
                    this.$showSuccess(this.$t('OffersUpdated', [updatedOffersSize]))
                })
                .catch(this.$showError)
                .finally(() => this.isLoading = false)
        },

        async removeOffer () {
            this.isLoading = false

            const isConfirmed = await this.$showConfirm({
                content: this.$t('Wishlist_ConfirmDelete', [1]),
                popupTitle: this.$t('ConfirmAction')
            })

            if (!isConfirmed) {
                return
            }

            this.removeOffers([this.offer])
                .then(({ removedOffersCount }) => {
                    this.close()
                    this.$showSuccess(this.$t('OffersRemoved', [removedOffersCount]))
                })
                .catch(this.$showError)
                .finally(() => this.isLoading = false)
        },

        close () {
            this.$refs.popup.closePopup()
        }
    }
}
</script>
