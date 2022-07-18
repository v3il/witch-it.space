<template>
  <div>
    <b-button
      v-tooltip="messageButtonTooltip"
      type="is-secondary"
      class="wit-offset-right--xs wis-btn--rounded"
      tag="a"
      target="_blank"
      :href="messageButtonLink"
      :disabled="!isDiscordConnected"
    >
      <i class="mdi mdi-discord mdi-18px wit-offset-right--xs" />
      {{ $t('Message') }}
    </b-button>

    <b-button
      v-tooltip="tradeButtonTooltip"
      type="is-primary"
      class="wis-btn--rounded"
      tag="a"
      target="_blank"
      :href="tradeButtonLink"
      :disabled="!tradeButtonLink"
    >
      <i class="mdi mdi-format-vertical-align-center mdi-18px wit-offset-right--xs" />
      {{ $t('SendTradeOffer') }}
    </b-button>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'

export default {
    name: 'ForeignProfileActions',

    props: {
        profile: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const { $t } = useContext()
        const isDiscordConnected = computed(() => props.profile.discordId)

        const messageButtonLink = computed(() => {
            return isDiscordConnected.value ? `discord:///channels/@me/${props.profile.discordId}` : null
        })

        const messageButtonTooltip = computed(() => {
            return isDiscordConnected.value ? null : $t('UserHeader_DiscordIsNotConnected')
        })

        const tradeButtonLink = computed(() => props.profile.steamTradeLink)
        const tradeButtonTooltip = computed(() => {
            return tradeButtonLink.value ? null : $t('UserHeader_TradeLinkIsNotProvided')
        })

        return { isDiscordConnected, messageButtonTooltip, messageButtonLink, tradeButtonLink, tradeButtonTooltip }
    }
}
</script>
