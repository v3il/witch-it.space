<template>
  <div class="wit-flex wit-flex--wrap wit-items__item-grid">
    <ItemView
      v-for="item in items"
      :key="item.id"
      :item="item"
      @clicked="() => {}"
    />
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'

export default {
    name: 'ItemsList',

    components: {
        ItemView
    },

    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.wit-items__item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-column-gap: 8px;
    justify-items: center;
    grid-row-gap: 16px;
    overflow-y: auto;

    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
}
</style>
