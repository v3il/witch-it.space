import { Routes } from '@/shared'
import { User } from '@/store'

export default async function ({ store, redirect }) {
    await store.dispatch(User.Actions.FETCH_USER)

    if (!store.state.user) {
        redirect(Routes.LOGIN)
    }
}
