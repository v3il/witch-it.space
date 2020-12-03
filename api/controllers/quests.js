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

    const questModels = [...weeklyQuests, ...dailyQuests].map((quest) => {
        const [rewardId, rewardCount] = quest.rewardVal.split('x')

        return {
            questTask: quest.name,
            questType: quest.type,
            globalId: quest.id,
            localId: quest.questId,
            rewardId,
            rewardCount,
            objective: quest.objective1Max,
            progress: quest.objective1Val,
            userId: user.id
        }
    })

    let transaction

    try {
        transaction = await sequelize.transaction()

        await Quest.destroy({ where: { userId: user.id } }, { transaction })
        await Quest.bulkCreate(questModels, { transaction })

        await user.update({
            canReplaceWeeklyQuests,
            canReplaceDailyQuests
        }, { transaction })

        await transaction.commit()
    } catch (err) {
        await transaction?.rollback()
    }

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
