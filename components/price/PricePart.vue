<template>
  <div>
    <!--    <b-dropdown aria-role="list" class="wit-materials-dropdown wit-dropdown&#45;&#45;offset-xs" position="is-bottom-left" append-to-body>-->
    <!--      <template #trigger>-->
    <!--            <b-button-->
    <!--              type="is-link"-->
    <!--              style="width: 50px; height: 36px;"-->
    <!--            >-->
    <!--              <i class="mdi mdi-24 mdi-plus" />-->
    <!--              {{ itemId }}-->
    <!--            </b-button>-->
    <!--      </template>-->

    <!--          <div class="wit-paddings&#45;&#45;sm">-->
    <!--            <p class="wit-offset-bottom&#45;&#45;xs">-->
    <!--              Primary ingredients-->
    <!--            </p>-->

    <!--            <div class="wit-flex wit-offset-bottom&#45;&#45;sm">-->
    <!--              <b-button v-for="item in primaryIngredients" :key="item.id" class="wit-paddings&#45;&#45;none wit-offset-right&#45;&#45;xs wiz-background&#45;&#45;transparent" style="border: 0; width: 45px; height: 45px;">-->
    <!--                <ItemView :is-title-shown="false" :item="item" type="is-ghost" style="width: 100%;" />-->
    <!--              </b-button>-->
    <!--            </div>-->

    <!--            <p class="wit-offset-bottom&#45;&#45;xs">-->
    <!--              Secondary ingredients-->
    <!--            </p>-->

    <!--            <div class="wit-flex wit-flex&#45;&#45;wrap">-->
    <!--              <b-button v-for="item in secondaryIngredients" :key="item.id" class="wit-paddings&#45;&#45;none wit-offset-right&#45;&#45;xs wit-offset-bottom&#45;&#45;xs wiz-background&#45;&#45;transparent" style="border: 0; width: 45px; height: 45px;">-->
    <!--                <ItemView :is-title-shown="false" :item="item" type="is-ghost" style="width: 100%;" />-->
    <!--              </b-button>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--    </b-dropdown>-->

    <v-popover :placement="popoverPosition" container="body" boundaries-element="body">
      <!-- This will be the popover target (for the events and position) -->
      <b-button
        type="is-link"
        style="width: 50px; height: 36px;"
      >
        <i class="mdi mdi-24 mdi-plus" />
        {{ itemId }}
      </b-button>
      <!-- This will be the content of the popover -->

      <div slot="popover" class="wit-paddings--sm" style="max-width: 300px;">
        <p class="wit-offset-bottom--xs">
          Primary ingredients
        </p>

        <div class="wit-flex wit-offset-bottom--sm">
          <b-button v-for="item in primaryIngredients" :key="item.id" class="wit-paddings--none wit-offset-right--xs wiz-background--transparent wit-flex__item--no-shrink" style="border: 0; width: 45px; height: 45px;">
            <ItemView v-tooltip="item.name" :is-title-shown="false" :item="item" type="is-ghost" style="width: 100%;" />
          </b-button>
        </div>

        <p class="wit-offset-bottom--xs">
          Secondary ingredients
        </p>

        <div class="wit-flex wit-flex--wrap">
          <b-button v-for="item in secondaryIngredients" :key="item.id" class="wit-flex__item--no-shrink wit-paddings--none wit-offset-right--xs wit-offset-bottom--xs wiz-background--transparent" style="border: 0; width: 45px; height: 45px;">
            <ItemView :is-title-shown="false" :item="item" type="is-ghost" style="width: 100%;" />
          </b-button>
        </div>
      </div>
    </v-popover>
  </div>
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
        },

        popoverPosition: {
            type: String,
            required: true
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
