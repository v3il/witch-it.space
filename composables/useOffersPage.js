import { ref, useContext, useFetch, useRoute, useStore } from '@nuxtjs/composition-api'
import { StoreModules } from '@/store/index.js'
import { ItemsFiltersScheme } from '@/domain/models/schemes/index.js'
import { Offer } from '@/domain/models/index.js'
import { useStickyUserHeader } from '@/composables/useStickyUserHeader.js'
import { OfferTypes } from '@/shared/index.js'

export const useOffersPage = (offersType) => {
    const route = useRoute()
    const store = useStore()
    const { $wishlistService, $marketService } = useContext()
    const service = offersType === OfferTypes.MARKET ? $marketService : $wishlistService

    useFetch(async () => {
        await store.dispatch(`${StoreModules.OFFERS}/setOffersType`, offersType)

        await store.dispatch(`${StoreModules.FILTERS}/setData`, {
            defaultFilters: ItemsFiltersScheme.getDefaultFilters(),
            defaultSorts: ItemsFiltersScheme.getDefaultSorts(),
            availableSorts: ItemsFiltersScheme.getAvailableSorts()
        })

        const { offers, profile } = await service.fetch(route.value.params.id)

        await store.dispatch(`${StoreModules.OFFERS}/setProfile`, profile)
        await store.dispatch(`${StoreModules.OFFERS}/storeOffers`, {
            existingOffers: offers.map(offer => Offer.create(offer)),
            availableOffers: []
        })
    })

    const isFiltersVisible = ref(false)
    const { isStickyHeaderVisible } = useStickyUserHeader()

    return { isStickyHeaderVisible, isFiltersVisible, offersType }
}
