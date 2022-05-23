import { BadRequest } from '@curveball/http-errors'
import { Quest } from '../models'
import { getCurrentTimestamp } from '../util'
import { config } from '../../shared/index.js'

export class QuestsService {
    #witchItApiService

    constructor ({ witchItApiService }) {
        this.#witchItApiService = witchItApiService
    }

    async getUserQuestsData (user) {
        const userQuests = await this.#getUserQuests(user)
        const weeklyQuests = userQuests.filter(quest => quest.questType === 'Weekly')
        const dailyQuests = userQuests.filter(quest => quest.questType === 'Daily')
        const canReplaceWeeklyQuests = user.canReplaceWeeklyQuests
        const canReplaceDailyQuests = user.canReplaceDailyQuests
        const questsUpdateTimestamp = user.questsUpdateTimestamp

        return {
            weeklyQuests,
            dailyQuests,
            canReplaceWeeklyQuests,
            canReplaceDailyQuests,
            questsUpdateTimestamp
        }
    }

    async updateUserQuests (user, questsData, updateTime = true) {
        const newQuestsData = await this.#witchItApiService.loadUserData(user.steamId)
        const { quests, canReplaceDailyQuests, canReplaceWeeklyQuests } = newQuestsData
        const userQuests = await this.#getUserQuests(user)
        const questsToRemove = userQuests.filter(userQuest => !quests.some(quest => quest.id === userQuest.globalId))
        const questsToRemoveIds = questsToRemove.map(quest => quest.id)

        return Quest.transaction(async (trx) => {
            // Remove replaced quests from DB
            if (questsToRemoveIds.length) {
                await Quest.query(trx).delete().where('id', 'in', questsToRemoveIds)
            }

            for (const quest of quests) {
                const userQuest = userQuests.find(userQuest => quest.id === userQuest.globalId)

                // Add new quest
                if (!userQuest) {
                    const [rewardId, rewardCount] = quest.rewardVal.split('x')

                    await Quest.query(trx).insert({
                        rewardId,
                        rewardCount,
                        questTask: quest.name,
                        questType: quest.type,
                        globalId: quest.id,
                        localId: quest.questId,
                        objective: quest.objective1Max,
                        progress: quest.objective1Val,
                        userId: user.id
                    })

                    continue
                }

                // Update existing quest
                if (userQuest.progress !== +quest.objective1Val) {
                    await userQuest.$query(trx).patch({
                        progress: quest.objective1Val
                    })
                }
            }

            const userData = {
                canReplaceWeeklyQuests,
                canReplaceDailyQuests
            }

            if (updateTime) {
                userData.questsUpdateTimestamp = getCurrentTimestamp()
            }

            await user.$query(trx).patch(userData)

            return this.getUserQuestsData(user)
        })
    }

    canUpdateQuests (user) {
        return user.questsUpdateTimestamp + config.QUESTS_UPDATE_TIMEOUT <= getCurrentTimestamp()
    }

    #getUserQuests (user) {
        return Quest.query().select().where('userId', user.id)
    }
}
