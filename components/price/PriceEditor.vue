<template>
  <div class="wit-price-editor wit-flex wit-flex--align-center wit-flex--column">
    <div class="wit-flex wit-flex--align-center wit-block--full-width">
      <PriceTypeSelector :price="price" class="wit-flex__item--grow" />
      <AddButton v-if="!isRemovable" v-tooltip="'Add price'" class="wit-offset-left--xs" @click="onPriceAdd" />
      <RemoveButton v-if="isRemovable" v-tooltip="'Remove price'" class="wit-offset-left--xs" @click="onPriceRemove" />
    </div>

    <div v-if="price.isFixedPrice" class="wit-flex wit-flex--align-center wit-block--full-width wit-offset-top--xs">
      <div class="wit-flex wit-flex--align-center">
        <PricePart :item-position="1" :price="price" popover-position="bottom-start" @itemSelect="setItem" @itemClear="clearItem" />
        <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
        <NumericInput :value="price.itemCount" :min="1" :max="99" @change="setItem1Count" />
      </div>

      <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">+</span>

      <div class="wit-flex wit-flex--align-center">
        <PricePart :item-position="2" :price="price" popover-position="bottom" @itemSelect="setItem" @itemClear="clearItem" />
        <span class="wit-block wit-offset-left--xs wit-offset-right--xs wit-color--warning">&times;</span>
        <NumericInput :value="price.itemCount2" :min="1" :max="99" @change="setItem2Count" />
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

    computed: {
        isSpecificPrice () {
            return this.price.priceType === PriceType.FIXED
        }
    },

    methods: {
        onPriceAdd () {
            this.$emit('priceAdded')
        },

        onPriceRemove () {
            this.$emit('priceRemoved', { price: this.price })
        },

        setItem1Count (itemCount) {
            this.price.setItemCount({ itemCount, position: 1 })
        },

        setItem2Count (itemCount) {
            this.price.setItemCount({ itemCount, position: 2 })
        },

        setItem (eventData) {
            this.price.setItemId(eventData)
        },

        clearItem (eventData) {
            this.price.clearItemId(eventData)
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
