import { Routes } from '@/shared'
import { User } from '@/store'

export default async function ({ store, redirect }) {
    if (store.state.user.user) {
        return
    }

    await store.dispatch(User.F.Actions.FETCH_USER)

    if (!store.state.user.user) {
        redirect(Routes.LOGIN)
    }
}
