<template>
  <h1 class="user-header__title">
    {{ title }}
  </h1>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { OfferTabModes } from '@/domain/index.js'

export default {
    name: 'HeaderTitle',

    props: {
        profileName: {
            required: true,
            type: String
        },

        mode: {
            required: true,
            type: String
        }
    },

    setup (props) {
        const { $t } = useContext()

        const title = computed(() => {
            return props.mode === OfferTabModes.MARKET
                ? $t('UserHeader_MarketTitle', [props.profileName])
                : $t('UserHeader_WishlistTitle', [props.profileName])
        })

        return { title }
    }
}
</script>

<style scoped>
.user-header__title {
    letter-spacing: -1px;
    font-size: 32px;
    line-height: 50px;
}
</style>
