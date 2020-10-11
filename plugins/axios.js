export default function ({ $axios, redirect, store }) {
    console.log('Store', store)

    $axios.onError((error) => {
        if (error.response.status === 403) {
            console.error('Logout')
        }
    })
}
