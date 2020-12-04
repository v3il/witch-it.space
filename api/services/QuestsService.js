// eslint-disable-next-line import/named
import { Quest, sequelize } from '../models'

export class QuestsService {
    constructor (items) {
        this.items = items
    }

    async getUserQuestsData (user) {
        const userQuests = await user.getQuests()
        const mappedQuests = this.mapQuests(userQuests)

        const weeklyQuests = mappedQuests.filter(quest => quest.questType === 'Weekly')
        const dailyQuests = mappedQuests.filter(quest => quest.questType === 'Daily')
        const canReplaceWeeklyQuests = user.canReplaceWeeklyQuests
        const canReplaceDailyQuests = user.canReplaceDailyQuests

        return {
            weeklyQuests,
            dailyQuests,
            canReplaceWeeklyQuests,
            canReplaceDailyQuests
        }
    }

    async saveUserQuests (user, questsData) {
        let transaction

        try {
            const { quests, canReplaceDailyQuests, canReplaceWeeklyQuests } = questsData

            const questModels = quests.map((quest) => {
                const [rewardId, rewardCount] = quest.rewardVal.split('x')

                return {
                    rewardId,
                    rewardCount,
                    questTask: quest.name,
                    questType: quest.type,
                    globalId: quest.id,
                    localId: quest.questId,
                    objective: quest.objective1Max,
                    progress: quest.objective1Val,
                    userId: user.id
                }
            })

            transaction = await sequelize.transaction()

            await Quest.destroy({ where: { userId: user.id } }, { transaction })
            await Quest.bulkCreate(questModels, { transaction })

            await user.update({
                canReplaceWeeklyQuests,
                canReplaceDailyQuests
            }, { transaction })

            await transaction.commit()
        } catch (error) {
            await transaction?.rollback()
            throw error
        }
    }

    mapQuests (quests) {
        return quests.map((quest) => {
            const rewardItem = this.items.find(item => item.id === quest.rewardId) ?? null

            return {
                questTask: quest.questTask,
                questType: quest.questType,
                globalId: quest.globalId,
                localId: quest.localId,
                rewardId: quest.rewardId,
                rewardCount: quest.rewardCount,
                objective: quest.objective,
                progress: quest.progress,
                rewardItem
            }
        })
    }
}
