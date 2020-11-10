import { Routes } from '@/shared'

export default function ({ $axios, redirect, error: nuxtError, store }) {
    $axios.onError((error) => {
        if (error.response.status === 403) {
            // store.dispatch('logout')
            // todo: dispatch logout
            return redirect(Routes.LOGIN)
        }

        store.commit('setErrors', [error.response.data.error])

        // console.log(error.response.data.error)

        // nuxtError({
        //     statusCode: error.response.status,
        //     message: error.message
        // })

        return Promise.reject(new Error(error.response.data.error))

        // throw new Error()

        // return Promise.resolve({
        //     statusCode: error.response.status,
        //     message: error.message
        // })
    })
}
