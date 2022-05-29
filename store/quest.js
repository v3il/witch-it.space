import { Quest } from '@/store/Types'
import { questsService } from '@/domain/index.js'

export const state = () => ({
    quests: [],
    isLoaded: false,
    isLoading: false,
    canReplaceDailyQuests: true,
    canReplaceWeeklyQuests: true,
    questsUpdateTimestamp: 0
})

export const getters = {
    weeklyQuests: state => state.quests.filter(quest => quest.questType === 'Weekly'),
    dailyQuests: state => state.quests.filter(quest => quest.questType === 'Daily')
}

export const actions = {
    fetchQuests ({ commit }) {
        commit('SET_LOADING', true)

        return questsService.fetch()
            .then(data => commit('SET_DATA', data))
            .finally(() => commit('SET_LOADING', false))
    },

    // async [Quest.Actions.FETCH_QUESTS] ({ commit, state }) {
    //     if (state.isLoaded) {
    //         return { error: null }
    //     }
    //
    //     commit(Quest.Mutations.SET_LOADING, true)
    //
    //     try {
    //         const response = await this.$axios.get('/api/quests')
    //         commit(Quest.Mutations.SET_DATA, response.data)
    //         return { isSuccess: true }
    //     } catch (e) {
    //         return { error: e.message }
    //     } finally {
    //         commit(Quest.Mutations.SET_LOADING, false)
    //     }
    // },

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
    SET_LOADING (state, isLoading) {
        state.isLoading = isLoading
    },

    SET_DATA (state, questsData) {
        const { quests, canReplaceWeeklyQuests, canReplaceDailyQuests, questsUpdateTimestamp } = questsData

        state.quests = quests
        state.canReplaceWeeklyQuests = canReplaceWeeklyQuests
        state.canReplaceDailyQuests = canReplaceDailyQuests
        state.questsUpdateTimestamp = questsUpdateTimestamp
        state.isLoaded = true
    }
}
