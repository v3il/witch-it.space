import { Routes } from '@/shared'

export default async function ({ store, redirect }) {
    await store.dispatch('fetchUser')

    if (!store.state.user) {
        redirect(Routes.AUTH)
    }
}
