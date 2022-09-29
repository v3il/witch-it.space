import { computed, ref, useStore } from '@nuxtjs/composition-api'
import { useStickyUserHeader } from '@/composables/useStickyUserHeader.js'

export const useOffersPage = (offersType) => {
    const store = useStore()
    const sortedOffers = computed(() => store.getters['offers/sortedOfferModels'])
    const { isStickyHeaderVisible } = useStickyUserHeader()

    return { isStickyHeaderVisible, offersType, sortedOffers }
}
