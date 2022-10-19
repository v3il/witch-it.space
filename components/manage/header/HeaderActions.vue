<template>
  <div class="wit-flex wit-flex__item--no-shrink wit-user-card__actions">
    <Dropdown position="end" :mobile-modal="false">
      <template #trigger>
        <b-button type="is-primary" class="wis-btn--rounded">
          <i class="mdi mdi-18px wit-offset-right--xs mdi-cog" />
          Actions
          <i class="mdi mdi-18px wit-offset-left--xs mdi-chevron-down" />
        </b-button>
      </template>

      <template #items>
        <DropdownItem @click="$emit('manage')">
          <div class="wit-flex wit-flex--align-center wit-color--success">
            <i class="mdi mdi-20px mdi-swap-vertical wit-offset-right--xs" />
            {{ isOffersMode ? $t('Wishlist_Manage_ChangePrices') : $t('Wishlist_Manage_AddToWishlist') }}
          </div>
        </DropdownItem>

        <DropdownItem v-if="isOffersMode" @click="$emit('remove')">
          <div class="wit-flex wit-flex--align-center wit-color--danger">
            <i class="mdi mdi-20px mdi-delete wit-offset-right--xs" />
            {{ $t('Wishlist_Manage_RemoveOffers') }}
          </div>
        </DropdownItem>

        <DropdownItem v-if="hasSelectedOffers" @click="$emit('deselect')">
          <div class="wit-flex wit-flex--align-center">
            <i class="mdi mdi-18px mdi-selection-remove wit-offset-right--xs" />
            {{ $t('Wishlist_Manage_Deselect') }}
          </div>
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import Dropdown from '@/components/basic/dropdown/Dropdown'
import DropdownItem from '@/components/basic/dropdown/DropdownItem'

export default {
    name: 'HeaderActions',

    components: {
        Dropdown,
        DropdownItem
    },

    setup () {
        const store = useStore()

        const isOffersMode = computed(() => store.getters['manage/isOffersMode'])
        const hasSelectedOffers = computed(() => store.getters['manage/hasSelectedEntities'])

        return { isOffersMode, hasSelectedOffers }
    }
}
</script>

<style scoped lang="scss">
.wit-user-card__actions {
    margin: var(--offset-sm) 0 var(--offset-sm) var(--offset-sm);

    @media (max-width: 600px) {
        margin-bottom: 0;
        margin-left: 0;
    }
}
</style>
