<template>
  <div class="wit-flex wit-flex--align-center" :class="containerClasses">
    <span class="wit-price__counter" :class="counterClasses">{{ count }}</span>
    <span v-if="isSinglePart" class="wit-offset-right--xxs">&times;</span>
    <ItemView add-tooltip :item="item" :is-title-shown="false" class="wit-price__item" />
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'

export default {
    name: 'FixedPricePart',

    components: {
        ItemView
    },

    props: {
        count: {
            required: true,
            type: Number
        },

        item: {
            required: true,
            type: Object
        },

        reversed: {
            required: false,
            type: Boolean,
            default: false
        },

        isSinglePart: {
            required: true,
            type: Boolean
        }
    },

    computed: {
        containerClasses () {
            return this.reversed ? 'wit-flex--row-reverse' : null
        },

        counterClasses () {
            return this.reversed ? 'wit-offset-left--xxs wit-text--left' : 'wit-offset-right--xxs wit-text--right'
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
</style>
