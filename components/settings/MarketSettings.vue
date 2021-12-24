<template>
  <Card class="wit-offset-bottom--sm">
    <template #title>
      {{ $t('Settings_MarketSettings') }}
    </template>

    <b-field class="wit-offset-bottom--sm" :label="$t('Settings_IsStrictPrice')">
      <b-switch :value="marketSettings.isStrictRarity" @input="onStrictPriceChange">
        {{ marketSettings.isStrictRarity ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>

    <b-field class="wit-offset-bottom--sm" :label="$t('Settings_AcceptsTradeFromNonGuardedUsers')">
      <b-switch :value="marketSettings.onlyGuarded" @input="onOnlyGuardedChange">
        {{ marketSettings.onlyGuarded ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>

    <b-field class="wit-offset-bottom--sm" :label="$t('Settings_IsBargainAvailable')">
      <b-switch :value="marketSettings.isBargainAvailable" @input="onBargainChange">
        {{ marketSettings.isBargainAvailable ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>

    <b-field class="wit-offset-bottom--sm" :label="$t('Settings_TradingOnlyDuplicates')">
      <b-switch :value="marketSettings.isTradingOnlyDups" @input="onTradingDupsChange">
        {{ marketSettings.isTradingOnlyDups ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>

    <b-field class="wit-offset-bottom--none1" :label="$t('Settings_HideRecipes')">
      <b-switch :value="marketSettings.areRecipesHidden" @input="onHideRecipesChange">
        {{ marketSettings.areRecipesHidden ? $t('Yes') : $t('No') }}
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
        onStrictPriceChange (isStrictRarity) {
            this._emitEvent({ isStrictRarity })
        },

        onOnlyGuardedChange (onlyGuarded) {
            this._emitEvent({ onlyGuarded })
        },

        onBargainChange (isBargainAvailable) {
            this._emitEvent({ isBargainAvailable })
        },

        onTradingDupsChange (isTradingOnlyDups) {
            this._emitEvent({ isTradingOnlyDups })
        },

        onHideRecipesChange (areRecipesHidden) {
            this._emitEvent({ areRecipesHidden })
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
