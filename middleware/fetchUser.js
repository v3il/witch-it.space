export default function ({ store, redirect }) {
    console.error(1, store.state.user)
    store.dispatch('fetchUser')
    console.error(3, store.state.user)

    // console.log(a)
    // if (!store.state.auth.loggedIn) {
    //     return redirect('/auth/login')
    // }
}
