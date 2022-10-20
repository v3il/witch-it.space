<template>
  <div class="wis-ingredients-grid">
    <b-button
      v-for="item in ingredients"
      :key="item.id"
      :disabled="item.id === selectedItemId"
      class="wit-paddings--none wis-ingredients-grid__button"
      @click="$emit('select', item)"
    >
      <ItemView add-tooltip :is-title-shown="false" :item="item" type="is-ghost" />
    </b-button>
  </div>
</template>

<script>
import ItemView from '../items/ItemView.vue'

export default {
    name: 'IngredientsGrid',

    components: {
        ItemView
    },

    props: {
        ingredients: {
            required: true,
            type: Array
        },

        selectedItemId: {
            required: true,
            type: Number
        }
    }
}
</script>

<style scoped lang="scss">
$size: 48px;

.wis-ingredients-grid {
    display: grid;
    grid-template-columns: repeat(5, $size);
    gap: 8px;
}

.wis-ingredients-grid__button {
    width: $size;
    height: $size;
    border: 1px solid #64748b;
}
</style>
