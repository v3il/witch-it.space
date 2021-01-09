import { Routes } from '@/shared'
import { User, Root } from '@/store'

export default function ({ $axios, redirect, store }) {
    $axios.onError(async (error) => {
        const { logout, error: errorText } = error.response.data

        if (logout) {
            await store.dispatch(User.F.Actions.LOGOUT)
            return redirect(Routes.LOGIN)
        }

        throw new Error(errorText)
    })
}
