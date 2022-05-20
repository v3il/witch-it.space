import { Routes } from '@/shared'

export default function ({ store, redirect }) {
    const isAuthorized = store.getters['user/isAuthorized']

    console.error(isAuthorized)

    if (!isAuthorized) {
        redirect(Routes.LOGIN)
    }
}
