<template>
  <div class="wit-flex wit-flex--wrap">
    <ItemImage
      v-for="item in $store.state.items.items"
      :key="item.id"
      :item="item"
      :item-count="0"
      style="margin: 24px; width: 72px; height: 72px;"
    />
  </div>
</template>

<script>
import ItemImage from '@/components/ItemImage'

export default {
    components: {
        ItemImage
    },

    middleware: ['fetchUser', 'fetchItems'],

    data: () => ({
        user: null
    }),

    computed: {

    },

    created () {
        this.user = this.$store.state.user
        // console.log(this.$store)

        // this.$store.commit('add', 'Test')

        // console.log('Created')

        // console.log()
    },

    methods: {

    }
}
</script>
