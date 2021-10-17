export class QuestsService {
    constructor (items) {
        this.items = items
    }

    getUserQuests () {

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
