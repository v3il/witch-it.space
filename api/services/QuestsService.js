import { Quest, sequelize } from '../models'
import { getCurrentTimestamp } from '../util'

export class QuestsService {
    // constructor (items) {
    //     this.items = items
    // }

    async getUserQuestsData (user) {
        const userQuests = await this.#getUserQuests(user)
        const mappedQuests = this.#mapQuests(userQuests)

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

    async mergeUserQuests (user, questsData, updateTime = true) {
        const { quests, canReplaceDailyQuests, canReplaceWeeklyQuests } = questsData
        const userQuests = await this.#getUserQuests(user)

        const questsToRemove = userQuests.filter(userQuest => !quests.some(quest => quest.id === userQuest.globalId))
        const questsToRemoveIds = questsToRemove.map(quest => quest.id)

        try {
            const returnValue = await Quest.transaction(async (trx) => {
                // Remove replaced quests from DB
                if (questsToRemoveIds.length) {
                    await Quest.query(trx).delete().where('id', questsToRemoveIds)
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
                        await Quest.query(trx).findById(userQuest.id).patch({
                            progress: quest.objective1Val
                        })
                    }
                }

                // const userData = {
                //     canReplaceWeeklyQuests,
                //     canReplaceDailyQuests
                // }
                //
                // if (updateTime) {
                //     userData.questsUpdateTimestamp = getCurrentTimestamp()
                // }
                //
                // await user.update(userData, { transaction })

                // Here you can use the transaction.

                // Whatever you return from the transaction callback gets returned
                // from the `transaction` function.
                return 'the return value of the transaction'
            })
            // Here the transaction has been committed.
        } catch (err) {
            // Here the transaction has been rolled back.
        }

        // const transaction = await sequelize.transaction()
        //
        // try {
        //     const { quests, canReplaceDailyQuests, canReplaceWeeklyQuests } = questsData
        //     const userQuests = await user.getQuests()
        //
        //     const questsToRemove = userQuests.filter(userQuest => !quests.some(quest => quest.id === userQuest.globalId))
        //     const questsToRemoveIds = questsToRemove.map(quest => quest.id)
        //
        //     // Remove replaced quests from DB
        //     if (questsToRemoveIds.length) {
        //         await Quest.destroy({ where: { id: questsToRemoveIds } }, { transaction })
        //     }
        //
        //     for (const quest of quests) {
        //         const userQuest = userQuests.find(userQuest => quest.id === userQuest.globalId)
        //
        //         // Add new quest
        //         if (!userQuest) {
        //             const [rewardId, rewardCount] = quest.rewardVal.split('x')
        //
        //             await Quest.create({
        //                 rewardId,
        //                 rewardCount,
        //                 questTask: quest.name,
        //                 questType: quest.type,
        //                 globalId: quest.id,
        //                 localId: quest.questId,
        //                 objective: quest.objective1Max,
        //                 progress: quest.objective1Val,
        //                 userId: user.id
        //             }, { transaction })
        //
        //             continue
        //         }
        //
        //         // Update existing quest
        //         if (userQuest.progress !== +quest.objective1Val) {
        //             await userQuest.update({ progress: quest.objective1Val }, { transaction })
        //         }
        //     }
        //
        //     const userData = {
        //         canReplaceWeeklyQuests,
        //         canReplaceDailyQuests
        //     }
        //
        //     if (updateTime) {
        //         userData.questsUpdateTimestamp = getCurrentTimestamp()
        //     }
        //
        //     await user.update(userData, { transaction })
        //
        //     await transaction.commit()
        // } catch (error) {
        //     await transaction.rollback()
        //     throw error
        // }
    }

    #getUserQuests (user) {
        return Quest.query().select().where('userId', user.id)
    }

    #mapQuests (quests) {
        return quests
        // .map((quest) => {
        //     return {
        //         id: quest.id,
        //         questTask: quest.questTask,
        //         questType: quest.questType,
        //         globalId: quest.globalId,
        //         localId: quest.localId,
        //         rewardId: quest.rewardId,
        //         rewardCount: quest.rewardCount,
        //         objective: quest.objective,
        //         progress: quest.progress,
        //     }
        // })
    }
}
