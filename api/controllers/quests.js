import { BadRequest, Forbidden } from '@curveball/http-errors'
import { User, Quest } from '../models'
import { witchItApiService, questsService, userService } from '../services'
import { getCurrentTimestamp, translateText } from '../util'
import { config } from '../../shared'

const getUserQuests = (request, response) => {
    const { user } = request

    if (!(user && user.steamId)) {
        return response.emitBadRequest()
    }

    questsService.getUserQuestsData(user)
        .then(questsData => response.send(questsData))
        .catch(() => response.emitUnprocessableEntity(request.$t('Error_QuestsFetchingFailed')))
}

const updateUserQuests = (request, response) => {
    const { user } = request

    if (!(user && user.steamId)) {
        return response.emitBadRequest()
    }

    if (!questsService.canUpdateQuests(user) && !userService.isMyProfile(user)) {
        throw new Forbidden(translateText('Error_ActionForbidden', request.locale))
    }

    questsService.updateUserQuests(user)
        .then(questsData => response.send(questsData))
        .catch((e) => {
            console.error(e)
            response.emitUnprocessableEntity(request.$t('Error_QuestsReplacingFailed'))
        })
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

    try {
        const isReplaced = await witchItApiService.replaceQuest({ user, quest })

        if (!isReplaced) {
            throw new BadRequest(request.$t('Error_QuestReplacingFailed'))
        }

        const newQuestsData = await witchItApiService.loadUserData(user.steamId)
        await questsService.mergeUserQuests(user, newQuestsData, false)

        const questsData = await questsService.getUserQuestsData(user)
        response.send({ ...questsData, isSuccess: true })
    } catch (error) {
        console.error(error)
        throw new BadRequest(request.$t('Error_QuestReplacingFailed'))
    }
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

    try {
        const isFinalized = await witchItApiService.finalizeQuest({ user, quest })

        if (!isFinalized) {
            throw new BadRequest(request.$t('Error_QuestFinalizationFailed'))
        }

        const newQuestsData = await witchItApiService.loadUserData(user.steamId)
        await questsService.mergeUserQuests(user, newQuestsData, false)

        const questsData = await questsService.getUserQuestsData(user)
        response.send({ ...questsData, isSuccess: true })
    } catch (error) {
        console.error(error)
        throw new BadRequest(request.$t('Error_QuestFinalizationFailed'))
    }
}

const questsController = {
    getUserQuests,
    updateUserQuests,
    replaceUserQuest,
    finalizeUserQuest
}

export { questsController }
