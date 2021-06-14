import { Items } from '@/store'

export default async function ({ store }) {
    if (store.state.items.isLoaded) {
        return
    }

    await store.dispatch(Items.F.Actions.FETCH_ITEMS)
}
