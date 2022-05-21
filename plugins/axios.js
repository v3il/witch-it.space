import { User } from '@/store'

export default function ({ $axios, store }) {
    $axios.onError((error) => {
        const { logout, error: errorText } = error.response.data
        const isAuthorized = store.getters['user/isAuthorized']

        if (logout && isAuthorized) {
            return store.dispatch(User.F.Actions.LOGOUT)
        }

        throw new Error(errorText)
    })
}
