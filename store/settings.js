export const state = () => ({
    activeTab: 'account'
})

export const actions = {
    setActiveTab ({ commit }, tab) {
        commit('SET_ACTIVE_TAB', tab)
    }
}

export const mutations = {
    SET_ACTIVE_TAB (state, activeTab) {
        state.activeTab = activeTab
    }
}
