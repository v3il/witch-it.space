export class WitchItApiService {
    static CLIENT_VERSION = '1.2.6'

    constructor ({ axiosInstance }) {
        this.axiosInstance = axiosInstance
    }

    // /api/v1/Auth/login?username=XXXXX&password=XXXXX&locale=ru-RU&accountType=Steam&clientVersion=1.2.6&accountId=-1
    async auth (userSteamId) {
        const { data } = await this.axiosInstance.get('/Auth/login', {
            params: {
                username: userSteamId,
                password: userSteamId,
                locale: 'ru-RU',
                accountType: 'Steam',
                clientVersion: WitchItApiService.CLIENT_VERSION,
                accountId: -1
            }
        })

        return { accountId: data.accountId, authToken: data.authToken }
    }

    // /api/v1/Auth/requestAccessToken?refreshToken=XXXXX&clientVersion=1.2.6&accountId=660604
    async getAccessToken ({ accountId, authToken }) {
        const { data } = await this.axiosInstance.get('/Auth/requestAccessToken', {
            params: {
                refreshToken: authToken,
                ...this.#getCommonParams(accountId)
            }
        })

        return data.accessToken
    }

    // /api/v1/quest/getAssignedQuests?authToken=XXXXX&clientVersion=1.2.6&accountId=660604
    async getQuests ({ accessToken, accountId }) {
        const { data } = await this.axiosInstance.get('/quest/getAssignedQuests', {
            params: {
                authToken: accessToken,
                ...this.#getCommonParams(accountId)
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
        const { authToken, accountId } = await this.auth(steamId)
        const accessToken = await this.getAccessToken({ authToken, accountId })
        const { weeklyQuests, dailyQuests } = await this.getQuests({ accessToken, accountId })
        const canReplaceWeeklyQuests = await this.canReplaceWeeklyQuests({ accessToken, accountId })
        const canReplaceDailyQuests = await this.canReplaceDailyQuests({ accessToken, accountId })

        const quests = [...weeklyQuests, ...dailyQuests]

        return {
            quests,
            canReplaceWeeklyQuests,
            canReplaceDailyQuests
        }
    }

    // /api/v1/quest/canReplaceWeeklyQuest?authToken=XXXXX&clientVersion=1.2.6&accountId=660604
    async canReplaceWeeklyQuests ({ accessToken, accountId }) {
        const { data } = await this.axiosInstance.get('/quest/canReplaceWeeklyQuest', {
            params: {
                authToken: accessToken,
                ...this.#getCommonParams(accountId)
            }
        })

        return data.success
    }

    // /api/v1/quest/canReplaceDailyQuest?authToken=XXXXX&clientVersion=1.2.6&accountId=660604
    async canReplaceDailyQuests ({ accessToken, accountId }) {
        const { data } = await this.axiosInstance.get('/quest/canReplaceDailyQuest', {
            params: {
                authToken: accessToken,
                ...this.#getCommonParams(accountId)
            }
        })

        return data.success
    }

    async replaceQuest ({ user, quest }) {
        const { authToken, accountId } = await this.auth(user.steamId)
        const accessToken = await this.getAccessToken({ authToken, accountId })
        const isWeeklyQuest = quest.questType === 'Weekly'

        const url = isWeeklyQuest ? '/quest/replaceWeeklyQuest' : '/quest/replaceDailyQuest'
        const paramName = isWeeklyQuest ? 'weeklyQuestId' : 'dailyQuestId'

        const { data } = await this.axiosInstance.get(url, {
            params: {
                authToken: accessToken,
                [paramName]: quest.globalId,
                ...this.#getCommonParams(accountId)
            }
        })

        return data.success
    }

    async finalizeQuest ({ user, quest }) {
        const { authToken, accountId } = await this.auth(user.steamId)
        const accessToken = await this.getAccessToken({ authToken, accountId })

        const { data } = await this.axiosInstance.get('/quest/finalizeQuest', {
            params: {
                authToken: accessToken,
                accountQuestId: quest.globalId,
                questId: quest.localId,
                ...this.#getCommonParams(accountId)
            }
        })

        return data.success
    }

    #getCommonParams (accountId) {
        return { accountId, clientVersion: WitchItApiService.CLIENT_VERSION }
    }
}
