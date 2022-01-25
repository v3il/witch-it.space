<template>
  <div class="wit-flex wit-flex--column wit-flex--align-start wit-block--full-width">
    <div class="wit-flex wit-flex--align-start wit-block--full-width">
      <ItemView :item="wishlistItem.item" :is-title-shown="false" style="max-width: 75px;" class="wit-offset-right--sm" />

      <div class="wit-flex wit-flex--column wit-block--full-width">
        <div class="wit-flex wit-flex--align-center1 wit-offset-bottom--xs">
          <p class="wit-font-size--sm wit-offset-right--xs wit-flex__item--grow">
            {{ wishlistItem.item.name }}
          </p>

          <b-button type="is-ghost" class="wit-paddings--none" style="height: 18px; width: 18px;">
            <i class="mdi mdi-18px mdi-close zzz" />
          </b-button>
        </div>

        <ItemTags :item="wishlistItem.item" only-primary class="wit-offset-bottom--none" />
      </div>
    </div>

    <PriceEditor v-for="price in wishlistItem.prices" :key="price.id" :price="price" class="wit-price-editor wit-block--full-width" />
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'
import ItemTags from '@/components/items/ItemTags.vue'
import PriceEditor from '@/components/price/PriceEditor.vue'
import ItemPrice from '@/components/items/ItemPrice.vue'

export default {
    name: 'WishlistSelectedItem',

    components: {
        ItemView,
        ItemTags,
        PriceEditor,
        ItemPrice
    },

    props: {
        wishlistItem: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.wit-price-editor {
    &:not(:last-child) {
        //border-bottom: var(--default-border);
    }
}

.zzz {
    background-color: var(--danger);
    color: white;
    border-radius: 50%;
    height: 18px;
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        font-size: 12px;
        line-height: 18px;
    }
}
</style>
