<template>
  <div>
    <h1 class="wis-settings__section-title">
      <BurgerButton class="wis-settings__burger-button" @click="onBurgerClick" />
      {{ $t('Settings_AccountActions') }}
    </h1>

    <DangerZone />
  </div>
</template>

<script>
import DangerZone from '@/components/settings/DangerZone.vue'
import BurgerButton from '@/components/basic/BurgerButton.vue'

export default {
    name: 'AccountActions',

    components: {
        DangerZone,
        BurgerButton
    },

    setup (_, { emit }) {
        const onBurgerClick = () => emit('menu-opened')

        return { onBurgerClick }
    }
}
</script>
