import { questsService } from '@/domain/index.js'

export const state = () => ({
    quests: [],
    isLoading: false,
    canReplaceDailyQuests: true,
    canReplaceWeeklyQuests: true
})

export const getters = {
    weeklyQuests: state => state.quests.filter(quest => quest.questType === 'Weekly'),
    dailyQuests: state => state.quests.filter(quest => quest.questType === 'Daily')
}

export const actions = {
    fetchUserQuests ({ commit }) {
        return questsService.fetch().then(data => commit('SET_DATA', data))
    },

    updateUserQuests ({ commit }) {
        commit('SET_LOADING', true)

        return questsService.update()
            .then(data => commit('SET_DATA', data))
            .finally(() => commit('SET_LOADING', false))
    },

    replaceUserQuest ({ commit }, questId) {
        commit('SET_LOADING', true)

        return questsService.replaceQuest(questId)
            .then(data => commit('SET_DATA', data))
            .finally(() => commit('SET_LOADING', false))
    },

    finalizeUserQuest ({ commit }, questId) {
        commit('SET_LOADING', true)

        return questsService.finalizeQuest(questId)
            .then(data => commit('SET_DATA', data))
            .finally(() => commit('SET_LOADING', false))
    }
}

export const mutations = {
    SET_LOADING (state, isLoading) {
        state.isLoading = isLoading
    },

    SET_DATA (state, questsData) {
        const { quests, canReplaceWeeklyQuests, canReplaceDailyQuests, questsUpdateTimestamp } = questsData

        state.quests = quests
        state.canReplaceWeeklyQuests = canReplaceWeeklyQuests
        state.canReplaceDailyQuests = canReplaceDailyQuests
        state.questsUpdateTimestamp = questsUpdateTimestamp
    }
}
