<template>
  <Title :title="title" :compact="compact" />
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { OfferTabModes } from '@/domain/index.js'
import { Title } from '@/components/basic/header'

export default {
    name: 'HeaderTitle',

    components: {
        Title
    },

    props: {
        profile: {
            required: true,
            type: Object
        },

        mode: {
            required: true,
            type: String
        },

        compact: {
            required: true,
            type: Boolean
        }
    },

    setup (props) {
        const { $t } = useContext()
        const profileName = computed(() => props.profile.displayName ?? '')

        const title = computed(() => {
            return props.mode === OfferTabModes.MARKET
                ? $t('UserHeader_MarketTitle', [profileName.value])
                : $t('UserHeader_WishlistTitle', [profileName.value])
        })

        return { title }
    }
}
</script>
