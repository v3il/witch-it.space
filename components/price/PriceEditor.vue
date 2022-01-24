<template>
  <div>
    <PriceTypeSelector />
  </div>
</template>

<script>
import PriceTypeSelector from '@/components/price/PriceTypeSelector.vue'

export default {
    name: 'PriceEditor',

    components: {
        PriceTypeSelector
    },

    props: {
        price: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
