<template>
  <b-button type="is-primary" class="wis-btn--rounded" tag="nuxt-link" :to="buttonUrl">
    <i class="mdi mdi-18px wit-offset-right--xs" :class="buttonIconClass" />
    {{ buttonTitle }}
  </b-button>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { OfferTabModes } from '@/domain/index.js'
import { buildUserManageMarketUrl, buildUserManageWishlistUrl } from '@/utils/index.js'

export default {
    name: 'OwnProfileActions',

    props: {
        profile: {
            required: true,
            type: Object
        },

        mode: {
            required: true,
            type: String
        }
    },

    setup (props) {
        const { $t } = useContext()
        const isMarket = computed(() => props.mode === OfferTabModes.MARKET)

        const buttonIconClass = computed(() => isMarket.value ? 'mdi-store-cog-outline' : 'mdi-heart-cog-outline')

        const buttonTitle = computed(() => {
            return isMarket.value ? $t('UserHeader_ManageMarket') : $t('UserHeader_ManageWishlist')
        })

        const buttonUrl = computed(() => {
            return isMarket.value
                ? buildUserManageMarketUrl(props.profile.id)
                : buildUserManageWishlistUrl(props.profile.id)
        })

        return { buttonIconClass, buttonTitle, buttonUrl }
    }
}
</script>
