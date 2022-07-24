<template>
  <ScrollablePagination v-if="items.length" :items="items" :items-per-page="50">
    <template #default="{ visibleItems }">
      <Grid cell-width="130px" mobile-cell-width="130px">
        <slot :items="visibleItems" />
      </Grid>
    </template>
  </ScrollablePagination>

  <EmptyState v-else icon="view-grid" :text="$t('Items_NoItems')" class="wit-padding-top--sm" />
</template>

<script>
import ScrollablePagination from '@/components/basic/ScrollablePagination.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import Grid from '@/components/basic/Grid.vue'

export default {
    name: 'ItemsListView',

    components: {
        ScrollablePagination,
        EmptyState,
        Grid
    },

    props: {
        items: {
            required: true,
            type: Array
        }
    }
}
</script>
