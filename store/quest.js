import { Quest } from '@/store/Types'

export const state = () => ({
    weeklyQuests: [],
    dailyQuests: [],
    isLoaded: false,
    canReplaceDailyQuests: true,
    canReplaceWeeklyQuests: true,
    questsUpdateTimestamp: 0
})

export const actions = {
    async [Quest.Actions.FETCH_QUESTS] ({ commit, state }) {
        if (state.isLoaded) {
            return
        }

        const response = await this.$axios.get('/api/quests')
        commit(Quest.Mutations.SET_DATA, response.data)
    },

    async [Quest.Actions.UPDATE_QUESTS] ({ commit }) {
        const response = await this.$axios.post('/api/quests/update')
        commit(Quest.Mutations.SET_DATA, response.data)
    },

    async [Quest.Actions.REPLACE_QUEST] ({ commit }, questId) {
        const response = await this.$axios.post('/api/quests/replace', { questId })

        if (response.data.success) {
            commit(Quest.Mutations.SET_DATA, response.data)
        }

        return response.data.success
    },

    async [Quest.Actions.FINALIZE_QUEST] ({ commit }, questId) {
        const response = await this.$axios.post('/api/quests/finalize', { questId })

        if (response.data.success) {
            commit(Quest.Mutations.SET_DATA, response.data)
        }

        return response.data.success
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
    }
}
