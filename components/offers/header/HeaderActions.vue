<template>
  <div class="wit-flex wit-flex__item--no-shrink wit-offset-top--sm wit-offset-bottom--sm">
    <b-button v-if="isOwnProfile" type="is-primary" class="wis-btn--rounded" tag="nuxt-link" :to="manageButtonUrl">
      <i class="mdi mdi-18px wit-offset-right--xs" :class="manageButtonIconClass" />
      {{ manageButtonTitle }}
    </b-button>

    <template v-else>
      <b-button
        v-tooltip="messageButtonTooltip"
        type="is-secondary"
        class="wit-offset-right--xs wis-btn--rounded"
        tag="a"
        target="_blank"
        :href="discordUrl"
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
    </template>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { buildUserManageMarketUrl, buildUserManageWishlistUrl } from '@/utils/index.js'
import { OfferTabModes } from '@/domain/index.js'

export default {
    name: 'HeaderActions',

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
    },

    setup (props) {
        const { $t } = useContext()
        const isMarket = computed(() => props.mode === OfferTabModes.MARKET)

        const isDiscordConnected = computed(() => props.profile.discordId)
        const discordUrl = computed(() => `discord:///channels/@me/${props.profile.discordId}`)

        const manageButtonIconClass = computed(() => isMarket.value ? 'mdi-store-cog-outline' : 'mdi-heart-cog-outline')

        const manageButtonTitle = computed(() => {
            return isMarket.value ? $t('UserHeader_ManageMarket') : $t('UserHeader_ManageWishlist')
        })

        const manageButtonUrl = computed(() => {
            return isMarket.value
                ? buildUserManageMarketUrl(props.profile.id)
                : buildUserManageWishlistUrl(props.profile.id)
        })

        const messageButtonTooltip = computed(() => {
            return isDiscordConnected.value ? null : $t('UserHeader_DiscordIsNotConnected')
        })

        const tradeButtonLink = computed(() => props.profile.steamTradeLink)
        const tradeButtonTooltip = computed(() => {
            return tradeButtonLink.value ? null : $t('UserHeader_TradeLinkIsNotProvided')
        })

        return {
            isDiscordConnected,
            discordUrl,
            manageButtonIconClass,
            manageButtonTitle,
            messageButtonTooltip,
            manageButtonUrl,
            tradeButtonLink,
            tradeButtonTooltip
        }
    }
}
</script>

<style scoped>

</style>
