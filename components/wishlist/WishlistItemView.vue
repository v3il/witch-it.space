<template>
  <div>{{ item }}</div>
</template>

<script>
export default {
    name: 'WishlistItemView',

    props: {
        wishlistItem: {
            type: Object,
            required: true
        }
    },

    data: () => ({

    }),

    created () {
        // this.item = await this.$store.dispatch(Items.F.Actions.GET_BY_ID, 1000)

        console.log(this.$itemsService.getById(1000))
    }
}
</script>

<style scoped>

</style>
