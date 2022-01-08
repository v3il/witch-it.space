<template>
  <div class="wishlist-editor wit-flex wit-flex--column">
    <div class="wishlist-editor__header">
      <div class="wit-flex wit-flex--align-center wit-block--full-height">
        <b-button type="is-primary is-light" class="wit-transition wit-offset-right--xs" @click="$emit('close')">
          {{ $t('Close') }}
        </b-button>
      </div>
    </div>

    <div class="wit-flex wishlist-editor__container">
      <div class="wishlist-editor__items-container wit-offset-right--sm wit-paddings--xs wit-background--content">
        <!--        <div class="wit-flex wit-flex&#45;&#45;column">-->
        <ItemsList :items="items" class="wishlist-editor__items wit-block--full-height" />
        <!--        </div>-->
      </div>

      <Card class="wishlist-editor__editor">
        1
      </Card>
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/items/ItemsList.vue'
import Card from '@/components/basic/Card.vue'

export default {
    name: 'WishlistEditor',

    components: {
        ItemsList,
        Card
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
    flex: 0 0 50px;
    position: sticky;
    top: 0;
    padding: 0 var(--offset-sm);
}

.wishlist-editor__container {
    max-height: calc(100% - 50px);
    padding: var(--offset-sm);
}

.wishlist-editor__items-container {
    flex: 1;
    //overflow-y: scroll;
}

.wishlist-editor__items {
    //overflow-y: scroll;
}

.wishlist-editor__editor {
    flex: 0 0 450px;
}
</style>
