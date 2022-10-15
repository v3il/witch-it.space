<template>
  <ItemsListView :items="sortedOffers" class="wis-offers-list">
    <template #default="{ items: offers }">
      <ItemView
        v-for="(offer, index) in offers"
        :key="offer.id"
        :item="offer.item"
        :is-selected="offer.isSelected"
        add-title
        add-border
        @clicked="$emit('toggle', offer)"
        @shiftClick="$emit('toggleRange', index)"
      >
        <div class="wit-offer-controls">
          <IconButton
            icon="pencil-ruler"
            type="primary"
            circle
            :size="28"
            :disabled="offer.isSelected"
            @click="$emit('edit', offer)"
          />
        </div>

        <div class="wit-offer-controls wit-offer-controls--remove">
          <IconButton
            icon="close"
            type="danger"
            circle
            :size="28"
            :disabled="offer.isSelected"
            @click="$emit('remove', offer)"
          />
        </div>

        <ItemPriceList :prices="offer.prices" />
      </ItemView>
    </template>
  </ItemsListView>
</template>

<script>
import ItemsListView from '@/components/items/ItemsListView.vue'
import ItemView from '@/components/items/ItemView.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'
import IconButton from '@/components/basic/IconButton.vue'

export default {
    name: 'OffersList',

    components: {
        ItemsListView,
        ItemView,
        ItemPriceList,
        IconButton
    },

    props: {
        sortedOffers: {
            required: true,
            type: Array
        }
    }
}
</script>

<style scoped lang="scss">
.wis-offers-list {
    padding-bottom: 24px;
}

.wit-offer-controls {
    position: absolute;
    top: 16px;
    right: -10px;
    padding: var(--offset-xxs) 0 var(--offset-xxs) var(--offset-xxs);
    background: var(--body-bg);
    z-index: 3;
    border-radius: 50% 0 0 50%;
}

.wit-offer-controls--remove {
    top: 52px;
}
</style>
