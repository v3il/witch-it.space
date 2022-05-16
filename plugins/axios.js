import { Routes } from '@/shared'
import { User } from '@/store'

export default function ({ $axios, store, route }) {
    $axios.onError((error) => {
        const { logout, error: errorText } = error.response.data
        const isAuthorized = store.user.getters.isAuthorized

        console.error(isAuthorized)

        if (logout) {
            console.error(route)
            return store.dispatch(User.F.Actions.LOGOUT)
        }

        throw new Error(errorText)
    })
}
