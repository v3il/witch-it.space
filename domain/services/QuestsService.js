export class QuestsService {
    #axiosInstance = null

    setAxios (axiosInstance) {
        this.#axiosInstance = axiosInstance
    }

    fetch () {
        return this.#axiosInstance.$get('/api/quests')
    }

    update () {
        return this.#axiosInstance.$post('/api/quests/update')
    }

    replaceQuest (questId) {
        return this.#axiosInstance.$post('/api/quests/replace', { questId })
    }

    finalizeQuest (questId) {
        return this.#axiosInstance.$post('/api/quests/finalize', { questId })
    }
}
