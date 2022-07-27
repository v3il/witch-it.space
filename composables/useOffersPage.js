import { computed, ref, useStore } from '@nuxtjs/composition-api'
import { useStickyUserHeader } from '@/composables/useStickyUserHeader.js'

export const useOffersPage = (offersType) => {
    const store = useStore()
    const filters = computed(() => store.state.filters.filters)
    const sortedOffers = computed(() => store.getters['offers/sortedOfferModels'])

    const isFiltersVisible = ref(false)
    const { isStickyHeaderVisible } = useStickyUserHeader()

    return { isStickyHeaderVisible, isFiltersVisible, offersType, filters, sortedOffers }
}
