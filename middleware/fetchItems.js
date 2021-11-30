import { Items } from '@/store'
import { itemsService } from '@/services'

export default async function ({ store, $itemsService, $axios }) {
    await $itemsService.fetch($axios)

    // if (store.state.items.isLoaded) {
    //     return
    // }

    // await $itemsService.fetch($axios)

    // await store.dispatch(Items.F.Actions.FETCH_ITEMS)
}
