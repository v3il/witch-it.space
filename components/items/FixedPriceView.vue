<template>
  <div class="wit-flex wit-flex--center">
    <div v-if="item1" class="wit-flex wit-flex--align-center">
      <span class="wit-price__counter wit-offset-right--xxs wit-text--right">{{ price.item1Count }}</span>
      <ItemView add-tooltip :item="item1" :is-title-shown="false" class="wit-price__item" />
    </div>

    <span v-if="hasTwoItems" class="wit-price__plus">+</span>

    <div v-if="item2" class="wit-flex wit-flex--align-center">
      <ItemView add-tooltip :item="item2" :is-title-shown="false" class="wit-price__item" />
      <span class="wit-price__counter wit-offset-left--xxs wit-text--left">{{ price.item2Count }}</span>
    </div>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'

export default {
    name: 'FixedPriceView',

    components: {
        ItemView
    },

    props: {
        price: {
            type: Object,
            required: true
        }
    },

    computed: {
        hasTwoItems () {
            return this.item1 && this.item2
        },

        item1 () {
            return this.$itemsService.getById(this.price.item1Id)
        },

        item2 () {
            return this.$itemsService.getById(this.price.item2Id)
        }
    }
}
</script>

<style scoped lang="scss">
$size: 32px;

.wit-price__counter {
    font-size: 12px;
    line-height: $size;
    font-weight: 500;
    min-width: 13px;
}

.wit-price__item {
    width: $size;
    height: $size;
}

.wit-price__plus {
    margin: 0 var(--offset-xxs);
}
</style>
