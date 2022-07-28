<template>
  <ItemsListView :items="sortedOffers" class="wis-offers-list">
    <template #default="{ items: offers }">
      <ItemView
        v-for="(offer) in offers"
        :key="offer.id"
        :item="offer.item"
        add-title
        add-border
      >
        <ItemPriceList :prices="offer.prices" />
      </ItemView>
    </template>
  </ItemsListView>
</template>

<script>
import ItemsListView from '@/components/items/ItemsListView.vue'
import ItemView from '@/components/items/ItemView.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'

export default {
    name: 'OffersList',

    components: {
        ItemsListView,
        ItemView,
        ItemPriceList
    },

    props: {
        sortedOffers: {
            required: true,
            type: Array
        }
    },

    created () {
        console.log(this.sortedOffers)
    }
}
</script>

<style scoped lang="scss">
    .wis-offers-list {
        padding: 0 24px 24px;
    }
</style>
