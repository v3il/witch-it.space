import { Routes } from '@/shared'

export default function ({ $axios, redirect/*, store */ }) {
    $axios.onError((error) => {
        if (error.response.status === 403) {
            // store.dispatch('logout')
            // todo: dispatch logout
            redirect(Routes.LOGIN)
        }
    })
}
