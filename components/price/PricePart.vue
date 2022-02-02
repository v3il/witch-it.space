<template>
  <!--  <div>-->
  <b-dropdown aria-role="list" class="wit-materials-dropdowb">
    <template #trigger>
      <b-button
        type="is-link"
        style="width: 50px; height: 36px;"
      >
        <i class="mdi mdi-24 mdi-plus" />
        {{ itemId }}
      </b-button>
    </template>

    <div class="wit-paddings--xs">
      <p class="wit-offset-bottom--xs">
        Primary ingredients
      </p>

      <div class="wit-flex wit-offset-bottom--sm">
        <b-button v-for="item in primaryIngredients" :key="item.id" class="wit-paddings--none wit-offset-right--xs wiz-background--transparent" style="border: 0; width: 45px; height: 45px;">
          <ItemView :is-title-shown="false" :item="item" type="is-ghost" style="width: 100%;" />
        </b-button>
      </div>

      <p class="wit-offset-bottom--xs">
        Secondary ingredients
      </p>

      <div class="wit-flex wit-flex--wrap">
        <b-button v-for="item in secondaryIngredients" :key="item.id" class="wit-paddings--none wit-offset-right--xs wit-offset-bottom--xs wiz-background--transparent" style="border: 0; width: 45px; height: 45px;">
          <ItemView :is-title-shown="false" :item="item" type="is-ghost" style="width: 100%;" />
        </b-button>
      </div>
    </div>
  </b-dropdown>
<!--  </div>-->
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'

export default {
    name: 'PricePart',

    components: {
        ItemView
    },

    props: {
        itemId: {
            required: true,
            type: Number
        }
    },

    created () {
        this.primaryIngredients = this.$itemsService.getPrimaryIngredients()
        this.secondaryIngredients = this.$itemsService.getSecondaryIngredients()
        console.log(this.primaryIngredients)
    }
}
</script>

<style scoped>

</style>
