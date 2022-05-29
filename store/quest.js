import { questsService } from '@/domain/index.js'
import { config, getCurrentTimestamp } from '@/shared'
import { formatNumber } from '@/utils'

export const state = () => ({
    quests: [],
    isLoaded: false,
    isLoading: false,
    canReplaceDailyQuests: true,
    canReplaceWeeklyQuests: true,
    questsUpdateTimestamp: 0,
    intervalId: 0,
    isUpdateAvailable: false,
    timeToNextUpdate: '00:00',

    lastUpdateIntervalId: 0,
    formattedLastUpdate: null
})

export const getters = {
    weeklyQuests: state => state.quests.filter(quest => quest.questType === 'Weekly'),
    dailyQuests: state => state.quests.filter(quest => quest.questType === 'Daily')
}

export const actions = {
    fetchUserQuests ({ commit, rootGetters }) {
        commit('SET_LOADING', true)

        return questsService.fetch()
            .then((data) => {
                commit('SET_DATA', data)
                commit('SET_TIMER', rootGetters['user/isMyProfile'])
                commit('SET_LAST_UPDATE_TIMER')
            })
            .finally(() => commit('SET_LOADING', false))
    },

    updateUserQuests ({ commit, rootGetters }) {
        commit('SET_LOADING', true)

        return questsService.update()
            .then((data) => {
                commit('SET_DATA', data)
                commit('SET_TIMER', rootGetters['user/isMyProfile'])
                commit('SET_LAST_UPDATE_TIMER')
            })
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
        state.isLoaded = true
    },

    SET_TIMER (state, isMyProfile) {
        clearInterval(state.intervalId)

        const handler = () => {
            const nextUpdate = state.questsUpdateTimestamp + config.QUESTS_UPDATE_TIMEOUT
            const diff = nextUpdate - getCurrentTimestamp()

            state.isUpdateAvailable = isMyProfile ? true : diff <= 0

            if (state.isUpdateAvailable) {
                state.timeToNextUpdate = '00:00'
                return clearInterval(state.intervalId)
            }

            const seconds = diff % 60
            const minutes = Math.floor((diff - seconds) / 60)

            state.timeToNextUpdate = `${formatNumber(minutes)}:${formatNumber(seconds)}`
        }

        handler()
        state.intervalId = setInterval(handler, 1000)
    },

    SET_LAST_UPDATE_TIMER (state) {
        if (!state.questsUpdateTimestamp) {
            return
        }

        clearInterval(state.lastUpdateIntervalId)

        const handler = () => {
            state.formattedLastUpdate = Date.fromTimestamp(state.questsUpdateTimestamp).humanizeTimeDiff()
        }

        handler()
        state.lastUpdateIntervalId = setInterval(handler, 1000)
    }
}
