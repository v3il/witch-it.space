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
        <div class="wit-offer-controls">
          <IconButton
            icon="plus-thick"
            type="primary"
            circle
            :size="28"
            :disabled="offer.isSelected"
            @click="addOffer(offer)"
          />
        </div>
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
    name: 'AvailableItemsList',

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
        top: 48px;
    }
</style>
