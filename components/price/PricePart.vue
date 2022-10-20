<template>
  <div>
    <v-popover ref="popover" :placement="popoverPosition">
      <b-button
        type="is-link"
        class="wit-position--relative wis-price-place"
        @click="showPopover"
      >
        <ItemView v-if="selectedItem" :item="selectedItem" :is-title-shown="false" size="48" />
        <i v-else class="mdi mdi-24 mdi-plus" />
      </b-button>

      <div v-if="isVisible" slot="popover" class="wit-paddings--xs">
        <p class="wit-offset-bottom--xs">
          {{ $t('PrimaryIngredients') }}
        </p>

        <IngredientsGrid
          :ingredients="primaryIngredients"
          :selected-item-id="pairedItemId"
          class="wit-offset-bottom--sm"
          @select="onItemSelect"
        />

        <p class="wit-offset-bottom--xs">
          {{ $t('SecondaryIngredients') }}
        </p>

        <IngredientsGrid
          :ingredients="secondaryIngredients"
          :selected-item-id="pairedItemId"
          class="wit-offset-bottom--sm"
          @select="onItemSelect"
        />

        <b-button type="is-danger" expanded @click="onItemClear">
          {{ $t('Delete') }}
        </b-button>
      </div>
    </v-popover>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import IngredientsGrid from './IngredientsGrid.vue'
import ItemView from '@/components/items/ItemView.vue'
import RemoveButton from '~/components/basic/RemoveButton.vue'

export default {
    name: 'PricePart',

    components: {
        ItemView,
        RemoveButton,
        IngredientsGrid
    },

    props: {
        itemId: {
            required: true,
            type: Number
        },

        pairedItemId: {
            required: true,
            type: Number
        },

        popoverPosition: {
            type: String,
            required: false,
            default: 'bottom-start'
        }
    },

    setup (props, { emit }) {
        const { $itemsService } = useContext()

        const isVisible = ref(false)
        const popover = ref(null)

        const selectedItem = computed(() => $itemsService.getById(props.itemId))

        const primaryIngredients = $itemsService.getPrimaryIngredients()
        const secondaryIngredients = $itemsService.getSecondaryIngredients()

        const showPopover = () => isVisible.value = true

        const onItemSelect = (item) => {
            emit('itemSelect', item.id)
            popover.value.hide()
        }

        const onItemClear = () => {
            emit('itemClear')
            popover.value.hide()
        }

        return {
            popover,
            isVisible,
            primaryIngredients,
            secondaryIngredients,
            selectedItem,
            onItemSelect,
            onItemClear,
            showPopover
        }
    }
}
</script>

<style scoped lang="scss">
.wis-price-place {
    width: 48px;
    height: 48px;
    background: transparent;
    border: 1px dashed #626ed4;
}
</style>
