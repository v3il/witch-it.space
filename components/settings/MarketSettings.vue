<template>
  <Card class="wit-offset-bottom--sm">
    <template #title>
      {{ $t('Settings_MarketSettings') }}
    </template>

    <b-field class="wit-offset-bottom--none" :label="$t('Settings_IsStrictPrice')">
      <b-switch :value="marketSettings.isStrictRarity" @input="onStatusChange">
        {{ marketSettings.isStrictRarity ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>

    <b-field class="wit-offset-bottom--none" :label="$t('Settings_AcceptsTradeFromNonGuardedUsers')">
      <b-switch :value="marketSettings.allowMaterialsReplacement" @input="onStatusChange">
        {{ marketSettings.allowMaterialsReplacement ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>

    <b-field class="wit-offset-bottom--none" :label="$t('Settings_IsBargainAvailable')">
      <b-switch :value="marketSettings.allowMaterialsReplacement" @input="onStatusChange">
        {{ marketSettings.allowMaterialsReplacement ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>

    <b-field class="wit-offset-bottom--none" :label="$t('Settings_TradingOnlyDuplicates')">
      <b-switch :value="marketSettings.allowMaterialsReplacement" @input="onStatusChange">
        {{ marketSettings.allowMaterialsReplacement ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>
  </Card>
</template>

<script>
import Card from '@/components/Card'

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
        onStatusChange (allowMaterialsReplacement) {
            this._emitEvent({ allowMaterialsReplacement })
        },

        _emitEvent (changedSettings) {
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
