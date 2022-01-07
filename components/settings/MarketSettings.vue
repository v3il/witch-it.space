<template>
  <Card class="wit-offset-bottom--sm">
    <template #title>
      {{ $t('Settings_Preferences') }}
    </template>

    <b-switch :value="marketSettings.switchRarities" class="wit-offset-bottom--sm wit-block--full-width" @input="emitEvent({ switchRarities: $event })">
      {{ $t('Settings_SwitchRarities') }}
    </b-switch>

    <b-switch :value="marketSettings.tradeWithGuardedOnly" class="wit-offset-bottom--sm wit-block--full-width" @input="emitEvent({ tradeWithGuardedOnly: $event })">
      {{ $t('Settings_TradeWithGuardedOnly') }}
    </b-switch>

    <b-switch :value="marketSettings.discountAvailable" class="wit-offset-bottom--sm wit-block--full-width" @input="emitEvent({ discountAvailable: $event })">
      {{ $t('Settings_DiscountAvailable') }}
    </b-switch>

    <b-switch :value="marketSettings.tradeDuplicatesOnly" class="wit-offset-bottom--sm wit-block--full-width" @input="emitEvent({ tradeDuplicatesOnly: $event })">
      {{ $t('Settings_TradeDuplicatesOnly') }}
    </b-switch>

    <b-switch :value="marketSettings.hideRecipes" class="wit-offset-bottom--sm wit-block--full-width wiz-border--top wit-padding-top--sm" @input="emitEvent({ hideRecipes: $event })">
      {{ $t('Settings_HideRecipes') }}
    </b-switch>
  </Card>
</template>

<script>
import Card from '@/components/basic/Card.vue'

export default {
    name: 'MarketSettings',

    components: {
        Card
    },

    props: {
        marketSettings: {
            required: true,
            type: Object
        }
    },

    methods: {
        emitEvent (changedSettings) {
            this.$emit('change', {
                ...this.marketSettings,
                ...changedSettings
            })
        }
    }
}
</script>

<style scoped>

</style>
