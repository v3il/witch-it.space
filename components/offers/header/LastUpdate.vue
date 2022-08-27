<template>
  <Description icon-name="update">
    {{ $t('Wishlist_LastUpdate') }}: {{ formattedLastUpdate }}
  </Description>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { OfferTabModes } from '@/domain/index.js'
import { buildDateFromTimestamp, formatDate } from '@/utils/index.js'
import { Description } from '@/components/basic/header'

export default {
    name: 'LastUpdate',

    components: {
        Description
    },

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

        const formattedLastUpdate = computed(() => {
            const updateTime = isMarket.value ? props.profile.marketUpdateTime : props.profile.wishlistUpdateTime
            return updateTime ? formatDate(buildDateFromTimestamp(updateTime)) : $t('Time_Never')
        })

        return { formattedLastUpdate }
    }
}
</script>
