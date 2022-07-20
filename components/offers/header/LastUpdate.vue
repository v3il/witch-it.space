<template>
  <p class="wis-user-card__last-update wit-color--muted">
    <i class="mdi mdi-bell mdi-18px wit-offset-right--xs" />
    <span class="wit-text--overflow">{{ $t('Wishlist_LastUpdate') }}: {{ formattedLastUpdate }}</span>
  </p>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { OfferTabModes } from '@/domain/index.js'
import { formatDate } from '@/utils/index.js'

export default {
    name: 'LastUpdate',

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
            return updateTime ? formatDate(new Date(updateTime)) : $t('Time_Never')
        })

        return { formattedLastUpdate }
    }
}
</script>

<style scoped lang="scss">
.wis-user-card__last-update {
    display: flex;
    align-items: center;
    line-height: 24px;
}
</style>
