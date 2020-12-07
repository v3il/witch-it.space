export class WitchItApiService {
    constructor ({ axiosInstance }) {
        this.axiosInstance = axiosInstance
    }

    async auth (userSteamId) {
        const { data } = await this.axiosInstance.get('/Auth/login', {
            params: {
                username: userSteamId,
                password: userSteamId,
                locale: 'ru-RU',
                accountType: 'Steam'
            }
        })

        return data.authToken
    }

    async getAccessToken (authToken) {
        const { data } = await this.axiosInstance.get('/Auth/requestAccessToken', {
            params: {
                refreshToken: authToken
            }
        })

        return data.accessToken
    }

    async getQuests (accessToken) {
        const { data } = await this.axiosInstance.get('/quest/getAssignedQuests', {
            params: {
                authToken: accessToken
            }
        })

        const { quests } = data
        const weeklyQuests = quests.filter(quest => quest.type === 'Weekly')
        const dailyQuests = quests.filter(quest => quest.type === 'Daily')

        return {
            weeklyQuests,
            dailyQuests
        }
    }

    async loadUserData (steamId) {
        const authToken = await this.auth(steamId)
        const accessToken = await this.getAccessToken(authToken)
        const { weeklyQuests, dailyQuests } = await this.getQuests(accessToken)
        const canReplaceWeeklyQuests = await this.canReplaceWeeklyQuests(accessToken)
        const canReplaceDailyQuests = await this.canReplaceDailyQuests(accessToken)

        const quests = [...weeklyQuests, ...dailyQuests]

        return {
            quests,
            canReplaceWeeklyQuests,
            canReplaceDailyQuests
        }
    }

    async canReplaceWeeklyQuests (accessToken) {
        const { data } = await this.axiosInstance.get('/quest/canReplaceWeeklyQuest', {
            params: {
                authToken: accessToken
            }
        })

        return data.success
    }

    async canReplaceDailyQuests (accessToken) {
        const { data } = await this.axiosInstance.get('/quest/canReplaceDailyQuest', {
            params: {
                authToken: accessToken
            }
        })

        return data.success
    }

    async replaceQuest ({ user, quest }) {
        const authToken = await this.auth(user.steamId)
        const accessToken = await this.getAccessToken(authToken)
        const isWeeklyQuest = quest.questType === 'Weekly'

        const url = isWeeklyQuest ? '/quest/replaceWeeklyQuest' : '/quest/replaceDailyQuest'
        const paramName = isWeeklyQuest ? 'weeklyQuestId' : 'dailyQuestId'

        const { data } = await this.axiosInstance.get(url, {
            params: {
                authToken: accessToken,
                [paramName]: quest.globalId
            }
        })

        return data.success
    }

    async finalizeQuest ({ user, quest }) {
        const authToken = await this.auth(user.steamId)
        const accessToken = await this.getAccessToken(authToken)

        const { data } = await this.axiosInstance.get('/quest/finalizeQuest', {
            params: {
                authToken: accessToken,
                accountQuestId: quest.globalId,
                questId: quest.localId
            }
        })

        return data.success
    }
}
