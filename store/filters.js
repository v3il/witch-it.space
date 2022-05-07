import { isEqual } from 'lodash'
import { getObjectsDiff } from '@/utils/index.js'
import { WishlistTabs } from '@/domain/models/tabs/index.js'
import { wishlistService } from '@/domain/index.js'
import { SortOrders } from '@/shared/items/index.js'

export const state = () => ({
    filtersManager: {}
})

export const getters = {
    filters: state => state.filtersManager.filters,
    sorts: state => state.filtersManager.sorts,
    changedFilters: state => state.filtersManager.changedFilters,
    changedSorts: state => state.filtersManager.changedSorts
}

export const actions = {
    setFiltersManager ({ commit, state }, filtersManager) {
        console.error(filtersManager)
        commit('SET_FILTERS_MANAGER', filtersManager)
    },

    toggleOrderBy ({ commit }, orderBy) {
        commit('UPDATE_ORDER_BY', orderBy)
    },

    toggleSortOrder ({ commit }) {
        commit('TOGGLE_ORDER')
    },

    mergeFilters ({ commit, state }, changedFilters) {
        commit('MERGE_FILTERS', changedFilters)
    },

    // resetFilterParam ({ commit }, propName) {
    //     commit('RESET_FILTER_PARAM', propName)
    // },

    resetFilters ({ commit }) {
        commit('RESET_FILTERS')
    },

    resetSorts ({ commit }) {
        commit('RESET_SORTS')
    },

    resetSortsAndFilters ({ commit }) {
        commit('RESET_FILTERS')
        commit('RESET_SORTS')
    }
}

export const mutations = {
    SET_FILTERS_MANAGER (state, filtersManager) {
        state.filtersManager = filtersManager
    },

    UPDATE_ORDER_BY (state, orderBy) {
        state.filtersManager.updateOrderBy(orderBy)
    },

    TOGGLE_ORDER (state) {
        state.filtersManager.toggleOrder()
    },

    MERGE_FILTERS (state, changedFilters) {
        console.log(state.filtersManager)
        state.filtersManager.mergeFilters(changedFilters)
    },

    RESET_FILTER_PARAM (state, propName) {
        state.filtersManager.resetFiltersParam(propName)
    },

    RESET_FILTERS (state) {
        state.filtersManager.resetFilters()
    },

    RESET_SORTS (state) {
        state.filtersManager.resetSorts()
    }
}
