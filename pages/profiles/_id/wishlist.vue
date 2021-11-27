<template>
  <div>
    Wishlist
    <br>
    {{ wishlist }}

    <UserView />
  </div>
</template>

<script>
import UserView from '@/components/UserView'
import { Wishlist } from '@/store/Types'

export default {
    components: {
        UserView
    },

    middleware: ['fetchUser', 'fetchItems'],

    data: () => ({
        wishlist: []
    }),

    async created () {
        this.wishlist = await this.$store.dispatch(Wishlist.F.Actions.FETCH_WISHLIST)
    },

    methods: {

    }
}
</script>
