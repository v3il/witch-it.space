<template>
  <div class="wit-price-editor wit-flex wit-flex--align-center wit-flex--column">
    <div class="wit-flex wit-flex--align-center wit-block--full-width">
      <PriceTypeSelector :price="price" class="wit-flex__item--grow" />
      <AddButton v-if="!isRemovable" v-tooltip="'Add price'" class="wit-offset-left--xs" @click="onPriceAdd" />
      <RemoveButton v-if="isRemovable" v-tooltip="'Remove price'" class="wit-offset-left--xs" @click="onPriceRemove" />
    </div>

    <div v-if="price.isFixedPrice" class="wit-flex wit-flex--align-center wit-block--full-width wit-offset-top--xs">
      <div class="wit-flex wit-flex--align-center">
        <PricePart
          :item-id="price.item1Id"
          :paired-item-id="price.item2Id"
          @itemSelect="setFirstItemId"
          @itemClear="clearFirstItemId"
        />

        <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
        <NumericInput :value="price.item1Count" :min="1" :max="99" @change="setFirstItemCount" />
      </div>

      <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">+</span>

      <div class="wit-flex wit-flex--align-center">
        <PricePart
          :item-id="price.item2Id"
          :paired-item-id="price.item1Id"
          @itemSelect="setSecondItemId"
          @itemClear="clearSecondItemId"
        />

        <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
        <NumericInput :value="price.item2Count" :min="1" :max="99" @change="setSecondItemCount" />
      </div>
    </div>
  </div>
</template>

<script>
import PriceTypeSelector from '@/components/price/PriceTypeSelector.vue'
import PricePart from '@/components/price/PricePart.vue'
import NumericInput from '@/components/basic/NumericInput.vue'
import RemoveButton from '@/components/basic/RemoveButton.vue'
import { PriceType } from '@/shared/items'
import AddButton from '@/components/basic/AddButton.vue'

export default {
    name: 'PriceEditor',

    components: {
        PriceTypeSelector,
        PricePart,
        NumericInput,
        RemoveButton,
        AddButton
    },

    props: {
        price: {
            type: Object,
            required: true
        },

        isRemovable: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        onPriceAdd () {
            this.$emit('priceAdded')
        },

        onPriceRemove () {
            this.$emit('priceRemoved', this.price)
        },

        setFirstItemId (itemId) {
            this.price.setFirstItemId(itemId)
        },

        clearFirstItemId () {
            this.price.setFirstItemId(0)
        },

        setFirstItemCount (itemCount) {
            this.price.setFirstItemCount(itemCount)
        },

        setSecondItemId (itemId) {
            this.price.setSecondItemId(itemId)
        },

        clearSecondItemId () {
            this.price.setSecondItemId(0)
        },

        setSecondItemCount (itemCount) {
            this.price.setSecondItemCount(itemCount)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-price-editor {
    &:not(:last-child) {
        margin-bottom: var(--offset-sm);
    }
}
</style>
