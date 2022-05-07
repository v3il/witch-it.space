import { getFiltersFromRoute, getObjectsDiff, getSortFromRoute } from '@/utils/index.js'
import { SortOrders } from '@/shared/items/index.js'

export const state = () => ({
    defaultFilters: {},
    filters: {},
    defaultSorts: {},
    sorts: {},
    availableSorts: []
})

export const actions = {
    setData ({ commit, state }, params) {
        commit('SET_DATA', params)
    },

    toggleOrderBy ({ commit }, orderBy) {
        commit('UPDATE_ORDER_BY', orderBy)
        commit('UPDATE_URL')
    },

    toggleSortOrder ({ commit }) {
        commit('TOGGLE_ORDER')
        commit('UPDATE_URL')
    },

    mergeFilters ({ commit, state }, changedFilters) {
        commit('MERGE_FILTERS', changedFilters)
        commit('UPDATE_URL')
    },

    resetFilterParam ({ commit }, propName) {
        commit('RESET_FILTER_PARAM', propName)
        commit('UPDATE_URL')
    },

    resetFilters ({ commit }) {
        commit('RESET_FILTERS')
        commit('UPDATE_URL')
    },

    resetSorts ({ commit }) {
        commit('RESET_SORTS')
        commit('UPDATE_URL')
    },

    resetSortsAndFilters ({ commit }) {
        commit('RESET_FILTERS')
        commit('RESET_SORTS')
        commit('UPDATE_URL')
    }
}

export const mutations = {
    SET_DATA (state, { defaultFilters, defaultSorts, availableSorts }) {
        const currentRoute = this.$router.currentRoute

        state.defaultSorts = defaultSorts
        state.defaultFilters = defaultFilters
        state.availableSorts = availableSorts
        state.filters = getFiltersFromRoute(currentRoute, defaultFilters)
        state.sorts = getSortFromRoute(currentRoute, defaultSorts, availableSorts)
    },

    UPDATE_ORDER_BY (state, orderBy) {
        state.sorts.sortBy = orderBy
    },

    TOGGLE_ORDER (state) {
        state.sorts.order = state.sorts.order === SortOrders.ASC ? SortOrders.DESC : SortOrders.ASC
    },

    MERGE_FILTERS (state, changedFilters) {
        state.filters = { ...state.filters, ...changedFilters }
    },

    RESET_FILTER_PARAM (state, propName) {
        state.filters = { ...state.filters, [propName]: state.defaultFilters[propName] }
    },

    RESET_FILTERS (state) {
        state.filters = { ...state.defaultFilters }
    },

    RESET_SORTS (state) {
        state.sorts = { ...state.defaultSorts }
    },

    UPDATE_URL (state) {
        const path = this.$router.currentRoute.path
        const changedFilters = getObjectsDiff(state.defaultFilters, state.filters)
        const changedSorts = getObjectsDiff(state.defaultSorts, state.sorts)
        const searchParams = new URLSearchParams({ ...changedSorts, ...changedFilters })
        const newURL = path + (Array.from(searchParams).length ? `?${searchParams.toString()}` : '')

        window.history.replaceState({}, '', newURL)
    }
}
