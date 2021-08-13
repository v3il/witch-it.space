import { Wishlist } from '@/store'

export const state = () => ({
    isLoaded: false,
    isLoading: false
})

export const actions = {
    async [Wishlist.Actions.FETCH_WISHLIST] ({ commit }) {
        commit(Wishlist.Mutations.SET_LOADING, true)

        try {
            const response = await this.$axios.get('/api/wishlist')
            return response.data.wishlist
        } catch (e) {
            return { error: e.message }
        } finally {
            commit(Wishlist.Mutations.SET_LOADING, false)
        }
    }
}

export const mutations = {
    [Wishlist.Mutations.SET_LOADING] (state, isLoading) {
        state.isLoading = isLoading
    }
}
