import { Routes } from '@/shared'

export default function ({ store, redirect, route }) {
    const isAuthorized = store.getters['user/isAuthorized']

    console.error(isAuthorized, route)

    if (!isAuthorized) {
        redirect(Routes.LOGIN)
    }
}
