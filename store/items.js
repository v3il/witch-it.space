import { Items } from '@/store/Types'
import { itemsService } from '@/service'

export const state = () => ({
    items: [],
    isLoaded: false,
    isLoading: false
})

export const actions = {
    async [Items.Actions.FETCH_ITEMS] ({ commit, state }) {
        if (state.isLoaded) {
            return { error: null }
        }

        commit(Items.Mutations.SET_LOADING, true)

        try {
            const response = await this.$axios.get('/api/items')
            itemsService.setItems(response.data)
            commit(Items.Mutations.SET_ITEMS, response.data)
            return { isSuccess: true }
        } catch (e) {
            return { error: e.message }
        } finally {
            commit(Items.Mutations.SET_LOADING, false)
        }
    }
}

export const mutations = {
    [Items.Mutations.SET_ITEMS] (state, questsData) {
        const { items } = questsData

        state.items = items
        state.isLoaded = true
    },

    [Items.Mutations.SET_LOADING] (state, isLoading) {
        state.isLoading = isLoading
    }
}
