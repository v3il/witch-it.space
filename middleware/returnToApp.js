import { Routes } from '@/shared'

export default function ({ store, redirect, route }) {
    const isAuthorized = store.getters['user/isAuthorized']
    const isLogout = 'logout' in route.query

    if (isAuthorized && !isLogout) {
        redirect(Routes.MAIN)
    }
}
