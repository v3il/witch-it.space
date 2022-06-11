<template>
  <Card>
    <template #title>
      <h2 class="wit-font-size--sm wit-offset-bottom--sm">
        {{ $t('Settings_Preferences') }}
      </h2>
    </template>

    <b-switch :value="settings.switchRarities" class="wit-offset-bottom--sm wit-block--full-width" @input="emitEvent({ switchRarities: $event })">
      {{ $t('Settings_SwitchRarities') }}
    </b-switch>

    <b-switch :value="settings.tradeWithGuardedOnly" class="wit-offset-bottom--sm wit-block--full-width" @input="emitEvent({ tradeWithGuardedOnly: $event })">
      {{ $t('Settings_TradeWithGuardedOnly') }}
    </b-switch>

    <b-switch :value="settings.discountAvailable" class="wit-offset-bottom--sm wit-block--full-width" @input="emitEvent({ discountAvailable: $event })">
      {{ $t('Settings_DiscountAvailable') }}
    </b-switch>

    <b-switch :value="settings.tradeDuplicatesOnly" class="wit-block--full-width" @input="emitEvent({ tradeDuplicatesOnly: $event })">
      {{ $t('Settings_TradeDuplicatesOnly') }}
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
        settings: {
            required: true,
            type: Object
        }
    },

    methods: {
        emitEvent (changedSettings) {
            this.$emit('change', {
                ...this.settings,
                ...changedSettings
            })
        }
    }
}
</script>
