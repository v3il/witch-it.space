<template>
  <ItemsListView :items="items" class="wis-items-list">
    <template #default="{ items }">
      <ItemView
        v-for="(item) in items"
        :key="item.id"
        :item="item"
        add-title
        add-border
      />
    </template>
  </ItemsListView>
</template>

<script>
import ItemsListView from '@/components/items/ItemsListView.vue'
import ItemView from '@/components/items/ItemView.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'

export default {
    name: 'ItemsList2',

    components: {
        ItemsListView,
        ItemView,
        ItemPriceList
    },

    props: {
        items: {
            required: true,
            type: Array
        }
    }
}
</script>

<style scoped lang="scss">
    .wis-items-list {
        padding-bottom: 24px;
        width: 100%;
    }
</style>
