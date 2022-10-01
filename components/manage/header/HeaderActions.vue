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
        <DropdownItem v-if="true" @click="() => {}">
          {{ $t('Wishlist_Manage_Deselect') }}
        </DropdownItem>

        <DropdownItem @click="() => {}">
          <span class="wit-color--success">
            {{ true ? $t('Wishlist_Manage_ChangePrices') : $t('Wishlist_Manage_AddToWishlist') }}
          </span>
        </DropdownItem>

        <DropdownItem v-if="true" @click="() => {}">
          <span class="wit-color--danger">{{ $t('Wishlist_Manage_RemoveOffers') }}</span>
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import Dropdown from '@/components/basic/dropdown/Dropdown'
import DropdownItem from '@/components/basic/dropdown/DropdownItem'

export default {
    name: 'HeaderActions',

    components: {
        Dropdown,
        DropdownItem
    },

    props: {
        profile: {
            required: true,
            type: Object
        },

        mode: {
            required: true,
            type: String
        },

        isOwnProfile: {
            required: true,
            type: Boolean
        }
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
