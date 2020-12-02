import { BadRequest } from '@curveball/http-errors'
// eslint-disable-next-line import/named
import { User, Quest, sequelize } from '../models'
import { witchItApiService, questsService } from '../services'
import { translateText } from '../util'

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
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const authToken = await witchItApiService.auth(user.steamId)
    const accessToken = await witchItApiService.getAccessToken(authToken)
    const { weeklyQuests, dailyQuests } = await witchItApiService.getQuests(accessToken)
    const canReplaceWeeklyQuests = await witchItApiService.canReplaceWeeklyQuests(accessToken)
    const canReplaceDailyQuests = await witchItApiService.canReplaceDailyQuests(accessToken)

    await Quest.destroy({ where: { userId: user.id } })
    // await user.removeQuests()
    // Quest.destroy({ where: { userId: user.id } })

    // const questsToSave = [...weeklyQuests, ...dailyQuests].map((quest) => {
    //
    //     const quest2 = await Quest.create({
    //         questTask: quest.name,
    //         questType: quest.type,
    //         globalId: quest.id,
    //         localId: quest.questId,
    //         rewardId,
    //         rewardCount,
    //         objective: quest.objective1Max,
    //         progress: quest.objective1Val
    //         // user_id: user.id
    //     })
    // })

    let transaction

    try {
        // get transaction
        transaction = await sequelize.transaction()

        for (const quest of [...weeklyQuests, ...dailyQuests]) {
            const [rewardId, rewardCount] = quest.rewardVal.split('x')

            await Quest.create({
                questTask: quest.name,
                questType: quest.type,
                globalId: quest.id,
                localId: quest.questId,
                rewardId,
                rewardCount,
                objective: quest.objective1Max,
                progress: quest.objective1Val,
                userId: user.id
            }, { transaction })

            // await user.addQuest(quest2, { transaction })
        }

        await user.update({
            canReplaceWeeklyQuests,
            canReplaceDailyQuests
        }, { transaction })

        // commit
        await transaction.commit()
    } catch (err) {
        // Rollback transaction only if the transaction object is defined
        if (transaction) { await transaction.rollback() }
    }

    // sequelize.transaction(async (transaction) => {
    //
    //
    //     // chain all your queries here. make sure you return them.
    //     return User.create({
    //         firstName: 'Abraham',
    //         lastName: 'Lincoln'
    //     }, { transaction: t }).then(function (user) {
    //         return user.setShooter({
    //             firstName: 'John',
    //             lastName: 'Boothe'
    //         }, { transaction: t })
    //     })
    // }).then(function (result) {
    //     // Transaction has been committed
    //     // result is whatever the result of the promise chain returned to the transaction callback
    // }).catch(function (err) {
    //     // Transaction has been rolled back
    //     // err is whatever rejected the promise chain returned to the transaction callback
    // })

    const userQuests = await user.getQuests()
    const mappedQuests = questsService.mapQuests(userQuests)

    const weeklyQuests1 = mappedQuests.filter(quest => quest.questType === 'Weekly')
    const dailyQuests1 = mappedQuests.filter(quest => quest.questType === 'Daily')
    const canReplaceWeeklyQuests1 = user.canReplaceWeeklyQuests
    const canReplaceDailyQuests1 = user.canReplaceDailyQuests

    response.send({
        weeklyQuests: weeklyQuests1,
        dailyQuests: dailyQuests1,
        canReplaceDailyQuests: canReplaceDailyQuests1,
        canReplaceWeeklyQuests: canReplaceWeeklyQuests1
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
