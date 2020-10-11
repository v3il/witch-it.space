export default async function ({ store, redirect }) {
    console.error(1, store.state.user)
    await store.dispatch('fetchUser')
    console.error(3, store.state.user)

    if (!store.state.user) {
        redirect('/')
    }

    // console.log(a)
    // if (!store.state.auth.loggedIn) {
    //     return redirect('/auth/login')
    // }
}
