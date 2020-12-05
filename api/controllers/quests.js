import { BadRequest, UnprocessableEntity } from '@curveball/http-errors'
// eslint-disable-next-line import/named
import { User, Quest } from '../models'
import { witchItApiService, questsService } from '../services'
import { translateText } from '../util'

const getUserQuests = async (request, response, next) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!(user && user.steamId)) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    questsService.getUserQuestsData(user)
        .then(questsData => response.send(questsData))
        .catch(() => next(new UnprocessableEntity(translateText('Error_QuestsFetchingFailed', request.locale))))
}

const updateUserQuests = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })

    if (!(user && user.steamId)) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    try {
        const newQuestsData = await witchItApiService.loadUserData(user.steamId)
        await questsService.saveUserQuests(user, newQuestsData)

        const questsData = await questsService.getUserQuestsData(user)
        response.send(questsData)
    } catch (e) {
        throw new UnprocessableEntity(translateText('Error_QuestsReplacingFailed', request.locale))
    }
}

const replaceUserQuest = async (request, response) => {
    const { questId } = request.body
    const { id } = request.user

    console.log(questId, id)

    const user = await User.findOne({ where: { id } })

    if (!(user && user.steamId)) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const quest = await Quest.findOne({
        where: { id: questId }
    })

    console.log(quest)

    if (!quest) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    if (quest.userId !== user.id) {
        throw new BadRequest(translateText('Error_ActionForbidden', request.locale))
    }

    try {
        const isReplaced = await witchItApiService.replaceQuest({ user, quest })

        console.log(isReplaced)

        if (isReplaced) {
            const newQuestsData = await witchItApiService.loadUserData(user.steamId)
            await questsService.saveUserQuests(user, newQuestsData)
        }

        const questsData = await questsService.getUserQuestsData(user)
        response.send(questsData)
    } catch (e) {
        throw new UnprocessableEntity(translateText('Error_QuestsReplacingFailed', request.locale))
    }

    // response.sendStatus(200)

    // try {
    //     const newQuestsData = await witchItApiService.loadUserData(user.steamId)
    //     await questsService.saveUserQuests(user, newQuestsData)
    //
    //     const questsData = await questsService.getUserQuestsData(user)
    //     response.send(questsData)
    // } catch (e) {
    //     throw new UnprocessableEntity(translateText('Error_QuestsReplacingFailed', request.locale))
    // }
}

const questsController = {
    getUserQuests,
    updateUserQuests,
    replaceUserQuest
}

export { questsController }
