<template>
  <div class="wit-items">
    <ItemFilters :filters-data="{}" class="wit-offset-bottom--sm" />

    <div class="wit-flex wit-flex--wrap wit-flex--justify-center aaa">
      <ItemView
        v-for="item in $store.state.items.items"
        :key="item.id"
        :item="item"
        :item-count="0"
      />
    </div>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'
import ItemFilters from '@/components/items/ItemFilters'

export default {
    components: {
        ItemView,
        ItemFilters
    },

    middleware: ['fetchUser', 'fetchItems'],

    data: () => ({
        user: null
    }),

    computed: {

    },

    created () {

    },

    methods: {

    }
}
</script>

<style scoped lang="scss">
.wit-items {
    padding: var(--offset-md) var(--offset-md) var(--offset-sm);

    @media screen and (max-width: 1024px) {
        padding-left: 0;
        padding-right: 0;
    }
}

.aaa {
    margin-left: -8px;
    margin-right: -8px;
    align-items: stretch;
}
</style>
