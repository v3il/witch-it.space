<template>
  <div class="wit-flex wit-flex--column wit-items-page">
    <ItemsHeader />

    <div class="wit-items-page__content">
      <div class="wit-items-page__offers wis-block--max-width">
        <Search store-module="items" class="wit-offset-bottom--md" />
        <ItemsList :items="sortedItems" />
      </div>
    </div>

    <ItemsFilters store-module-name="items" />
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { ItemsFilters, Search } from '@/components/basic'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import { ItemsList, ItemsHeader } from '@/components/items/index.js'

export default {
    components: {
        Search,
        ItemsList,
        ItemsHeader,
        ItemsFilters
    },

    setup () {
        const store = useStore()
        const sortedItems = computed(() => store.getters['items/sortedItems'])

        return { sortedItems }
    },

    // TODO: use Composition API
    async asyncData ({ store }) {
        await store.dispatch('items/setData', {
            defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
            defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
            availableSorts: ItemsFiltersScheme.getAvailableSorts()
        })
    }
}
</script>

<style scoped lang="scss">
.wit-items-page {
    min-height: 100vh;
}

.wit-items-page__content {
    width: 100%;
    padding: 24px;
}

.wit-items-page__offers {
    //background-color: var(--card-bg-color);
    //border-radius: 16px;
    margin-left: auto;
    margin-right: auto;
}
</style>
