import { BadRequest, Forbidden } from '@curveball/http-errors'
// eslint-disable-next-line import/named
import { User, Quest } from '../models'
import { witchItApiService, questsService } from '../services'
import { getCurrentTimestamp, translateText } from '../util'
import { config } from '../../shared'

const getUserQuests = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!(user && user.steamId)) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const questsData = await questsService.getUserQuestsData(user)
    response.send(questsData)
}

const updateUserQuests = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!(user && user.steamId)) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    if (user.questsUpdateTimestamp + config.QUESTS_UPDATE_TIMEOUT > getCurrentTimestamp()) {
        throw new Forbidden(translateText('Error_ActionForbidden', request.locale))
    }

    const newQuestsData = await witchItApiService.loadUserData(user.steamId)
    await questsService.mergeUserQuests(user, newQuestsData)

    const questsData = await questsService.getUserQuestsData(user)
    response.send(questsData)
}

const replaceUserQuest = async (request, response) => {
    const { questId } = request.body

    if (!questId) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!(user && user.steamId)) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const quest = await Quest.findOne({
        where: { id: questId }
    })

    if (!quest) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    if (quest.userId !== user.id) {
        throw new Forbidden(translateText('Error_ActionForbidden', request.locale))
    }

    const isReplaced = await witchItApiService.replaceQuest({ user, quest })

    if (isReplaced) {
        const newQuestsData = await witchItApiService.loadUserData(user.steamId)
        await questsService.mergeUserQuests(user, newQuestsData)

        const questsData = await questsService.getUserQuestsData(user)
        return response.send({
            ...questsData,
            success: true
        })
    }

    response.send({ success: false })
}

const finalizeUserQuest = async (request, response) => {
    const { questId } = request.body

    if (!questId) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!(user && user.steamId)) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const quest = await Quest.findOne({
        where: { id: questId }
    })

    if (!quest) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    if (quest.userId !== user.id) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    const isFinalized = await witchItApiService.finalizeQuest({ user, quest })

    if (isFinalized) {
        const newQuestsData = await witchItApiService.loadUserData(user.steamId)
        await questsService.mergeUserQuests(user, newQuestsData)

        const questsData = await questsService.getUserQuestsData(user)
        return response.send({
            ...questsData,
            success: true
        })
    }

    response.send({ success: false })
}

const questsController = {
    getUserQuests,
    updateUserQuests,
    replaceUserQuest,
    finalizeUserQuest
}

export { questsController }
