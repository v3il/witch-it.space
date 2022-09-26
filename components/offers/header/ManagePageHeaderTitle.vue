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

        const title = computed(() => {
            return props.mode === OfferTabModes.MARKET ? $t('ManagePage_ManageMarket') : $t('ManagePage_ManageWishlist')
        })

        return { title }
    }
}
</script>
