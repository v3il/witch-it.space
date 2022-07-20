<template>
  <h1 class="wis-user-card__title wit-text--overflow">
    {{ title }}
  </h1>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { OfferTabModes } from '@/domain/index.js'

export default {
    name: 'HeaderTitle',

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
        const profileName = computed(() => props.profile.displayName)

        const title = computed(() => {
            return props.mode === OfferTabModes.MARKET
                ? $t('UserHeader_MarketTitle', [profileName.value])
                : $t('UserHeader_WishlistTitle', [profileName.value])
        })

        return { title }
    }
}
</script>

<style scoped lang="scss">
.wis-user-card__title {
    letter-spacing: -1px;
    font-size: 32px;
    line-height: 50px;

    @media (max-width: 769px) {
        letter-spacing: -0.025em;
        line-height: 1.75rem;
        font-size: 1.25rem;
    }
}
</style>
