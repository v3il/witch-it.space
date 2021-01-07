import { Quest } from '@/store/Types'

export const state = () => ({
    weeklyQuests: [],
    dailyQuests: [],
    isLoaded: false,
    isLoading: false,
    canReplaceDailyQuests: true,
    canReplaceWeeklyQuests: true,
    questsUpdateTimestamp: 0
})

export const actions = {
    async [Quest.Actions.FETCH_QUESTS] ({ commit, state }) {
        if (state.isLoaded) {
            return { error: null }
        }

        commit(Quest.Mutations.SET_LOADING, true)

        try {
            const response = await this.$axios.get('/api/quests')
            commit(Quest.Mutations.SET_DATA, response.data)
            return { isSuccess: true }
        } catch (e) {
            return { error: e.message }
        } finally {
            commit(Quest.Mutations.SET_LOADING, false)
        }
    },

    async [Quest.Actions.UPDATE_QUESTS] ({ commit }) {
        commit(Quest.Mutations.SET_LOADING, true)

        try {
            const response = await this.$axios.post('/api/quests/update')
            commit(Quest.Mutations.SET_DATA, response.data)
            return { isSuccess: true }
        } catch (e) {
            return { error: e.message }
        } finally {
            commit(Quest.Mutations.SET_LOADING, false)
        }
    },

    async [Quest.Actions.REPLACE_QUEST] ({ commit }, questId) {
        try {
            const response = await this.$axios.post('/api/quests/replace', { questId })

            if (response.data.isSuccess) {
                commit(Quest.Mutations.SET_DATA, response.data)
            }

            return { isSuccess: response.data.isSuccess }
        } catch (e) {
            return { error: e.message }
        }
    },

    async [Quest.Actions.FINALIZE_QUEST] ({ commit }, questId) {
        try {
            const response = await this.$axios.post('/api/quests/finalize', { questId })

            if (response.data.isSuccess) {
                commit(Quest.Mutations.SET_DATA, response.data)
            }

            return { isSuccess: response.data.isSuccess }
        } catch (e) {
            return { error: e.message }
        }
    }
}

export const mutations = {
    [Quest.Mutations.SET_DATA] (state, questsData) {
        const { weeklyQuests, dailyQuests, canReplaceWeeklyQuests, canReplaceDailyQuests, questsUpdateTimestamp } = questsData

        state.weeklyQuests = weeklyQuests
        state.dailyQuests = dailyQuests
        state.canReplaceWeeklyQuests = canReplaceWeeklyQuests
        state.canReplaceDailyQuests = canReplaceDailyQuests
        state.questsUpdateTimestamp = questsUpdateTimestamp
        state.isLoaded = true
    },

    [Quest.Mutations.SET_LOADING] (state, isLoading) {
        state.isLoading = isLoading
    }
}
