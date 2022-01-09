<template>
  <div class="wit-wishlist-editor wit-flex wit-flex--column">
    <div class="wit-wishlist-editor__header">
      <div class="wit-flex wit-flex--align-center wit-block--full-height">
        <b-button type="is-primary is-light" class="wit-transition wit-offset-right--xs" @click="$emit('close')">
          {{ $t('Close') }}
        </b-button>
      </div>
    </div>

    <div class="wit-flex wit-wishlist-editor__container">
      <div class="wit-wishlist-editor__items-container wit-offset-right--sm wit-paddings--xs wit-background--content wit-flex wit-flex--column">
        <Filters
          :default-filters="{}"
          :filters="{}"
          :default-sort="{}"
          :sort="{}"
          query-input-placeholder="Search item"
          :sorts="{}"
          class="wit-offset-bottom--xs"
        >
          test
        </Filters>
        <ItemsList :items="items" class="wit-wishlist-editor__items" />
      </div>

      <Card class="wit-wishlist-editor__editor">
        1
      </Card>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'
import Card from '@/components/basic/Card.vue'
import Filters from '@/components/basic/Filters.vue'

export default {
    name: 'WishlistEditor',

    components: {
        ItemsList,
        Card,
        Filters
    },

    props: {

    },

    computed: {
        items () {
            console.log(this.$store.state.items.isLoaded)
            return Object.values(this.$store.state.items.items).slice(0, 100)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-wishlist-editor {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: calc(var(--zindex-fixed) + 1);
    background-color: var(--body-bg);
}

.wit-wishlist-editor__header {
    background-color: var(--header-bg);
    flex: 0 0 50px;
    position: sticky;
    top: 0;
    padding: 0 var(--offset-sm);
}

.wit-wishlist-editor__container {
    max-height: calc(100% - 50px);
    padding: var(--offset-sm);
}

.wit-wishlist-editor__items-container {
    flex: 1;
    border-radius: var(--offset-xxs);
    //overflow-y: scroll;
}

.wit-wishlist-editor__items {
    overflow-y: scroll;
    padding-right: var(--offset-xs);
}

.wit-wishlist-editor__editor {
    flex: 0 0 450px;
}
</style>
