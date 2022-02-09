<template>
  <div>
    <v-popover ref="popover" :placement="popoverPosition">
      <b-button
        type="is-link"
        class="wit-position--relative"
        style="width: 45px; height: 45px; background: transparent; border: 1px dashed #626ed4;"
        @click="show1"
      >
        <template v-if="selectedItem">
          <ItemView :item="selectedItem" :is-title-shown="false" style="width: 45px;" />
        </template>

        <i v-else class="mdi mdi-24 mdi-plus" />
      </b-button>

      <div v-if="show" slot="popover" class="wit-paddings--xs">
        <p class="wit-offset-bottom--xs">
          Primary ingredients
        </p>

        <div class="wit-flex wit-offset-bottom--sm" style="display: grid; grid-template-columns: repeat(5, 45px); column-gap: 8px;">
          <b-button
            v-for="item in primaryIngredients"
            :key="item.id"
            :disabled="item.id === pairedItemId"
            class="wit-paddings--none wit-offset-right--xs wiz-background--transparent wit-flex__item--no-shrink"
            style="border: 0; width: 45px; height: 45px;"
            @click="onItemSelect(item)"
          >
            <ItemView add-tooltip :is-title-shown="false" :item="item" type="is-ghost" style="width: 100%;" />
          </b-button>
        </div>

        <p class="wit-offset-bottom--xs">
          Secondary ingredients
        </p>

        <div class="wit-flex wit-flex--wrap wit-offset-bottom--xs" style="display: grid; grid-template-columns: repeat(5, 45px); column-gap: 8px;">
          <b-button
            v-for="item in secondaryIngredients"
            :key="item.id"
            :disabled="item.id === pairedItemId"
            class="wit-flex__item--no-shrink wit-paddings--none wit-offset-right--xs wit-offset-bottom--xs wiz-background--transparent"
            style="border: 0; width: 45px; height: 45px;"
            @click="onItemSelect(item)"
          >
            <ItemView add-tooltip :is-title-shown="false" :item="item" type="is-ghost" style="width: 100%;" />
          </b-button>
        </div>

        <b-button type="is-danger" expanded @click="onItemClear">
          Remove
        </b-button>
      </div>
    </v-popover>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'
import RemoveButton from '~/components/basic/RemoveButton.vue'

export default {
    name: 'PricePart',

    components: {
        ItemView,
        RemoveButton
    },

    props: {
        price: {
            required: true,
            type: Object
        },

        itemPosition: {
            required: true,
            type: Number
        },

        popoverPosition: {
            type: String,
            required: true
        }
    },

    data: () => ({
        show: false
    }),

    computed: {
        itemId () {
            return this.itemPosition === 1 ? this.price.item1Id : this.price.item2Id
        },

        pairedItemId () {
            return this.itemPosition === 1 ? this.price.item2Id : this.price.item1Id
        },

        selectedItem () {
            return this.$itemsService.getById(this.itemId)
        }
    },

    created () {
        this.primaryIngredients = this.$itemsService.getPrimaryIngredients()
        this.secondaryIngredients = this.$itemsService.getSecondaryIngredients()
    },

    methods: {
        show1 () {
            this.show = true
            // this.$refs.popover.open()
        },

        onItemSelect (item) {
            this.$emit('itemSelect', { itemId: item.id, position: this.itemPosition })
            this.$refs.popover.hide()
        },

        onItemClear () {
            this.$emit('itemClear', { position: this.itemPosition })
            this.$refs.popover.hide()
        }
    }
}
</script>

<style scoped>

</style>
