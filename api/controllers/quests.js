import { BadRequest, Forbidden } from '@curveball/http-errors'
import joi from 'joi'
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
        .catch((e) => {
            console.error(e)
            response.emitUnprocessableEntity(request.$t('Error_QuestsFetchingFailed'))
        })
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
        .catch(() => response.emitUnprocessableEntity(request.$t('Error_QuestsReplacingFailed')))
}

const replaceUserQuest = async (request, response) => {
    const { questId } = request.body
    const schema = joi.number().min(0).required()
    const { error } = schema.validate(questId)

    if (error) {
        return response.emitBadRequest()
    }

    const { user } = request

    if (!(user && user.steamId)) {
        return response.emitBadRequest()
    }

    const quest = await questsService.getUserQuestById(user.id, questId)

    if (!quest) {
        throw new Forbidden(request.$t('Error_ActionForbidden'))
    }

    questsService.replaceUserQuest(user, quest)
        .then(questsData => response.send(questsData))
        .catch((e) => {
            console.error(e)
            response.emitUnprocessableEntity(request.$t('Error_QuestReplacingFailed'))
        })
}

const finalizeUserQuest = async (request, response) => {
    const { questId } = request.body
    const schema = joi.number().min(0).required()
    const { error } = schema.validate(questId)

    if (error) {
        return response.emitBadRequest()
    }

    const { user } = request

    if (!(user && user.steamId)) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const quest = await questsService.getUserQuestById(user.id, questId)

    if (!quest) {
        throw new Forbidden(request.$t('Error_ActionForbidden'))
    }

    questsService.finalizeUserQuest(user, quest)
        .then(questsData => response.send(questsData))
        .catch((e) => {
            console.error(e)
            response.emitUnprocessableEntity(request.$t('Error_QuestFinalizationFailed'))
        })
}

const questsController = {
    getUserQuests,
    updateUserQuests,
    replaceUserQuest,
    finalizeUserQuest
}

export { questsController }
