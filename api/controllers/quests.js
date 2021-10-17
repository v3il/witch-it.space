import { BadRequest } from '@curveball/http-errors'
// eslint-disable-next-line import/named
import { User, Quest } from '../models'
import { witchItApiService, questsService } from '../services'
import { translateText } from '../util'
// const axios = require('axios')
// const items = require('../../shared/items.json')

// const instance = axios.create({
//     baseURL: 'https://master.witchit.com/api/v1',
//     timeout: 5000,
//     headers: {
//         'User-Agent': 'WitchIt/++UE4+Release-4.25-CL-0 Windows/10.0.19041.1.256.64bit',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': 0,
//         'Accept-Encoding': 'deflate, gzip',
//         Host: 'master.witchit.com',
//         Accept: '*/*'
//     }
// })
//
// class WitchItApiService {
//     constructor ({ axiosInstance, questsCollection }) {
//         this.axiosInstance = axiosInstance
//         this.questsCollection = questsCollection
//     }
//
//     async auth (userSteamId) {
//         const { data } = await this.axiosInstance.get('/Auth/login', {
//             params: {
//                 username: userSteamId,
//                 password: userSteamId,
//                 locale: 'ru-RU',
//                 accountType: 'Steam'
//             }
//         })
//
//         return data.authToken
//     }
//
//     async getAccessToken (authToken) {
//         const { data } = await this.axiosInstance.get('/Auth/requestAccessToken', {
//             params: {
//                 refreshToken: authToken
//             }
//         })
//
//         return data.accessToken
//     }
//
//     async getQuests (accessToken) {
//         const { data } = await this.axiosInstance.get('/quest/getAssignedQuests', {
//             params: {
//                 authToken: accessToken
//             }
//         })
//
//         const { quests } = data
//
//         // console.log(quests)
//
//         const weeklyQuests = quests.filter(quest => quest.type === 'Weekly')
//         const dailyQuests = quests.filter(quest => quest.type === 'Daily')
//
//         return {
//             weeklyQuests, // .map(this._mapQuest.bind(this)),
//             dailyQuests // .mp(this._mapQuest.bind(this))
//         }
//     }
//
//     async canReplaceWeeklyQuests (accessToken) {
//         const { data } = await this.axiosInstance.get('/quest/canReplaceWeeklyQuest', {
//             params: {
//                 authToken: accessToken
//             }
//         })
//
//         return data.success
//     }
//
//     async canReplaceDailyQuests (accessToken) {
//         const { data } = await this.axiosInstance.get('/quest/canReplaceDailyQuest', {
//             params: {
//                 authToken: accessToken
//             }
//         })
//
//         return data.success
//     }
//
//     async replaceQuest ({ userId, globalQuestId }) {
//         const authToken = await this.auth(userId)
//         const accessToken = await this.getAccessToken(authToken)
//
//         const { data } = await this.axiosInstance.get('/quest/replaceDailyQuest', {
//             params: {
//                 authToken: accessToken,
//                 dailyQuestId: globalQuestId
//             }
//         })
//
//         return data.success
//     }
//
//     // async finalizeQuest({ userId, localQuestId, globalQuestId }) {
//     //     const authToken = await this.auth(userId);
//     //     const accessToken = await this.getAccessToken(authToken);
//     //
//     //     console.log(userId, localQuestId, globalQuestId);
//     //
//     //     const r = await this.axiosInstance.get('/quest/finalizeQuest', {
//     //         params: {
//     //             authToken: accessToken,
//     //             accountQuestId: globalQuestId,
//     //             questId: localQuestId,
//     //         },
//     //     });
//     //
//     //     console.log(r.headers);
//     //
//     //     return r.data.success;
//     // }
//
//     _mapQuest (quest) {
//         const reward = quest.rewardVal
//         const [itemId, count] = reward.split('x')
//         const rewardItem = items.find(item => item.id === +itemId)
//         const progress = Number.parseInt(quest.objective1Val, 10)
//         const objective = Number.parseInt(quest.objective1Max, 10)
//         const questName = this.questsCollection[quest.name] || `No quest with name "${quest.name}"`
//
//         delete quest.name
//         delete quest.rewardVal
//         delete quest.rewardId
//         delete quest.objective1Id
//         delete quest.objective1Val
//         delete quest.objective1Max
//         delete quest.type
//
//         return {
//             ...quest, rewardItem, count: +count, progress, objective, questName
//         }
//     }
// }

const getUserQuests = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!user) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const userQuests = await user.getQuests()
    const mappedQuests = questsService.mapQuests(userQuests)

    const weeklyQuests = mappedQuests.filter(quest => quest.questType === 'Weekly')
    const dailyQuests = mappedQuests.filter(quest => quest.questType === 'Daily')
    const canReplaceWeeklyQuests = user.canReplaceWeeklyQuests
    const canReplaceDailyQuests = user.canReplaceDailyQuests

    response.send({
        weeklyQuests,
        dailyQuests,
        canReplaceDailyQuests,
        canReplaceWeeklyQuests
    })
}

const updateUserQuests = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!user) {
        return response.send({
            weeklyQuests: [],
            dailyQuests: []
        })
    }

    const authToken = await witchItApiService.auth(user.steamId)
    const accessToken = await witchItApiService.getAccessToken(authToken)
    const { weeklyQuests, dailyQuests } = await witchItApiService.getQuests(accessToken)
    // const canReplaceWeeklyQuests = await witchItApiService.canReplaceWeeklyQuests(accessToken)
    // const canReplaceDailyQuests = await witchItApiService.canReplaceDailyQuests(accessToken)

    await Quest.destroy({ where: { userId: user.id } })

    for (const quest of [...weeklyQuests, ...dailyQuests]) {
        const [rewardId, rewardCount] = quest.rewardVal.split('x')

        const quest2 = await Quest.create({
            questTask: quest.name,
            questType: quest.type,
            globalId: quest.id,
            localId: quest.questId,
            rewardId,
            rewardCount,
            objective: quest.objective1Max,
            progress: quest.objective1Val
            // user_id: user.id
        })

        user.addQuest(quest2)
    }

    return response.send({
        weeklyQuests: [],
        dailyQuests: []
    })
}

const replaceUserQuest = async (request, response) => {

}

const questsController = {
    getUserQuests,
    updateUserQuests,
    replaceUserQuest
}

export { questsController }
