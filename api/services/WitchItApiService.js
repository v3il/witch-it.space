export class WitchItApiService {
    constructor ({ axiosInstance }) {
        this.axiosInstance = axiosInstance
        // this.questsCollection = questsCollection
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

        // console.log(quests)

        const weeklyQuests = quests.filter(quest => quest.type === 'Weekly')
        const dailyQuests = quests.filter(quest => quest.type === 'Daily')

        return {
            weeklyQuests, // .map(this._mapQuest.bind(this)),
            dailyQuests // .mp(this._mapQuest.bind(this))
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

        if (quest.questType === 'Weekly') {
            const { data } = await this.axiosInstance.get('/quest/replaceWeeklyQuest', {
                params: {
                    authToken: accessToken,
                    weeklyQuestId: quest.globalId
                }
            })

            return data.success
        } else {
            const { data } = await this.axiosInstance.get('/quest/replaceDailyQuest', {
                params: {
                    authToken: accessToken,
                    dailyQuestId: quest.globalId
                }
            })

            return data.success
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

    // async finalizeQuest({ userId, localQuestId, globalQuestId }) {
    //     const authToken = await this.auth(userId);
    //     const accessToken = await this.getAccessToken(authToken);
    //
    //     console.log(userId, localQuestId, globalQuestId);
    //
    //     const r = await this.axiosInstance.get('/quest/finalizeQuest', {
    //         params: {
    //             authToken: accessToken,
    //             accountQuestId: globalQuestId,
    //             questId: localQuestId,
    //         },
    //     });
    //
    //     console.log(r.headers);
    //
    //     return r.data.success;
    // }

    // _mapQuest (quest) {
    //     const reward = quest.rewardVal
    //     const [itemId, count] = reward.split('x')
    //     const rewardItem = items.find(item => item.id === +itemId)
    //     const progress = Number.parseInt(quest.objective1Val, 10)
    //     const objective = Number.parseInt(quest.objective1Max, 10)
    //     const questName = this.questsCollection[quest.name] || `No quest with name "${quest.name}"`
    //
    //     delete quest.name
    //     delete quest.rewardVal
    //     delete quest.rewardId
    //     delete quest.objective1Id
    //     delete quest.objective1Val
    //     delete quest.objective1Max
    //     delete quest.type
    //
    //     return {
    //         ...quest, rewardItem, count: +count, progress, objective, questName
    //     }
    // }
}
