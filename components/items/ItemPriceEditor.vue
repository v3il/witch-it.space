<template>
  <div>{{ price }}</div>
</template>

<script>
export default {
    name: 'ItemPriceEditor',

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
