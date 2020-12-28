// eslint-disable-next-line import/named
import { Quest, sequelize } from '../models'
import { getCurrentTimestamp } from '../util'

export class QuestsService {
    constructor (items) {
        this.items = items
    }

    async getUserQuestsData (user) {
        const userQuests = await Quest.findAll({
            where: { userId: user.id },
            order: [['createdAt', 'ASC']]
        })

        const mappedQuests = this.mapQuests(userQuests)

        const weeklyQuests = mappedQuests.filter(quest => quest.questType === 'Weekly')
        const dailyQuests = mappedQuests.filter(quest => quest.questType === 'Daily')
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

    async mergeUserQuests (user, questsData) {
        const transaction = await sequelize.transaction()

        try {
            const { quests, canReplaceDailyQuests, canReplaceWeeklyQuests } = questsData
            const userQuests = await user.getQuests()

            const questsToRemove = userQuests.filter(userQuest => !quests.some(quest => quest.id === userQuest.globalId))
            const questsToRemoveIds = questsToRemove.map(quest => quest.id)

            // Remove replaced quests from DB
            if (questsToRemoveIds.length) {
                await Quest.destroy({ where: { id: questsToRemoveIds } }, { transaction })
            }

            for (const quest of quests) {
                const userQuest = userQuests.find(userQuest => quest.id === userQuest.globalId)

                // Add new quest
                if (!userQuest) {
                    const [rewardId, rewardCount] = quest.rewardVal.split('x')

                    await Quest.create({
                        rewardId,
                        rewardCount,
                        questTask: quest.name,
                        questType: quest.type,
                        globalId: quest.id,
                        localId: quest.questId,
                        objective: quest.objective1Max,
                        progress: quest.objective1Val,
                        userId: user.id
                    }, { transaction })

                    continue
                }

                // Update existing quest
                if (userQuest.progress !== +quest.objective1Val) {
                    await userQuest.update({ progress: quest.objective1Val }, { transaction })
                }
            }

            await user.update({
                canReplaceWeeklyQuests,
                canReplaceDailyQuests,
                questsUpdateTimestamp: getCurrentTimestamp()
            }, { transaction })

            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }

    mapQuests (quests) {
        return quests.map((quest) => {
            const rewardItem = this.items.find(item => item.id === quest.rewardId) ?? {}

            return {
                id: quest.id,
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
