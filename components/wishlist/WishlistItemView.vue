<template>
  <div>{{ wishlistItem }}</div>
</template>

<script>
export default {
    name: 'WishlistItemView',

    props: {
        wishlistItem: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
