<template>
  <div class="wishlist-editor">
    <div class="wishlist-editor__header">
      <div class="wit-flex wit-flex--align-center wit-block--full-height">
        <b-button type="is-primary is-light" class="wit-transition wit-offset-right--xs" @click="$emit('close')">
          {{ $t('Close') }}
        </b-button>
      </div>
    </div>

    <div class="wit-flex wishlist-editor__container">
      <div class="wishlist-editor__items">
        <ItemsList :items="items" />
      </div>
      <div class="wishlist-editor__editor">
        1
      </div>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'

export default {
    name: 'WishlistEditor',

    components: {
        ItemsList
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
.wishlist-editor {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: calc(var(--zindex-fixed) + 1);
    background-color: var(--body-bg);
}

.wishlist-editor__header {
    background-color: var(--header-bg);
    height: 50px;
    position: sticky;
    top: 0;
    padding: 0 var(--offset-sm);
}

.wishlist-editor__container {
    height: 100%;
    padding: var(--offset-sm);
}

.wishlist-editor__items {
    flex: 1;
}

.wishlist-editor__editor {
    flex: 0 0 450px;
}
</style>
